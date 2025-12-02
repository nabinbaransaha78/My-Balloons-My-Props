/*
  # Setup contact form email trigger

  1. Create function to send email via Edge Function
  2. Create trigger to call function on insert
*/

CREATE OR REPLACE FUNCTION send_contact_form_email()
RETURNS TRIGGER AS $$
DECLARE
  edge_function_url text;
  response record;
BEGIN
  edge_function_url := 'https://' || (
    SELECT split_part(
      current_setting('app.settings.supabase_url', true), 
      '/', 3
    )
  ) || '/functions/v1/send_contact_form_email';

  SELECT INTO response * FROM
    http_post(
      edge_function_url,
      jsonb_build_object('record', row_to_json(NEW)),
      'application/json'
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS contact_form_email_trigger ON contact_forms;

CREATE TRIGGER contact_form_email_trigger
AFTER INSERT ON contact_forms
FOR EACH ROW
EXECUTE FUNCTION send_contact_form_email();
