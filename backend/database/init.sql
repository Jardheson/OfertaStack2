-- Migration inicial para tabela de histórico de pesquisas
CREATE TABLE IF NOT EXISTS searches (
  id SERIAL PRIMARY KEY,
  query TEXT NOT NULL,
  corrected TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
