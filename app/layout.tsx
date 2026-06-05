import type { Metadata } from 'next'
import Sidebar from '@/components/Sidebar'
import './globals.css'

export const metadata: Metadata = {
  title: 'BE City Procurement OS',
  description: 'Autonomous AI Procurement System for School Supply Management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="flex">
          <Sidebar />
          <main className="ml-64 flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  )
}
