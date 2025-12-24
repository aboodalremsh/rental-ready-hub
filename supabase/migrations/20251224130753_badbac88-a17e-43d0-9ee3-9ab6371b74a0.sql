-- Create property types enum
CREATE TYPE public.property_type AS ENUM ('apartment', 'office', 'studio', 'penthouse', 'commercial');

-- Create property status enum
CREATE TYPE public.property_status AS ENUM ('available', 'rented', 'maintenance');

-- Create rental status enum
CREATE TYPE public.rental_status AS ENUM ('pending', 'approved', 'rejected', 'completed');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create properties table
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  property_type property_type NOT NULL DEFAULT 'apartment',
  status property_status NOT NULL DEFAULT 'available',
  price DECIMAL(10,2) NOT NULL,
  bedrooms INTEGER DEFAULT 1,
  bathrooms INTEGER DEFAULT 1,
  area_sqft INTEGER,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  zip_code TEXT,
  country TEXT DEFAULT 'USA',
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  amenities TEXT[],
  images TEXT[],
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rentals/bookings table
CREATE TABLE public.rentals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status rental_status NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact messages table
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Properties policies (public read, admin write)
CREATE POLICY "Anyone can view available properties" ON public.properties
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert properties" ON public.properties
  FOR INSERT TO authenticated WITH CHECK (true);

-- Rentals policies
CREATE POLICY "Users can view their own rentals" ON public.rentals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create rentals" ON public.rentals
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own rentals" ON public.rentals
  FOR UPDATE USING (auth.uid() = user_id);

-- Contact messages policies (anyone can submit)
CREATE POLICY "Anyone can submit contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rentals_updated_at
  BEFORE UPDATE ON public.rentals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample properties
INSERT INTO public.properties (title, description, property_type, price, bedrooms, bathrooms, area_sqft, address, city, state, zip_code, amenities, images, featured) VALUES
('Luxury Downtown Penthouse', 'Stunning penthouse with panoramic city views, featuring floor-to-ceiling windows, gourmet kitchen, and private terrace.', 'penthouse', 8500.00, 4, 3, 3200, '100 Park Avenue', 'New York', 'NY', '10017', ARRAY['Gym', 'Pool', 'Concierge', 'Parking', 'Rooftop'], ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'], true),
('Modern Waterfront Studio', 'Sleek studio apartment with stunning harbor views, modern finishes, and access to premium amenities.', 'studio', 2800.00, 1, 1, 650, '250 Waterfront Drive', 'San Francisco', 'CA', '94111', ARRAY['Gym', 'Laundry', 'Doorman'], ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], true),
('Executive Office Suite', 'Premium office space in prime business district with meeting rooms, reception area, and stunning city views.', 'office', 5500.00, 0, 2, 1800, '500 Financial Center', 'Chicago', 'IL', '60601', ARRAY['Meeting Rooms', 'Reception', 'High-Speed Internet', 'Kitchen'], ARRAY['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'], true),
('Cozy Garden Apartment', 'Charming ground-floor apartment with private garden, perfect for families or those who love outdoor space.', 'apartment', 3200.00, 2, 2, 1100, '45 Oak Street', 'Boston', 'MA', '02108', ARRAY['Garden', 'Pet-Friendly', 'Parking', 'Storage'], ARRAY['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800', 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800'], false),
('Tech Hub Office Space', 'Modern co-working space designed for startups and tech companies, featuring open floor plan and collaboration areas.', 'commercial', 4200.00, 0, 3, 2500, '888 Innovation Blvd', 'Austin', 'TX', '78701', ARRAY['24/7 Access', 'Meeting Rooms', 'Event Space', 'Bike Storage', 'Shower'], ARRAY['https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800', 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800'], true),
('Beachfront Paradise', 'Luxurious beachfront apartment with direct beach access, ocean views from every room, and resort-style amenities.', 'apartment', 6800.00, 3, 2, 1800, '1 Ocean Boulevard', 'Miami', 'FL', '33139', ARRAY['Beach Access', 'Pool', 'Spa', 'Valet Parking', 'Gym'], ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'], true);
