-- Create a function to check if a user has access to a document
CREATE OR REPLACE FUNCTION check_document_access(document_id UUID, user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  has_access BOOLEAN;
BEGIN
  -- Check if the user is the document owner
  SELECT EXISTS (
    SELECT 1 FROM documents
    WHERE id = document_id AND created_by = user_id
  ) INTO has_access;
  
  -- If not the owner, check if the user is a member of the document's organization
  IF NOT has_access THEN
    SELECT EXISTS (
      SELECT 1 FROM organization_members om
      JOIN documents d ON d.organization_id = om.organization_id
      WHERE d.id = document_id AND om.profile_id = user_id
    ) INTO has_access;
  END IF;
  
  -- If still no access, check if the document is shared with the user
  IF NOT has_access THEN
    SELECT EXISTS (
      SELECT 1 FROM document_shares ds
      JOIN profiles p ON p.id = user_id
      WHERE ds.document_id = document_id AND (ds.shared_with = user_id OR ds.shared_with_email = p.email)
    ) INTO has_access;
  END IF;
  
  RETURN has_access;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if a user has access to a contract
CREATE OR REPLACE FUNCTION check_contract_access(contract_id UUID, user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  has_access BOOLEAN;
BEGIN
  -- Check if the user is the contract owner
  SELECT EXISTS (
    SELECT 1 FROM contracts
    WHERE id = contract_id AND created_by = user_id
  ) INTO has_access;
  
  -- If not the owner, check if the user is a member of the contract's organization
  IF NOT has_access THEN
    SELECT EXISTS (
      SELECT 1 FROM organization_members om
      JOIN contracts c ON c.organization_id = om.organization_id
      WHERE c.id = contract_id AND om.profile_id = user_id
    ) INTO has_access;
  END IF;
  
  -- If still no access, check if the user is a signer of the contract
  IF NOT has_access THEN
    SELECT EXISTS (
      SELECT 1 FROM contract_signers cs
      JOIN profiles p ON p.id = user_id
      WHERE cs.contract_id = contract_id AND (cs.profile_id = user_id OR cs.email = p.email)
    ) INTO has_access;
  END IF;
  
  RETURN has_access;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get all documents a user has access to
CREATE OR REPLACE FUNCTION get_accessible_documents(user_id UUID)
RETURNS SETOF documents AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT d.*
  FROM documents d
  WHERE 
    -- User is the document owner
    d.created_by = user_id
    -- User is a member of the document's organization
    OR EXISTS (
      SELECT 1 FROM organization_members om
      WHERE om.organization_id = d.organization_id AND om.profile_id = user_id
    )
    -- Document is shared with the user
    OR EXISTS (
      SELECT 1 FROM document_shares ds
      JOIN profiles p ON p.id = user_id
      WHERE ds.document_id = d.id AND (ds.shared_with = user_id OR ds.shared_with_email = p.email)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get all contracts a user has access to
CREATE OR REPLACE FUNCTION get_accessible_contracts(user_id UUID)
RETURNS SETOF contracts AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT c.*
  FROM contracts c
  WHERE 
    -- User is the contract owner
    c.created_by = user_id
    -- User is a member of the contract's organization
    OR EXISTS (
      SELECT 1 FROM organization_members om
      WHERE om.organization_id = c.organization_id AND om.profile_id = user_id
    )
    -- User is a signer of the contract
    OR EXISTS (
      SELECT 1 FROM contract_signers cs
      JOIN profiles p ON p.id = user_id
      WHERE cs.contract_id = c.id AND (cs.profile_id = user_id OR cs.email = p.email)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
