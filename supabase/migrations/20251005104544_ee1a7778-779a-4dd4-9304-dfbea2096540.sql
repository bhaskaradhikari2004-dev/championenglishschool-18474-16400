-- Create table for welcome popup settings
CREATE TABLE public.welcome_popup (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  created_by uuid NOT NULL
);

-- Enable RLS
ALTER TABLE public.welcome_popup ENABLE ROW LEVEL SECURITY;

-- Anyone can view active popup
CREATE POLICY "Anyone can view active popup"
ON public.welcome_popup
FOR SELECT
USING (is_active = true);

-- Admins can manage popup
CREATE POLICY "Admins can manage popup"
ON public.welcome_popup
FOR ALL
USING (is_admin(auth.uid()));

-- Insert default popup image
INSERT INTO public.welcome_popup (image_url, is_active, created_by)
VALUES (
  '/src/assets/welcome-banner.jpg',
  true,
  (SELECT id FROM auth.users LIMIT 1)
);