-- Create contract_fields table
CREATE TABLE IF NOT EXISTS contract_fields (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  field_name TEXT NOT NULL,
  field_type TEXT NOT NULL,
  field_value TEXT,
  is_required BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on contract_id for performance
CREATE INDEX IF NOT EXISTS idx_contract_fields_contract_id ON contract_fields(contract_id);

-- Enable RLS on contract_fields
ALTER TABLE contract_fields ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for contract_fields
CREATE POLICY "Users can insert their own contract fields"
  ON contract_fields FOR INSERT
  WITH CHECK (contract_id IN (SELECT id FROM contracts WHERE user_id = auth.uid()));

CREATE POLICY "Users can view their own contract fields"
  ON contract_fields FOR SELECT
  USING (contract_id IN (SELECT id FROM contracts WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own contract fields"
  ON contract_fields FOR UPDATE
  USING (contract_id IN (SELECT id FROM contracts WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own contract fields"
  ON contract_fields FOR DELETE
  USING (contract_id IN (SELECT id FROM contracts WHERE user_id = auth.uid()));

-- Create contract_forms table
CREATE TABLE IF NOT EXISTS contract_forms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  form_name TEXT NOT NULL,
  form_description TEXT,
  is_template BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft',
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on contract_id for performance
CREATE INDEX IF NOT EXISTS idx_contract_forms_contract_id ON contract_forms(contract_id);

-- Enable RLS on contract_forms
ALTER TABLE contract_forms ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for contract_forms
CREATE POLICY "Users can insert their own contract forms"
  ON contract_forms FOR INSERT
  WITH CHECK (contract_id IN (SELECT id FROM contracts WHERE user_id = auth.uid()));

CREATE POLICY "Users can view their own contract forms"
  ON contract_forms FOR SELECT
  USING (contract_id IN (SELECT id FROM contracts WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own contract forms"
  ON contract_forms FOR UPDATE
  USING (contract_id IN (SELECT id FROM contracts WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own contract forms"
  ON contract_forms FOR DELETE
  USING (contract_id IN (SELECT id FROM contracts WHERE user_id = auth.uid()));

-- Enable realtime for the new tables
alter publication supabase_realtime add table contract_fields;
alter publication supabase_realtime add table contract_forms;