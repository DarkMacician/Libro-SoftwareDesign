import type { ReactNode } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"

interface AdminStatsCardProps {
  title: string
  value: string
  icon: ReactNode
  trend: string
  trendUp: boolean
}

export default function AdminStatsCard({ title, value, icon, trend, trendUp }: AdminStatsCardProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="bg-[#252525] p-2 rounded-md text-yellow-500">{icon}</div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`flex items-center text-sm ${trendUp ? "text-green-500" : "text-red-500"}`}>
          {trendUp ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          {trend}
        </span>
        <span className="text-gray-400 text-sm ml-2">vs last month</span>
      </div>
    </div>
  )
}
