-- Orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  total_amount NUMERIC NOT NULL DEFAULT 0,
  shipping_address JSONB,
  payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Order items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL,
  total_price NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Support tickets table
CREATE TABLE public.support_tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  priority TEXT NOT NULL DEFAULT 'medium',
  assigned_to UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Ticket responses table
CREATE TABLE public.ticket_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Cart items table
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Add seller_id to products for seller management
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS seller_id UUID;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS approved BOOLEAN DEFAULT false;

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Orders RLS
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own orders" ON public.orders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all orders" ON public.orders FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage all orders" ON public.orders FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Order items RLS
CREATE POLICY "Users can view their order items" ON public.order_items FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Users can insert order items" ON public.order_items FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Admins can manage order items" ON public.order_items FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Support tickets RLS
CREATE POLICY "Users can view their own tickets" ON public.support_tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create tickets" ON public.support_tickets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own tickets" ON public.support_tickets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all tickets" ON public.support_tickets FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage all tickets" ON public.support_tickets FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Ticket responses RLS
CREATE POLICY "Users can view responses to their tickets" ON public.ticket_responses FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.support_tickets WHERE support_tickets.id = ticket_responses.ticket_id AND support_tickets.user_id = auth.uid()));
CREATE POLICY "Users can respond to their tickets" ON public.ticket_responses FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM public.support_tickets WHERE support_tickets.id = ticket_responses.ticket_id AND support_tickets.user_id = auth.uid()));
CREATE POLICY "Admins can manage responses" ON public.ticket_responses FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Cart items RLS
CREATE POLICY "Users can view their cart" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their cart" ON public.cart_items FOR ALL USING (auth.uid() = user_id);

-- Update products RLS for sellers
CREATE POLICY "Sellers can manage their products" ON public.products FOR ALL 
USING (seller_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- Add seller role to enum (if not exists, this is safe)
DO $$ 
BEGIN
  ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'seller';
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Triggers for updated_at
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders 
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON public.support_tickets 
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();