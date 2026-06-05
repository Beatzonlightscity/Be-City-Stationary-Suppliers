'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import KPICard from '@/components/KPICard'
import AIActionFeed from '@/components/AIActionFeed'

interface DashboardData {
  totalSchools: number
  hotLeads: number
  warmLeads: number
  coldLeads: number
  totalRevenueForecast: number
  activeDealsPipeline: number
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>({
    totalSchools: 0,
    hotLeads: 0,
    warmLeads: 0,
    coldLeads: 0,
    totalRevenueForecast: 0,
    activeDealsPipeline: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch schools with scores
      const { data: schools, error: schoolsError } = await supabase
        .from('schools')
        .select('*')

      if (schoolsError) throw schoolsError

      // Count by action
      const hotLeads = schools?.filter(
        (s: any) => s.next_best_action === 'HOT'
      ).length || 0
      const warmLeads = schools?.filter(
        (s: any) => s.next_best_action === 'WARM'
      ).length || 0
      const coldLeads = schools?.filter(
        (s: any) => s.next_best_action === 'COLD'
      ).length || 0

      // Calculate revenue forecast (sum of estimated annual spend * probability)
      const totalRevenue = schools?.reduce(
        (sum: number, s: any) => sum + (s.est_annual_spend || 0) * 0.3,
        0
      ) || 0

      // Fetch active deals
      const { data: deals, error: dealsError } = await supabase
        .from('deals')
        .select('*')
        .eq('stage', 'Proposal')

      if (dealsError) throw dealsError

      setData({
        totalSchools: schools?.length || 0,
        hotLeads,
        warmLeads,
        coldLeads,
        totalRevenueForecast: Math.round(totalRevenue),
        activeDealsPipeline: deals?.length || 0,
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">📊 Procurement Command Center</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <KPICard
          title="Total Schools in Pipeline"
          value={data.totalSchools}
          icon="🏫"
          color="blue"
        />
        <KPICard
          title="HOT Leads (Priority)"
          value={data.hotLeads}
          icon="🔥"
          color="red"
          trend={5}
        />
        <KPICard
          title="WARM Leads (Follow-Up)"
          value={data.warmLeads}
          icon="🌡️"
          color="yellow"
        />
        <KPICard
          title="Revenue Forecast (30%)"
          value={`R${(data.totalRevenueForecast / 1000).toFixed(1)}k`}
          icon="💰"
          color="green"
        />
        <KPICard
          title="Active Deals in Proposal"
          value={data.activeDealsPipeline}
          icon="📋"
          color="blue"
        />
        <KPICard
          title="AI System Status"
          value="ACTIVE"
          icon="🤖"
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AIActionFeed />
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">AI Engine</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                Running
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Cron Jobs</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database Sync</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Autonomous Mode</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                ON
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
