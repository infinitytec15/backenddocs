-- Atualiza a função de criação de plano de usuário para garantir período de trial de 7 dias

CREATE OR REPLACE FUNCTION create_user_trial_plan()
RETURNS TRIGGER AS $$
DECLARE
    default_plan_id UUID;
    trial_start_date TIMESTAMP;
    trial_end_date TIMESTAMP;
BEGIN
    -- Obter o plano padrão (gratuito)
    SELECT id INTO default_plan_id FROM plans WHERE is_default = true LIMIT 1;
    
    IF default_plan_id IS NULL THEN
        RAISE EXCEPTION 'Nenhum plano padrão encontrado';
    END IF;
    
    -- Definir datas do período de trial
    trial_start_date := NOW();
    trial_end_date := trial_start_date + INTERVAL '7 days';
    
    -- Criar entrada de plano para o usuário
    INSERT INTO user_plans (
        user_id,
        plan_id,
        start_date,
        end_date,
        is_active,
        is_trial
    ) VALUES (
        NEW.id,
        default_plan_id,
        trial_start_date,
        trial_end_date,
        true,
        true
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Verifica se o trigger já existe e o remove
DROP TRIGGER IF EXISTS create_trial_plan_on_user_insert ON auth.users;

-- Cria o trigger para automaticamente adicionar o plano de trial quando um usuário é criado
CREATE TRIGGER create_trial_plan_on_user_insert
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_user_trial_plan();

-- Atualiza a função para verificar se o período de trial acabou
CREATE OR REPLACE FUNCTION check_trial_period_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Se o período de trial acabou, atualiza o status
    IF NEW.end_date < NOW() AND NEW.is_trial = true THEN
        NEW.is_active := false;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Verifica se o trigger já existe e o remove
DROP TRIGGER IF EXISTS check_trial_period_on_update ON user_plans;

-- Cria o trigger para verificar o status do trial quando um plano é atualizado
CREATE TRIGGER check_trial_period_on_update
BEFORE UPDATE ON user_plans
FOR EACH ROW
EXECUTE FUNCTION check_trial_period_status();

-- Adiciona uma função para verificar diariamente os planos de trial expirados
CREATE OR REPLACE FUNCTION update_expired_trial_plans()
RETURNS void AS $$
BEGIN
    UPDATE user_plans
    SET is_active = false
    WHERE end_date < NOW() AND is_trial = true AND is_active = true;
    
    RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Cria um job para executar a função diariamente (se o pgAgent estiver disponível)
-- Nota: Esta parte pode precisar ser executada manualmente ou através de um cron job externo
-- dependendo da configuração do Supabase
