-- Create table for homepage images
CREATE TABLE public.homepage_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  image_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID NOT NULL
);

-- Enable RLS
ALTER TABLE public.homepage_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view active homepage images"
ON public.homepage_images
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage homepage images"
ON public.homepage_images
FOR ALL
USING (is_admin(auth.uid()));

-- Create table for childcare images
CREATE TABLE public.childcare_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  image_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID NOT NULL
);

-- Enable RLS
ALTER TABLE public.childcare_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view active childcare images"
ON public.childcare_images
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage childcare images"
ON public.childcare_images
FOR ALL
USING (is_admin(auth.uid()));

-- Create storage bucket for homepage images
INSERT INTO storage.buckets (id, name, public)
VALUES ('homepage-images', 'homepage-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for homepage images
CREATE POLICY "Anyone can view homepage images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'homepage-images');

CREATE POLICY "Admins can upload homepage images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'homepage-images' AND is_admin(auth.uid()));

CREATE POLICY "Admins can update homepage images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'homepage-images' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete homepage images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'homepage-images' AND is_admin(auth.uid()));

-- Create storage bucket for childcare images
INSERT INTO storage.buckets (id, name, public)
VALUES ('childcare-images', 'childcare-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for childcare images
CREATE POLICY "Anyone can view childcare images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'childcare-images');

CREATE POLICY "Admins can upload childcare images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'childcare-images' AND is_admin(auth.uid()));

CREATE POLICY "Admins can update childcare images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'childcare-images' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete childcare images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'childcare-images' AND is_admin(auth.uid()));