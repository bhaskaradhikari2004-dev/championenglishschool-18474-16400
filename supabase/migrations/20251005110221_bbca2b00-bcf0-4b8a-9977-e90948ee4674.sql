-- Make created_by nullable to allow system default entries
ALTER TABLE public.leadership ALTER COLUMN created_by DROP NOT NULL;

-- Insert default leadership members if they don't exist
INSERT INTO public.leadership (name, position, message, display_order, is_active, created_by)
VALUES 
  (
    'Netra Prasad Subedi',
    'Director',
    'At Champion English School, we believe education is more than academics. It is about shaping character, building confidence, and preparing our students to thrive in every walk of life. Our commitment is to create a nurturing environment where learning is joyful and purposeful.',
    1,
    true,
    NULL
  ),
  (
    'Menuka Adhikari (Naju)',
    'Principal',
    'As the Principal, I am proud to lead a team dedicated to providing holistic education. We focus not only on knowledge but also on discipline, creativity, and moral values. At Champion English School, every child is given the platform to shine and achieve their potential.',
    2,
    true,
    NULL
  ),
  (
    'Abeen Rai',
    'Vice Principal',
    'Education is the key to transforming society. At Champion English School, we strive to instill a sense of responsibility and a spirit of curiosity in our students. Together, we aim to guide them toward excellence and lifelong learning.',
    3,
    true,
    NULL
  )
ON CONFLICT DO NOTHING;