import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const customerSchema = z.object({
  name: z.string().min(1, "Le nom est requis").max(100),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().max(20).optional(),
  company: z.string().max(100).optional(),
  status: z.enum(["lead", "prospect", "client", "inactive"]),
  value: z.string().optional(),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

interface CustomerFormProps {
  customerId?: string;
  defaultValues?: Partial<CustomerFormValues>;
  onSuccess?: () => void;
}

export function CustomerForm({ customerId, defaultValues, onSuccess }: CustomerFormProps) {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      company: defaultValues?.company || "",
      status: defaultValues?.status || "lead",
      value: defaultValues?.value || "0",
    },
  });

  const onSubmit = async (values: CustomerFormValues) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Vous devez être connecté");
        return;
      }

      const customerData = {
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        company: values.company || null,
        status: values.status,
        value: values.value ? parseFloat(values.value) : 0,
        user_id: user.id,
      };

      if (customerId) {
        const { error } = await supabase
          .from("customers")
          .update(customerData)
          .eq("id", customerId);

        if (error) throw error;
        toast.success("Client mis à jour avec succès");
      } else {
        const { error } = await supabase
          .from("customers")
          .insert([customerData]);

        if (error) throw error;
        toast.success("Client créé avec succès");
      }

      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Error saving customer:", error);
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom complet *</FormLabel>
              <FormControl>
                <Input placeholder="Jean Dupont" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="jean.dupont@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input placeholder="+33 6 12 34 56 78" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entreprise</FormLabel>
              <FormControl>
                <Input placeholder="Nom de l'entreprise" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Statut *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valeur (€)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {customerId ? "Mettre à jour" : "Créer le client"}
        </Button>
      </form>
    </Form>
  );
}