-- Create contract_fields table
CREATE TABLE IF NOT EXISTS public.contract_fields (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
  field_name VARCHAR(255) NOT NULL,
  field_type VARCHAR(50) NOT NULL,
  field_value TEXT,
  is_required BOOLEAN DEFAULT false,
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create contract_forms table
CREATE TABLE IF NOT EXISTS public.contract_forms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
  form_name VARCHAR(255) NOT NULL,
  form_description TEXT,
  is_template BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'draft',
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create contract_signers table
CREATE TABLE IF NOT EXISTS public.contract_signers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID REFERENCES public.contracts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  profile_id UUID,
  status VARCHAR(50) DEFAULT 'pending',
  signature_data TEXT,
  signed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies
ALTER TABLE public.contract_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_signers ENABLE ROW LEVEL SECURITY;

-- Contract fields policies
CREATE POLICY "Users can view their own contract fields"
  ON public.contract_fields
  FOR SELECT
  USING (contract_id IN (SELECT id FROM public.contracts WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their own contract fields"
  ON public.contract_fields
  FOR INSERT
  WITH CHECK (contract_id IN (SELECT id FROM public.contracts WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own contract fields"
  ON public.contract_fields
  FOR UPDATE
  USING (contract_id IN (SELECT id FROM public.contracts WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own contract fields"
  ON public.contract_fields
  FOR DELETE
  USING (contract_id IN (SELECT id FROM public.contracts WHERE user_id = auth.uid()));

-- Contract forms policies
CREATE POLICY "Users can view their own contract forms"
  ON public.contract_forms
  FOR SELECT
  USING (contract_id IN (SELECT id FROM public.contracts WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their own contract forms"
  ON public.contract_forms
  FOR INSERT
  WITH CHECK (contract_id IN (SELECT id FROM public.contracts WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own contract forms"
  ON public.contract_forms
  FOR UPDATE
  USING (contract_id IN (SELECT id FROM public.contracts WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own contract forms"
  ON public.contract_forms
  FOR DELETE
  USING (contract_id IN (SELECT id FROM public.contracts WHERE user_id = auth.uid()));

-- Contract signers policies
CREATE POLICY "Users can view their own contract signers"
  ON public.contract_signers
  FOR SELECT
  USING (contract_id IN (SELECT id FROM public.contracts WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their own contract signers"
  ON public.contract_signers
  FOR INSERT
  WITH CHECK (contract_id IN (SELECT id FROM public.contracts WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own contract signers"
  ON public.contract_signers
  FOR UPDATE
  USING (contract_id IN (SELECT id FROM public.contracts WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own contract signers"
  ON public.contract_signers
  FOR DELETE
  USING (contract_id IN (SELECT id FROM public.contracts WHERE user_id = auth.uid()));

-- Add realtime publication for these tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.contract_fields;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contract_forms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contract_signers;
