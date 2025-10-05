-- Create storage bucket for about media
INSERT INTO storage.buckets (id, name, public)
VALUES ('about-media', 'about-media', true)
ON CONFLICT (id) DO NOTHING;

-- Create about_media table
CREATE TABLE IF NOT EXISTS public.about_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  display_order INTEGER DEFAULT 1,
  section TEXT DEFAULT 'gallery' CHECK (section IN ('gallery', 'hero', 'history')),
  is_active BOOLEAN DEFAULT true,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.about_media ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view active about media"
ON public.about_media
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage about media"
ON public.about_media
FOR ALL
USING (is_admin(auth.uid()));

-- Storage policies for about-media bucket
CREATE POLICY "Anyone can view about media files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'about-media');

CREATE POLICY "Admins can upload about media"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'about-media' AND is_admin(auth.uid()));

CREATE POLICY "Admins can update about media"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'about-media' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete about media"
ON storage.objects
FOR DELETE
USING (bucket_id = 'about-media' AND is_admin(auth.uid()));

-- Trigger for updated_at
CREATE TRIGGER update_about_media_updated_at
  BEFORE UPDATE ON public.about_media
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();