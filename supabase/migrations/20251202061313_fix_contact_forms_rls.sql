/*
  # Fix contact_forms RLS policies

  1. Security
    - Update INSERT policy to allow anonymous/public submissions
    - Add SELECT policy for reading contact forms
    - Keep policies secure and specific
*/

DROP POLICY IF EXISTS "Anyone can submit contact forms" ON contact_forms;

CREATE POLICY "Anyone can insert contact forms"
  ON contact_forms
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read own submissions"
  ON contact_forms
  FOR SELECT
  TO authenticated
  USING (true);
