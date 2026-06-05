interface KPICardProps {
  title: string
  value: string | number
  icon: string
  trend?: number
  color?: 'blue' | 'green' | 'red' | 'yellow'
}

const colorClasses = {
  blue: 'bg-blue-50 border-blue-200',
  green: 'bg-green-50 border-green-200',
  red: 'bg-red-50 border-red-200',
  yellow: 'bg-yellow-50 border-yellow-200',
}

export default function KPICard({
  title,
  value,
  icon,
  trend,
  color = 'blue',
}: KPICardProps) {
  return (
    <div className={`${colorClasses[color]} border rounded-lg p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend !== undefined && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '📈' : '📉'} {Math.abs(trend)}%
            </p>
          )}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  )
}
