-- Add document and contract limits to plans table
ALTER TABLE plans
ADD COLUMN IF NOT EXISTS document_limit INTEGER DEFAULT 10,
ADD COLUMN IF NOT EXISTS contract_limit INTEGER DEFAULT 5,
ADD COLUMN IF NOT EXISTS storage_limit_mb INTEGER DEFAULT 100;

-- Update existing plans with appropriate limits
UPDATE plans SET document_limit = 10, contract_limit = 5, storage_limit_mb = 100 WHERE name = 'Free';
UPDATE plans SET document_limit = 50, contract_limit = 20, storage_limit_mb = 500 WHERE name = 'Basic';
UPDATE plans SET document_limit = 200, contract_limit = 100, storage_limit_mb = 2000 WHERE name = 'Pro';
UPDATE plans SET document_limit = 1000, contract_limit = 500, storage_limit_mb = 10000 WHERE name = 'Enterprise';

-- Add file_size columns to documents and contracts tables
ALTER TABLE documents
ADD COLUMN IF NOT EXISTS file_size BIGINT DEFAULT 0;

ALTER TABLE contracts
ADD COLUMN IF NOT EXISTS file_size BIGINT DEFAULT 0;

-- Create index for faster document and contract counting
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_contracts_user_id ON contracts(user_id);

-- Add is_trial column to user_plans table if it doesn't exist
ALTER TABLE user_plans
ADD COLUMN IF NOT EXISTS is_trial BOOLEAN DEFAULT FALSE;

-- Update existing trial plans
UPDATE user_plans
SET is_trial = TRUE
WHERE start_date >= (CURRENT_DATE - INTERVAL '7 days')
AND status = 'active';

-- Add is_active column to user_plans table if it doesn't exist
ALTER TABLE user_plans
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Update existing active plans
UPDATE user_plans
SET is_active = TRUE
WHERE status = 'active';
