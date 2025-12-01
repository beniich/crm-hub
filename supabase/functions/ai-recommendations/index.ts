import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY || !supabaseUrl || !supabaseKey) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Fetching CRM data for recommendations...');

    // Fetch customer data
    const { data: customers } = await supabase
      .from('profiles')
      .select('*')
      .limit(10);

    // Fetch deals data
    const { data: deals } = await supabase
      .from('ai_recommendations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    const systemPrompt = `Tu es un assistant CRM intelligent. Analyse les données fournies et génère 3-5 recommandations actionnables pour optimiser les ventes et la relation client.

Types de recommandations à générer:
1. client_contact: Clients à recontacter (inactifs depuis longtemps, opportunités manquées)
2. deal_priority: Opportunités à prioriser (forte probabilité, montant élevé, date de clôture proche)
3. product_suggestion: Suggestions de produits basées sur l'historique
4. analytics_insight: Insights sur les tendances, performances, KPIs

Format de réponse attendu (JSON):
{
  "recommendations": [
    {
      "type": "client_contact" | "deal_priority" | "product_suggestion" | "analytics_insight",
      "title": "Titre court et clair",
      "description": "Description détaillée avec actions concrètes",
      "priority": "low" | "medium" | "high" | "urgent",
      "data": {} // Données additionnelles pertinentes
    }
  ]
}`;

    const userPrompt = `Données CRM actuelles:

Clients: ${JSON.stringify(customers || [])}
Recommandations récentes: ${JSON.stringify(deals || [])}

Génère 3-5 recommandations intelligentes et actionnables.`;

    console.log('Calling Lovable AI for recommendations...');

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: 'json_object' }
      }),
    });

    if (aiResponse.status === 429) {
      return new Response(JSON.stringify({ error: 'Limite de requêtes atteinte, réessayez plus tard.' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (aiResponse.status === 402) {
      return new Response(JSON.stringify({ error: 'Crédit insuffisant, ajoutez des fonds.' }), {
        status: 402,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      throw new Error('Failed to get AI recommendations');
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices[0].message.content;
    console.log('AI Response received:', content);

    const recommendations = JSON.parse(content).recommendations;

    // Insert recommendations into database
    const { data: insertedRecs, error: insertError } = await supabase
      .from('ai_recommendations')
      .insert(
        recommendations.map((rec: any) => ({
          user_id: user.id,
          type: rec.type,
          title: rec.title,
          description: rec.description,
          priority: rec.priority,
          data: rec.data || {},
          is_read: false
        }))
      )
      .select();

    if (insertError) {
      console.error('Error inserting recommendations:', insertError);
      throw insertError;
    }

    console.log('Successfully created recommendations:', insertedRecs);

    return new Response(JSON.stringify({ 
      success: true,
      recommendations: insertedRecs 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-recommendations function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});