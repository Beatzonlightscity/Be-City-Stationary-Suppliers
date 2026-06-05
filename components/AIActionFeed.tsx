'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Activity {
  id: string
  school_id: string
  type: string
  notes: string
  created_at: string
}

export default function AIActionFeed() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) throw error
      setActivities(data || [])
    } catch (error) {
      console.error('Error fetching activities:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center text-gray-500">Loading...</div>

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">🤖 AI Action Feed</h3>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent activities</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 bg-gray-50 rounded border-l-4 border-blue-500"
            >
              <span className="text-xl">✅</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                <p className="text-xs text-gray-600 mt-1">{activity.notes}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(activity.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
