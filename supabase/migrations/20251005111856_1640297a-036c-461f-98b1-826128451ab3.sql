-- Create table for about information
CREATE TABLE IF NOT EXISTS public.about_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mission text NOT NULL,
  vision text NOT NULL,
  values text NOT NULL,
  welcome_title text NOT NULL DEFAULT 'Welcome to Champion English School',
  welcome_description text NOT NULL,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.about_info ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view about info"
  ON public.about_info
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage about info"
  ON public.about_info
  FOR ALL
  USING (is_admin(auth.uid()));

-- Insert default about information
INSERT INTO public.about_info (
  mission,
  vision,
  values,
  welcome_title,
  welcome_description
)
VALUES (
  'To provide holistic education that develops academic excellence, character building, and moral values in every student, preparing them for success in life.',
  'To be a leading educational institution that nurtures confident, creative, and responsible global citizens who contribute positively to society.',
  'Excellence in Education, Character Development, Integrity & Honesty, Respect & Compassion, Innovation & Creativity',
  'Welcome to Champion English School',
  'At Champion English School, we are committed to providing quality education that shapes character, builds confidence, and prepares our students for success in every aspect of life. Our dedicated team of educators creates a nurturing environment where learning is both joyful and purposeful.'
)
ON CONFLICT DO NOTHING;