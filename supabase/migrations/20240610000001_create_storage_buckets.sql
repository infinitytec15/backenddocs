-- Enable the storage extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pg_net";

-- Create the storage schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS storage;

-- Create the buckets table if it doesn't exist
CREATE TABLE IF NOT EXISTS storage.buckets (
  id text NOT NULL,
  name text NOT NULL,
  owner uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  public boolean DEFAULT FALSE,
  avif_autodetection boolean DEFAULT FALSE,
  file_size_limit bigint,
  allowed_mime_types text[],
  PRIMARY KEY (id),
  UNIQUE (name)
);

-- Create the objects table if it doesn't exist
CREATE TABLE IF NOT EXISTS storage.objects (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  bucket_id text,
  name text,
  owner uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_accessed_at timestamptz DEFAULT now(),
  metadata jsonb,
  path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/')) STORED,
  PRIMARY KEY (id),
  FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id) ON DELETE CASCADE
);

-- Create the policies table if it doesn't exist
CREATE TABLE IF NOT EXISTS storage.policies (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  definition jsonb NOT NULL,
  bucket_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (id),
  FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id) ON DELETE CASCADE
);

-- Create the documents bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('documents', 'documents', false, 52428800, '{"application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","image/jpeg","image/png","text/plain","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}')
ON CONFLICT (id) DO NOTHING;

-- Create the contracts bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('contracts', 'contracts', false, 52428800, '{"application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","image/jpeg","image/png","text/plain","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}')
ON CONFLICT (id) DO NOTHING;

-- Create policy for documents bucket - only authenticated users can read their own documents
INSERT INTO storage.policies (name, definition, bucket_id)
VALUES (
  'Documents Access Policy',
  jsonb_build_object(
    'name', 'Documents Access Policy',
    'owner', 'authenticated',
    'read', 'owner = auth.uid()',
    'insert', 'owner = auth.uid()',
    'update', 'owner = auth.uid()',
    'delete', 'owner = auth.uid()'
  ),
  'documents'
)
ON CONFLICT DO NOTHING;

-- Create policy for contracts bucket - only authenticated users can read their own contracts
INSERT INTO storage.policies (name, definition, bucket_id)
VALUES (
  'Contracts Access Policy',
  jsonb_build_object(
    'name', 'Contracts Access Policy',
    'owner', 'authenticated',
    'read', 'owner = auth.uid()',
    'insert', 'owner = auth.uid()',
    'update', 'owner = auth.uid()',
    'delete', 'owner = auth.uid()'
  ),
  'contracts'
)
ON CONFLICT DO NOTHING;

-- Drop the function if it exists before recreating it
DROP FUNCTION IF EXISTS storage.foldername(text);

-- Create a helper function for file uploads
CREATE OR REPLACE FUNCTION storage.foldername(name text)
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  _parts text[];
  _filename text;
BEGIN
  SELECT string_to_array(name, '/') INTO _parts;
  SELECT array_length(_parts, 1) INTO _filename;
  RETURN _parts[_filename];
END;
$$;

-- Enable realtime for storage buckets
ALTER PUBLICATION supabase_realtime ADD TABLE storage.buckets;
ALTER PUBLICATION supabase_realtime ADD TABLE storage.objects;
