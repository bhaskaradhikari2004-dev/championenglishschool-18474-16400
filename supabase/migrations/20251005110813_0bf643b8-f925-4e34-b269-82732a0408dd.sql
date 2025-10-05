-- Create popup_images table for multiple images in welcome popup
CREATE TABLE IF NOT EXISTS public.popup_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  popup_id uuid NOT NULL REFERENCES public.welcome_popup(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  display_order integer NOT NULL DEFAULT 1,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(popup_id, display_order)
);

-- Enable RLS
ALTER TABLE public.popup_images ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view popup images"
  ON public.popup_images
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage popup images"
  ON public.popup_images
  FOR ALL
  USING (is_admin(auth.uid()));

-- Migrate existing image_url from welcome_popup to popup_images
INSERT INTO public.popup_images (popup_id, image_url, display_order)
SELECT id, image_url, 1
FROM public.welcome_popup
WHERE image_url IS NOT NULL
ON CONFLICT DO NOTHING;

-- Drop image_url column from welcome_popup (it's now in popup_images)
ALTER TABLE public.welcome_popup DROP COLUMN IF EXISTS image_url;