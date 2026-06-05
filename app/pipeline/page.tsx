'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Deal {
  id: string
  school_id: string
  stage: string
  deal_value: number
  probability: number
  expected_close: string
  school_name?: string
}

const stages = ['Lead', 'Contacted', 'Proposal', 'Negotiation', 'Closed']

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState({
    totalPipeline: 0,
    expectedRevenue: 0,
    avgProbability: 0,
  })

  useEffect(() => {
    fetchDeals()
  }, [])

  const fetchDeals = async () => {
    try {
      const { data, error } = await supabase
        .from('deals')
        .select(
          `*,
          schools:school_id(
            school_name
          )`
        )
        .order('deal_value', { ascending: false })

      if (error) throw error

      const dealsWithNames = (data || []).map((deal: any) => ({
        ...deal,
        school_name: deal.schools?.school_name || 'Unknown',
      }))

      setDeals(dealsWithNames)

      // Calculate summary
      const total = dealsWithNames.reduce((sum: number, d: Deal) => sum + d.deal_value, 0)
      const expected = dealsWithNames.reduce(
        (sum: number, d: Deal) => sum + d.deal_value * (d.probability / 100),
        0
      )
      const avgProb = dealsWithNames.length
        ? dealsWithNames.reduce((sum: number, d: Deal) => sum + d.probability, 0) /
          dealsWithNames.length
        : 0

      setSummary({
        totalPipeline: total,
        expectedRevenue: expected,
        avgProbability: avgProb,
      })
    } catch (error) {
      console.error('Error fetching deals:', error)
    } finally {
      setLoading(false)
    }
  }

  const dealsByStage = stages.map((stage) => ({
    stage,
    deals: deals.filter((d) => d.stage === stage),
    count: deals.filter((d) => d.stage === stage).length,
  }))

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">📈 Sales Pipeline</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Total Pipeline Value</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            R{(summary.totalPipeline / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Expected Revenue (Prob Weighted)</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            R{(summary.expectedRevenue / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Average Probability</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {summary.avgProbability.toFixed(0)}%
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading pipeline...</div>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {dealsByStage.map(({ stage, deals: stageDeal, count }) => (
            <div key={stage} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                {stage}
                <span className="ml-2 px-2 py-1 bg-gray-200 rounded text-sm">
                  {count}
                </span>
              </h3>
              <div className="space-y-3">
                {stageDeal.map((deal) => (
                  <div
                    key={deal.id}
                    className="bg-white rounded-lg p-3 border border-gray-200"
                  >
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {deal.school_name}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      R{(deal.deal_value / 1000).toFixed(0)}k
                    </p>
                    <p className="text-xs text-blue-600 font-semibold mt-2">
                      {deal.probability}% prob
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
