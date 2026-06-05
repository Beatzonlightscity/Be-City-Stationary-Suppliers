'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    hotThreshold: 80,
    warmThreshold: 50,
    followUpDaysHot: 2,
    followUpDaysWarm: 7,
    followUpDaysCold: 14,
  })

  const handleSave = () => {
    console.log('Settings saved:', settings)
    alert('Settings updated successfully!')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">⚙️ System Settings</h1>

      <div className="max-w-2xl">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-6">AI Scoring Configuration</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                HOT Lead Threshold (Score)
              </label>
              <input
                type="number"
                value={settings.hotThreshold}
                onChange={(e) =>
                  setSettings({ ...settings, hotThreshold: Number(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Default: 80</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                WARM Lead Threshold (Score)
              </label>
              <input
                type="number"
                value={settings.warmThreshold}
                onChange={(e) =>
                  setSettings({ ...settings, warmThreshold: Number(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Default: 50</p>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Follow-Up Intervals</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    HOT Leads Follow-Up (Days)
                  </label>
                  <input
                    type="number"
                    value={settings.followUpDaysHot}
                    onChange={(e) =>
                      setSettings({ ...settings, followUpDaysHot: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    WARM Leads Follow-Up (Days)
                  </label>
                  <input
                    type="number"
                    value={settings.followUpDaysWarm}
                    onChange={(e) =>
                      setSettings({ ...settings, followUpDaysWarm: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    COLD Leads Follow-Up (Days)
                  </label>
                  <input
                    type="number"
                    value={settings.followUpDaysCold}
                    onChange={(e) =>
                      setSettings({ ...settings, followUpDaysCold: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Save Settings
            </button>
            <button className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300">
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
