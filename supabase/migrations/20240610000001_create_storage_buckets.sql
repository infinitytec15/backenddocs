-- Create storage buckets for documents and contracts
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types, owner, created_at, updated_at)
VALUES 
  ('documents', 'documents', false, false, 52428800, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png']::text[], NULL, now(), now()),
  ('contracts', 'contracts', false, false, 52428800, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']::text[], NULL, now(), now())
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for documents bucket
-- Policy: Users can only insert their own documents
INSERT INTO storage.policies (name, definition, bucket_id, created_at, updated_at)
VALUES 
  ('Documents Insert Policy', '(bucket_id = ''documents'' AND auth.uid() = owner)', 'documents', now(), now()),
  ('Documents Select Policy', '(bucket_id = ''documents'' AND auth.uid() = owner)', 'documents', now(), now()),
  ('Documents Update Policy', '(bucket_id = ''documents'' AND auth.uid() = owner)', 'documents', now(), now()),
  ('Documents Delete Policy', '(bucket_id = ''documents'' AND auth.uid() = owner)', 'documents', now(), now())
ON CONFLICT (name, bucket_id) DO NOTHING;

-- Create storage policies for contracts bucket
-- Policy: Users can only insert their own contracts
INSERT INTO storage.policies (name, definition, bucket_id, created_at, updated_at)
VALUES 
  ('Contracts Insert Policy', '(bucket_id = ''contracts'' AND auth.uid() = owner)', 'contracts', now(), now()),
  ('Contracts Select Policy', '(bucket_id = ''contracts'' AND auth.uid() = owner)', 'contracts', now(), now()),
  ('Contracts Update Policy', '(bucket_id = ''contracts'' AND auth.uid() = owner)', 'contracts', now(), now()),
  ('Contracts Delete Policy', '(bucket_id = ''contracts'' AND auth.uid() = owner)', 'contracts', now(), now())
ON CONFLICT (name, bucket_id) DO NOTHING;