-- Create document categories table
CREATE TABLE IF NOT EXISTS document_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create document tags table
CREATE TABLE IF NOT EXISTS document_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  color VARCHAR(20),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create document versions table
CREATE TABLE IF NOT EXISTS document_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL,
  version_number INTEGER NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  comment TEXT,
  UNIQUE(document_id, version_number)
);

-- Create document_tag_relations junction table
CREATE TABLE IF NOT EXISTS document_tag_relations (
  document_id UUID NOT NULL,
  tag_id UUID NOT NULL REFERENCES document_tags(id),
  PRIMARY KEY (document_id, tag_id)
);

-- Create document access logs table
CREATE TABLE IF NOT EXISTS document_access_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  access_type VARCHAR(20) NOT NULL, -- view, download, edit, etc.
  accessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address VARCHAR(50),
  user_agent TEXT
);

-- Create document comments table
CREATE TABLE IF NOT EXISTS document_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  parent_comment_id UUID REFERENCES document_comments(id)
);

-- Add realtime publication for all tables
alter publication supabase_realtime add table document_categories;
alter publication supabase_realtime add table document_tags;
alter publication supabase_realtime add table document_versions;
alter publication supabase_realtime add table document_tag_relations;
alter publication supabase_realtime add table document_access_logs;
alter publication supabase_realtime add table document_comments;

-- Create RLS policies for document_categories
DROP POLICY IF EXISTS "Users can view document categories" ON document_categories;
CREATE POLICY "Users can view document categories"
  ON document_categories FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins can insert document categories" ON document_categories;
CREATE POLICY "Admins can insert document categories"
  ON document_categories FOR INSERT
  WITH CHECK ((SELECT role FROM user_settings WHERE user_id = auth.uid()) IN ('admin', 'superadmin'));

DROP POLICY IF EXISTS "Admins can update document categories" ON document_categories;
CREATE POLICY "Admins can update document categories"
  ON document_categories FOR UPDATE
  USING ((SELECT role FROM user_settings WHERE user_id = auth.uid()) IN ('admin', 'superadmin'));

DROP POLICY IF EXISTS "Admins can delete document categories" ON document_categories;
CREATE POLICY "Admins can delete document categories"
  ON document_categories FOR DELETE
  USING ((SELECT role FROM user_settings WHERE user_id = auth.uid()) IN ('admin', 'superadmin'));

-- Create RLS policies for document_tags
DROP POLICY IF EXISTS "Users can view document tags" ON document_tags;
CREATE POLICY "Users can view document tags"
  ON document_tags FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can insert document tags" ON document_tags;
CREATE POLICY "Users can insert document tags"
  ON document_tags FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can update their own document tags" ON document_tags;
CREATE POLICY "Users can update their own document tags"
  ON document_tags FOR UPDATE
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can delete their own document tags" ON document_tags;
CREATE POLICY "Users can delete their own document tags"
  ON document_tags FOR DELETE
  USING (auth.uid() IS NOT NULL);