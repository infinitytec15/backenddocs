-- Create storage bucket for invoices if it doesn't exist
DO $$
DECLARE
    bucket_exists BOOLEAN;
BEGIN
    -- Check if the invoices bucket exists
    SELECT EXISTS (
        SELECT 1 FROM storage.buckets WHERE name = 'invoices'
    ) INTO bucket_exists;
    
    IF NOT bucket_exists THEN
        -- Create the invoices bucket
        INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
        VALUES (
            'invoices',
            'invoices',
            FALSE,
            FALSE,
            5242880, -- 5MB limit
            ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']::text[]
        );

        -- Create policy to allow users to upload their own invoices
        CREATE POLICY "Users can upload their own invoices"
            ON storage.objects
            FOR INSERT
            TO authenticated
            WITH CHECK (bucket_id = 'invoices' AND split_part(name, '/', 1) = auth.uid()::text);

        -- Create policy to allow users to read their own invoices
        CREATE POLICY "Users can read their own invoices"
            ON storage.objects
            FOR SELECT
            TO authenticated
            USING (bucket_id = 'invoices' AND split_part(name, '/', 1) = auth.uid()::text);

        -- Create policy to allow admins to read all invoices
        CREATE POLICY "Admins can read all invoices"
            ON storage.objects
            FOR SELECT
            TO authenticated
            USING (
                bucket_id = 'invoices' AND
                EXISTS (
                    SELECT 1 FROM public.user_settings
                    WHERE user_id = auth.uid()
                    AND (role = 'admin' OR role = 'superadmin')
                )
            );
    END IF;
END
$$;