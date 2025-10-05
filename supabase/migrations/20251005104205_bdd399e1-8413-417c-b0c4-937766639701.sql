-- Add DELETE policy for admins on contact_messages table
CREATE POLICY "Admins can delete contact messages"
ON public.contact_messages
FOR DELETE
USING (is_admin(auth.uid()));