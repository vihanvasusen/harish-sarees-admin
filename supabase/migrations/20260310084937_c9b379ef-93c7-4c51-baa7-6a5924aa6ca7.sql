
-- Create order_status enum
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'shipped', 'delivered');

-- Products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  in_stock BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL DEFAULT ('ORD' || to_char(now(), 'YYYYMMDDHH24MISS')),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  total NUMERIC NOT NULL,
  status order_status NOT NULL DEFAULT 'pending',
  payment_screenshot TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Order items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price NUMERIC NOT NULL
);

-- Reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  product_name TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL DEFAULT '',
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: Products are publicly readable, admin can CRUD
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are publicly readable" ON public.products FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update products" ON public.products FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete products" ON public.products FOR DELETE TO authenticated USING (true);

-- RLS: Orders - admin can read/update, public can insert
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read orders" ON public.orders FOR SELECT TO authenticated USING (true);
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can update orders" ON public.orders FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- RLS: Order items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read order items" ON public.order_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Anyone can create order items" ON public.order_items FOR INSERT WITH CHECK (true);

-- RLS: Reviews - public can read approved, admin can CRUD
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read approved reviews" ON public.reviews FOR SELECT USING (approved = true);
CREATE POLICY "Authenticated users can read all reviews" ON public.reviews FOR SELECT TO authenticated USING (true);
CREATE POLICY "Anyone can create reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can update reviews" ON public.reviews FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete reviews" ON public.reviews FOR DELETE TO authenticated USING (true);
