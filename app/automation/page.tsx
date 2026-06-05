'use client'

import { useState } from 'react'
import { runAIEngine } from '@/lib/ai/engine'

export default function AutomationPage() {
  const [running, setRunning] = useState(false)
  const [output, setOutput] = useState<string[]>([])

  const handleRunAI = async () => {
    setRunning(true)
    setOutput(['Starting AI Engine...'])

    try {
      // Run AI engine
      await runAIEngine()
      setOutput((prev) => [...prev, 'AI Engine completed successfully!'])
    } catch (error) {
      setOutput((prev) => [
        ...prev,
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      ])
    } finally {
      setRunning(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">🤖 AI Automation Control Panel</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">AI Engine Controls</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Run AI Scoring Engine</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Score all schools and determine next best actions
                  </p>
                </div>
                <button
                  onClick={handleRunAI}
                  disabled={running}
                  className={`px-6 py-2 rounded-lg font-semibold transition ${
                    running
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {running ? 'Running...' : 'Run Now'}
                </button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900 mb-3">Scheduled Automation</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Daily AI Run (6:00 AM)</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      ACTIVE
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Weekly Follow-up Check (Monday 8:00 AM)</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      ACTIVE
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Monthly Pipeline Review (1st Day 10:00 AM)</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      ACTIVE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">System Health</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">AI Engine</span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Cron Scheduler</span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API Integration</span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            </div>
          </div>
        </div>
      </div>

      {output.length > 0 && (
        <div className="bg-black text-green-400 rounded-lg p-6 font-mono text-sm">
          <p className="mb-4 font-bold">Console Output:</p>
          {output.map((line, i) => (
            <p key={i} className="mb-1">
              &gt; {line}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
