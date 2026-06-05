-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES TABLE (Authentication/Users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'sales', -- 'admin', 'sales', 'manager'
  organization TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- SCHOOLS TABLE (Core CRM)
CREATE TABLE IF NOT EXISTS schools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_name TEXT NOT NULL,
  province TEXT,
  district TEXT,
  
  principal TEXT,
  procurement_contact TEXT,
  phone TEXT,
  email TEXT,
  
  est_annual_spend NUMERIC,
  lead_status TEXT, -- 'Hot', 'Warm', 'Cold', 'Inactive'
  supplier_lock TEXT, -- 'Strong', 'Medium', 'Weak'
  
  ai_priority_score NUMERIC DEFAULT 0,
  next_best_action TEXT, -- 'HOT', 'WARM', 'COLD'
  days_since_last_contact INT DEFAULT 0,
  
  last_ai_run TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- DEALS TABLE (Sales Pipeline)
CREATE TABLE IF NOT EXISTS deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id),
  
  stage TEXT NOT NULL, -- 'Lead', 'Contacted', 'Proposal', 'Negotiation', 'Closed'
  deal_value NUMERIC NOT NULL,
  probability NUMERIC DEFAULT 50, -- 0-100 probability percentage
  
  expected_close DATE,
  closed_date DATE,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ACTIVITIES TABLE (Action Logging)
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id),
  
  type TEXT NOT NULL, -- 'CALL', 'EMAIL', 'WHATSAPP', 'AI_HOT_OUTREACH', 'AI_WARM_FOLLOWUP', etc.
  notes TEXT,
  
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- FOLLOWUPS TABLE (Follow-up Management)
CREATE TABLE IF NOT EXISTS followups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id),
  school_name TEXT,
  
  next_followup DATE NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'overdue'
  priority TEXT DEFAULT 'medium', -- 'high', 'medium', 'low'
  notes TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- QUOTES TABLE (Quote Management)
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id),
  deal_id UUID REFERENCES deals(id),
  
  quote_number TEXT UNIQUE,
  items JSONB, -- Array of quote items
  subtotal NUMERIC,
  tax NUMERIC,
  total NUMERIC,
  
  validity_days INT DEFAULT 14,
  status TEXT DEFAULT 'draft', -- 'draft', 'sent', 'accepted', 'rejected'
  
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- INDEXES (Performance Optimization)
CREATE INDEX idx_schools_ai_priority ON schools(ai_priority_score DESC);
CREATE INDEX idx_schools_next_action ON schools(next_best_action);
CREATE INDEX idx_deals_stage ON deals(stage);
CREATE INDEX idx_deals_school_id ON deals(school_id);
CREATE INDEX idx_activities_school_id ON activities(school_id);
CREATE INDEX idx_followups_school_id ON followups(school_id);
CREATE INDEX idx_followups_status ON followups(status);
CREATE INDEX idx_quotes_school_id ON quotes(school_id);

-- SAMPLE DATA (Optional - Remove in production)
-- INSERT INTO schools (school_name, principal, procurement_contact, phone, email, est_annual_spend, lead_status) 
-- VALUES 
--   ('Test School 1', 'Mr. Smith', 'John Doe', '555-0001', 'john@school1.com', 500000, 'Hot'),
--   ('Test School 2', 'Ms. Johnson', 'Jane Smith', '555-0002', 'jane@school2.com', 350000, 'Warm');

COMMIT;
