'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface School {
  id: string
  school_name: string
  principal?: string
  procurement_contact?: string
  phone?: string
  email?: string
  est_annual_spend?: number
  lead_status?: string
  ai_priority_score?: number
  next_best_action?: string
}

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'ALL' | 'HOT' | 'WARM' | 'COLD'>('ALL')

  useEffect(() => {
    fetchSchools()
  }, [filter])

  const fetchSchools = async () => {
    try {
      let query = supabase.from('schools').select('*')

      if (filter !== 'ALL') {
        query = query.eq('next_best_action', filter)
      }

      const { data, error } = await query.order('ai_priority_score', {
        ascending: false,
      })

      if (error) throw error
      setSchools(data || [])
    } catch (error) {
      console.error('Error fetching schools:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (action?: string) => {
    switch (action) {
      case 'HOT':
        return 'bg-red-100 text-red-800'
      case 'WARM':
        return 'bg-yellow-100 text-yellow-800'
      case 'COLD':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">🏫 Schools Database</h1>

      <div className="mb-6 flex gap-4">
        {(['ALL', 'HOT', 'WARM', 'COLD'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {f === 'ALL' ? 'All Schools' : `${f} Leads`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">Loading schools...</div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  School Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Annual Spend
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {schools.map((school) => (
                <tr key={school.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {school.school_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div>{school.procurement_contact}</div>
                    <div className="text-xs text-gray-400">{school.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    R{school.est_annual_spend?.toLocaleString() || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min(100, (school.ai_priority_score || 0) / 2)}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-semibold">
                        {school.ai_priority_score}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        getStatusColor(school.next_best_action)
                      }`}
                    >
                      {school.next_best_action || 'UNSCORED'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {schools.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No schools found for this filter
            </div>
          )}
        </div>
      )}
    </div>
  )
}
