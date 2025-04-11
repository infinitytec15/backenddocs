-- Create storage buckets for documents and contracts if they don't exist
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES 
('documents', 'documents', false, false, 52428800, '{"application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","image/jpeg","image/png"}'),
('contracts', 'contracts', false, false, 52428800, '{"application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"}')
ON CONFLICT (id) DO NOTHING;

-- Create policies for documents bucket
DROP POLICY IF EXISTS "Users can view their own documents" ON storage.objects;
CREATE POLICY "Users can view their own documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'documents' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Users can upload their own documents" ON storage.objects;
CREATE POLICY "Users can upload their own documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'documents' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Users can update their own documents" ON storage.objects;
CREATE POLICY "Users can update their own documents"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'documents' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Users can delete their own documents" ON storage.objects;
CREATE POLICY "Users can delete their own documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'documents' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Create policies for contracts bucket
DROP POLICY IF EXISTS "Users can view their own contracts" ON storage.objects;
CREATE POLICY "Users can view their own contracts"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'contracts' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Users can upload their own contracts" ON storage.objects;
CREATE POLICY "Users can upload their own contracts"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'contracts' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Users can update their own contracts" ON storage.objects;
CREATE POLICY "Users can update their own contracts"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'contracts' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Users can delete their own contracts" ON storage.objects;
CREATE POLICY "Users can delete their own contracts"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'contracts' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Create policies for shared documents and contracts
DROP POLICY IF EXISTS "Users can view shared documents" ON storage.objects;
CREATE POLICY "Users can view shared documents"
ON storage.objects FOR SELECT
USING (
  bucket_id IN ('documents', 'contracts') AND 
  EXISTS (
    SELECT 1 FROM document_shares 
    WHERE document_shares.file_path = storage.objects.name 
    AND document_shares.shared_with = auth.uid()
    AND document_shares.expires_at > NOW()
  )
);