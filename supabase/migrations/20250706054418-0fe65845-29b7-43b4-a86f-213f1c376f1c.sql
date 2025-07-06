
-- Create categories table for organizing products
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table for the e-commerce store
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category_id UUID REFERENCES public.categories(id),
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  is_fulfilled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table for individual products in orders
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL
);

-- Create contact_forms table for service inquiries
CREATE TABLE public.contact_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  event_type TEXT,
  location TEXT,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_users table for admin authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to products and categories (read-only)
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (is_active = true);

-- Create policies for orders (anyone can insert, no one can view without auth)
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create order items" ON public.order_items FOR INSERT WITH CHECK (true);

-- Create policies for contact forms (anyone can insert)
CREATE POLICY "Anyone can submit contact forms" ON public.contact_forms FOR INSERT WITH CHECK (true);

-- Insert some sample categories
INSERT INTO public.categories (name, description) VALUES
('Balloons', 'Helium and regular balloons for all occasions'),
('Birthday Kits', 'Complete birthday party decoration kits'),
('Wedding Decor', 'Elegant wedding decoration items'),
('Baby Shower', 'Cute decorations for baby shower celebrations'),
('Corporate Events', 'Professional event decoration supplies'),
('Photo Props', 'Fun photo booth props and accessories');

-- Insert some sample products
INSERT INTO public.products (name, description, price, image_url, category_id, stock_quantity) VALUES
('Happy Birthday Banner', 'Colorful happy birthday banner perfect for any birthday celebration', 199, 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', (SELECT id FROM public.categories WHERE name = 'Birthday Kits'), 50),
('Red & Gold Helium Balloons Set (10 pcs)', 'Premium helium-filled balloons in elegant red and gold colors', 149, 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop', (SELECT id FROM public.categories WHERE name = 'Balloons'), 30),
('Bride-to-Be Sash', 'Beautiful satin sash for the bride-to-be at bachelorette parties', 99, 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop', (SELECT id FROM public.categories WHERE name = 'Wedding Decor'), 25),
('Photo Booth Props Kit', '20-piece photo booth props for memorable pictures', 299, 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop', (SELECT id FROM public.categories WHERE name = 'Photo Props'), 20),
('Balloon Arch Kit', 'DIY balloon arch kit with 50 balloons and assembly tools', 499, 'https://images.unsplash.com/photo-1583342926306-3b1185e0c4a1?w=400&h=300&fit=crop', (SELECT id FROM public.categories WHERE name = 'Balloons'), 15),
('Party Streamer Pack', 'Colorful streamers and confetti for decoration', 79, 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop', (SELECT id FROM public.categories WHERE name = 'Birthday Kits'), 40);
