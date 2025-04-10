-- Add is_default column to plans table
ALTER TABLE plans ADD COLUMN IF NOT EXISTS is_default BOOLEAN DEFAULT false;

-- Create a function to ensure only one plan can be default
CREATE OR REPLACE FUNCTION ensure_single_default_plan()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_default = true THEN
    UPDATE plans SET is_default = false WHERE id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to enforce the single default plan rule
DROP TRIGGER IF EXISTS ensure_single_default_plan_trigger ON plans;
CREATE TRIGGER ensure_single_default_plan_trigger
BEFORE INSERT OR UPDATE ON plans
FOR EACH ROW
WHEN (NEW.is_default = true)
EXECUTE FUNCTION ensure_single_default_plan();

-- Set the lowest priced active plan as default
UPDATE plans
SET is_default = true
WHERE id = (
  SELECT id FROM plans
  WHERE active = true
  ORDER BY price_monthly ASC
  LIMIT 1
);
