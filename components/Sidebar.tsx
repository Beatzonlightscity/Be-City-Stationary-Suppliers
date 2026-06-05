'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Schools', href: '/schools', icon: '🏫' },
  { label: 'Pipeline', href: '/pipeline', icon: '📈' },
  { label: 'Automation', href: '/automation', icon: '🤖' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">BE City</h1>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
