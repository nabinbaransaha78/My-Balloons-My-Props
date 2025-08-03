-- Create reviews table for product feedback
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create limited time offers table
CREATE TABLE public.limited_offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  discount_percentage INTEGER,
  discount_amount NUMERIC,
  min_order_amount NUMERIC DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  starts_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create frequently bought together table
CREATE TABLE public.product_bundles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  main_product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  suggested_product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(main_product_id, suggested_product_id)
);

-- Create order tracking statuses table
CREATE TABLE public.order_status_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  status_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.limited_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;

-- Create policies for reviews
CREATE POLICY "Anyone can view approved reviews" 
ON public.reviews 
FOR SELECT 
USING (is_approved = true);

CREATE POLICY "Anyone can submit reviews" 
ON public.reviews 
FOR INSERT 
WITH CHECK (true);

-- Create policies for limited offers
CREATE POLICY "Anyone can view active offers" 
ON public.limited_offers 
FOR SELECT 
USING (is_active = true AND expires_at > now());

-- Create policies for product bundles
CREATE POLICY "Anyone can view active bundles" 
ON public.product_bundles 
FOR SELECT 
USING (is_active = true);

-- Create policies for order status
CREATE POLICY "Anyone can view order status" 
ON public.order_status_history 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create order status" 
ON public.order_status_history 
FOR INSERT 
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX idx_reviews_approved ON public.reviews(is_approved);
CREATE INDEX idx_limited_offers_active ON public.limited_offers(is_active, expires_at);
CREATE INDEX idx_product_bundles_main_product ON public.product_bundles(main_product_id);
CREATE INDEX idx_order_status_order_id ON public.order_status_history(order_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for reviews timestamps
CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data for limited offers
INSERT INTO public.limited_offers (title, description, discount_percentage, min_order_amount, expires_at) VALUES
('🔥 Flash Sale - 15% OFF!', 'Get 15% off on all balloon decorations', 15, 299, now() + interval '7 days'),
('🎁 Free LED Lights', 'Free LED lights on orders above ₹499', NULL, 499, now() + interval '10 days'),
('🎉 Weekend Special', '10% off Custom Cake Toppers', 10, 199, now() + interval '3 days');