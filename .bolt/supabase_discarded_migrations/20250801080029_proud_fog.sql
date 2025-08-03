/*
  # Complete Database Schema for MY Balloons MY Props

  1. New Tables
    - `categories` - Product categories
    - `products` - E-commerce products
    - `orders` - Customer orders
    - `order_items` - Individual order items
    - `contact_forms` - Contact form submissions
    - `reviews` - Product reviews
    - `limited_offers` - Time-limited offers
    - `product_bundles` - Frequently bought together
    - `order_status_history` - Order tracking
    - `website_content` - CMS content
    - `gallery_images` - Gallery management
    - `admin_settings` - Admin configuration

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for public/admin access
    - Create indexes for performance

  3. Sample Data
    - Categories and products
    - Limited time offers
    - Admin settings
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  image_url text,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  image_url text,
  category_id uuid REFERENCES categories(id),
  stock_quantity integer DEFAULT 0,
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  sku text UNIQUE,
  weight decimal(5,2),
  dimensions text,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  shipping_address text NOT NULL,
  billing_address text,
  payment_method text NOT NULL,
  payment_status text DEFAULT 'pending',
  stripe_payment_intent_id text,
  total_amount decimal(10,2) NOT NULL,
  shipping_amount decimal(10,2) DEFAULT 0,
  tax_amount decimal(10,2) DEFAULT 0,
  discount_amount decimal(10,2) DEFAULT 0,
  status text DEFAULT 'pending',
  is_fulfilled boolean DEFAULT false,
  tracking_number text,
  estimated_delivery date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  quantity integer NOT NULL,
  unit_price decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL,
  product_snapshot jsonb -- Store product details at time of order
);

-- Create contact_forms table
CREATE TABLE IF NOT EXISTS contact_forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  event_type text,
  event_date date,
  location text,
  guest_count integer,
  budget_range text,
  message text,
  is_read boolean DEFAULT false,
  priority text DEFAULT 'normal',
  assigned_to text,
  response_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  is_approved boolean DEFAULT false,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create limited_offers table
CREATE TABLE IF NOT EXISTS limited_offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  discount_percentage integer,
  discount_amount decimal(10,2),
  min_order_amount decimal(10,2) DEFAULT 0,
  max_uses integer,
  current_uses integer DEFAULT 0,
  is_active boolean DEFAULT true,
  starts_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create product_bundles table
CREATE TABLE IF NOT EXISTS product_bundles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  main_product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  suggested_product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  display_order integer DEFAULT 1,
  discount_percentage integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(main_product_id, suggested_product_id)
);

-- Create order_status_history table
CREATE TABLE IF NOT EXISTS order_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  status text NOT NULL,
  status_message text,
  created_by text,
  created_at timestamptz DEFAULT now()
);

-- Create website_content table
CREATE TABLE IF NOT EXISTS website_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  title text NOT NULL,
  content text,
  image_url text,
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  category text NOT NULL,
  event_date date,
  location text,
  client_name text,
  tags text[],
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  likes_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create admin_settings table
CREATE TABLE IF NOT EXISTS admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value jsonb NOT NULL,
  description text,
  category text DEFAULT 'general',
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE limited_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Public access policies (for website visitors)
CREATE POLICY "Anyone can view active categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view approved reviews" ON reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Anyone can view active offers" ON limited_offers FOR SELECT USING (is_active = true AND expires_at > now());
CREATE POLICY "Anyone can view active bundles" ON product_bundles FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active content" ON website_content FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active gallery" ON gallery_images FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view public settings" ON admin_settings FOR SELECT USING (is_public = true);

-- Insert policies (for customer actions)
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create order items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit contact forms" ON contact_forms FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit reviews" ON reviews FOR INSERT WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery_images(is_featured);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_website_content_updated_at BEFORE UPDATE ON website_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_settings_updated_at BEFORE UPDATE ON admin_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample categories
INSERT INTO categories (name, description, display_order) VALUES
('Balloons', 'Helium and regular balloons for all occasions', 1),
('Birthday Kits', 'Complete birthday party decoration kits', 2),
('Wedding Decor', 'Elegant wedding decoration items', 3),
('Baby Shower', 'Cute decorations for baby shower celebrations', 4),
('Corporate Events', 'Professional event decoration supplies', 5),
('Photo Props', 'Fun photo booth props and accessories', 6),
('Banners & Signs', 'Custom banners and signage', 7),
('Table Decor', 'Centerpieces and table decorations', 8)
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category_id, stock_quantity, is_featured, sku) VALUES
('Happy Birthday Banner', 'Colorful happy birthday banner perfect for any birthday celebration', 199, 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', (SELECT id FROM categories WHERE name = 'Birthday Kits'), 50, true, 'HBB-001'),
('Red & Gold Helium Balloons Set (10 pcs)', 'Premium helium-filled balloons in elegant red and gold colors', 149, 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop', (SELECT id FROM categories WHERE name = 'Balloons'), 30, true, 'RGH-010'),
('Bride-to-Be Sash', 'Beautiful satin sash for the bride-to-be at bachelorette parties', 99, 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop', (SELECT id FROM categories WHERE name = 'Wedding Decor'), 25, false, 'BTS-001'),
('Photo Booth Props Kit', '20-piece photo booth props for memorable pictures', 299, 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop', (SELECT id FROM categories WHERE name = 'Photo Props'), 20, true, 'PBP-020'),
('Balloon Arch Kit', 'DIY balloon arch kit with 50 balloons and assembly tools', 499, 'https://images.unsplash.com/photo-1583342926306-3b1185e0c4a1?w=400&h=300&fit=crop', (SELECT id FROM categories WHERE name = 'Balloons'), 15, true, 'BAK-050'),
('Party Streamer Pack', 'Colorful streamers and confetti for decoration', 79, 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop', (SELECT id FROM categories WHERE name = 'Birthday Kits'), 40, false, 'PSP-001')
ON CONFLICT (sku) DO NOTHING;

-- Insert sample limited offers
INSERT INTO limited_offers (title, description, discount_percentage, min_order_amount, expires_at, max_uses) VALUES
('🔥 Flash Sale - 15% OFF!', 'Get 15% off on all balloon decorations', 15, 299, now() + interval '7 days', 100),
('🎁 Free Delivery', 'Free delivery on orders above ₹499', NULL, 499, now() + interval '30 days', 500),
('🎉 Weekend Special', '10% off Birthday Kits', 10, 199, now() + interval '3 days', 50)
ON CONFLICT DO NOTHING;

-- Insert sample website content
INSERT INTO website_content (section, title, content, order_index) VALUES
('hero', 'Celebrations Made Magical', 'From intimate birthday parties to grand weddings, we bring your celebrations to life with expert event management and premium party props', 1),
('about', 'About MY Balloons MY Props', 'We are your one-stop destination for all things celebration! At MY Balloons MY Props, we specialize in event management and decor prop sales to make your moments truly magical.', 2),
('services', 'Our Services', 'Birthday Parties, Weddings, Baby Showers, Corporate Events - we handle all types of celebrations with creativity and professionalism.', 3)
ON CONFLICT DO NOTHING;

-- Insert sample gallery images
INSERT INTO gallery_images (title, description, image_url, category, is_featured, client_name, location) VALUES
('Magical Unicorn Birthday Party', 'A dreamy unicorn-themed birthday party with pastel balloons and magical decorations', '/lovable-uploads/d85a72bc-eea7-4ede-9fae-e63447a9103c.png', 'Birthday Parties', true, 'Priya & Family', 'Jayanagar, Bangalore'),
('Elegant Wedding Reception', 'Sophisticated wedding reception with gold and white theme', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop', 'Weddings', true, 'Rahul & Sneha', 'Whitefield, Bangalore'),
('Corporate Annual Day', 'Professional corporate event setup with branded decorations', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop', 'Corporate Events', false, 'TechCorp Solutions', 'Electronic City, Bangalore')
ON CONFLICT DO NOTHING;

-- Insert admin settings
INSERT INTO admin_settings (setting_key, setting_value, description, category, is_public) VALUES
('business_info', '{"name": "MY Balloons MY Props", "email": "myballoonsjayanagar@gmail.com", "phone": "+91-9035106677", "address": "Jayanagar, Bangalore"}', 'Basic business information', 'business', true),
('payment_settings', '{"enable_cod": true, "enable_stripe": true, "delivery_charges": 50, "free_delivery_threshold": 500}', 'Payment and delivery settings', 'payment', false),
('email_settings', '{"smtp_host": "", "smtp_port": 587, "from_email": "myballoonsjayanagar@gmail.com"}', 'Email configuration', 'email', false),
('website_settings', '{"maintenance_mode": false, "enable_reviews": true, "enable_wishlist": true}', 'Website feature toggles', 'website', true)
ON CONFLICT (setting_key) DO NOTHING;