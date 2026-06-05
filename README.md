# 🏫 BE City Procurement OS

**Autonomous AI Procurement System for School Supply Management**

> South Africa's Most Advanced School Procurement Intelligence Platform

## 📋 Overview

BE City Procurement OS is a full-stack SaaS application designed to revolutionize school procurement in South Africa. The system automates lead scoring, outreach management, and pipeline tracking for education supply businesses.

### Key Features

✅ **AI-Powered Lead Scoring** - Autonomous school prioritization
✅ **CRM Pipeline Management** - Complete deal tracking from Lead → Closed
✅ **Automated Outreach** - WhatsApp, Email, and SMS integration ready
✅ **Smart Follow-ups** - Intelligent follow-up scheduling and reminders
✅ **Real-time Dashboard** - KPI tracking and command center
✅ **Cron Automation** - Scheduled AI runs without manual intervention
✅ **Multi-tenant Ready** - Scalable for multiple organizations

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier available)
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/Beatzonlightscity/be-city-procurement-os.git
cd be-city-procurement-os

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local

# Add your Supabase credentials to .env.local
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Setup Supabase

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Create a new project
   - Wait for database initialization

2. **Create Tables**
   - Open SQL Editor in Supabase
   - Copy contents of `supabase/schema.sql`
   - Run the SQL script
   - Verify all tables are created

3. **Get API Keys**
   - Project Settings → API
   - Copy `Project URL`
   - Copy `anon public key`
   - Copy `service_role key` (keep secret!)

---

## 📂 Project Structure

```
be-city-procurement-os/
├── app/                          # Next.js app router
│   ├── dashboard/page.tsx         # Main dashboard
│   ├── schools/page.tsx           # School database
│   ├── pipeline/page.tsx          # Sales pipeline kanban
│   ├── automation/page.tsx        # AI control panel
│   ├── settings/page.tsx          # Configuration
│   ├── layout.tsx                 # Root layout
│   └── globals.css                # Tailwind styles
│
├── components/                    # Reusable React components
│   ├── Sidebar.tsx                # Navigation sidebar
│   ├── KPICard.tsx                # Dashboard metric cards
│   └── AIActionFeed.tsx           # Activity log
│
├── lib/                           # Core business logic
│   ├── supabase.ts                # Supabase client
│   ├── auth.ts                    # Authentication
│   └── ai/                        # AI Engine
│       ├── scoring.ts             # Lead scoring algorithm
│       ├── engine.ts              # Main AI orchestration
│       ├── outreach.ts            # Message generation
│       ├── quotes.ts              # Quote generation
│       └── followups.ts           # Follow-up management
│
├── pages/api/                     # API routes (future expansion)
│   ├── schools.ts
│   ├── deals.ts
│   ├── run-ai.ts
│   └── followups.ts
│
├── scripts/                       # Utility scripts
│   └── cron-ai.js                 # Scheduled AI runner
│
├── supabase/                      # Database
│   └── schema.sql                 # Database schema
│
├── package.json                   # Dependencies
├── tailwind.config.js             # Tailwind CSS config
├── tsconfig.json                  # TypeScript config
├── .env.example                   # Environment variables template
└── README.md                      # This file
```

---

## 🧠 How the AI Engine Works

### 1. **Scoring Algorithm**

Each school receives a score (0-100) based on:

- **Budget Impact** (0-20 pts) - Annual procurement spend
- **Lead Status** (0-30 pts) - Current engagement level (Hot/Warm/Cold)
- **Contact Recency** (0-25 pts) - Days since last contact
- **Contact Information** (0-10 pts) - Complete email/phone data
- **Supplier Lock** (0-15 pts) - Likelihood to switch suppliers

### 2. **Action Determination**

```
Score ≥ 80  →  HOT  (Immediate outreach + quote)
Score 50-79 →  WARM (Follow-up reminder + nurture)
Score < 50  →  COLD (Long-term nurture pipeline)
```

### 3. **Autonomous Execution**

Daily at 6:00 AM:
1. Fetch all schools from database
2. Calculate score for each
3. Generate personalized messages
4. Create auto-quotes
5. Log activities
6. Schedule follow-ups

---

## 📊 Dashboard Metrics

| Metric | Description |
|--------|-------------|
| **Total Schools** | All schools in pipeline |
| **HOT Leads** | Score > 80 (urgent outreach) |
| **WARM Leads** | Score 50-79 (nurture) |
| **Revenue Forecast** | Estimated revenue at 30% conversion |
| **Active Deals** | Deals in Proposal stage |
| **AI System Status** | Real-time engine status |

---

## 🔄 Automation Workflows

### Daily AI Run (6:00 AM UTC)
```
Fetch Schools → Calculate Scores → Determine Actions → Log Activities → Complete
```

### Weekly Follow-up Check (Monday 8:00 AM UTC)
```
Check Overdue Follow-ups → Send Reminders → Update Status
```

### Monthly Pipeline Review (1st of Month 10:00 AM UTC)
```
Aggregate Metrics → Generate Report → Send to Team
```

---

## 🤖 AI Features (Implemented)

✅ Lead scoring algorithm
✅ Action determination (HOT/WARM/COLD)
✅ Message generation
✅ Quote generation
✅ Activity logging
✅ Follow-up scheduling
✅ Cron job orchestration

### Coming Soon

🔲 WhatsApp API integration
🔲 Email delivery system
🔲 SMS messaging
🔲 PDF quote generation
🔲 ML-based probability prediction
🔲 Multi-language support

---

## 📱 Pages Overview

### Dashboard (`/dashboard`)
Central command center with key metrics and recent activities.

### Schools (`/schools`)
Manage 3,600+ school database with filtering by HOT/WARM/COLD.

### Pipeline (`/pipeline`)
Kanban-style deal pipeline with revenue forecasting.

### Automation (`/automation`)
AI control panel - run manual AI execution, view system health.

### Settings (`/settings`)
Configure AI thresholds and follow-up intervals.

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Deploy to Other Platforms

Supports: AWS, Google Cloud, Azure, DigitalOcean, Heroku

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🔐 Security Considerations

- Never commit `.env.local` with real credentials
- Use Supabase Row Level Security (RLS) in production
- Implement role-based access control
- Rotate API keys regularly
- Use HTTPS in production

---

## 📞 Support & Contact

BE City Stationery Suppliers
- **Email:** support@becityprocurement.co.za
- **WhatsApp:** +27 60 XXX XXXX
- **Website:** www.becity.co.za

---

## 📄 License

MIT License - See LICENSE file

---

## 🙏 Acknowledgments

Built with:
- [Next.js 14](https://nextjs.org)
- [React 18](https://react.dev)
- [Supabase](https://supabase.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

---

**🎯 Version:** 1.0.0 | **Last Updated:** June 2026
