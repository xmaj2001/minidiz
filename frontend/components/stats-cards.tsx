"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, TrendingUp, Calendar, LucideProps, LucideIcon } from "lucide-react"
import { DashboardStates } from "@/hooks/use-dashboard"
import { formatMony, getDay } from "@/lib/utils"

interface Propstates {
  states: DashboardStates
}

interface states {
  title: string,
  value: string,
  change: string,
  changeType: "positive" | "negative",
  icon: LucideIcon,
}

const percentageIsPositive = (value: number) => {
  return (value < 0 ? 'negative' : 'positive')
}

const getPercentageIsPositive = (value: number) => {
  return (value < 0 ? `${value}%` : `+${value}%`)
}

const loadingStats = (states: DashboardStates) => {
  const stats: states[] = []
  const date = new Date(Date.now())
  stats.push(
    {
      title: "Total do Mês",
      value: formatMony(states.payments.totalThisMonth),
      change: getPercentageIsPositive(states.payments.percentageChange),
      changeType: percentageIsPositive(states.payments.percentageChange),
      icon: DollarSign,
    }
  )

  stats.push(
    {
      title: "Membros Ativos",
      value: states.members.total.toString(),
      change: getPercentageIsPositive(states.members.percentageChange),
      changeType: percentageIsPositive(states.members.percentageChange),
      icon: Users,
    }
  )

  stats.push(
    {
      title: `Este ${getDay(date)}`,
      value: formatMony(states.todayPayments.total),
      change: '',
      changeType: 'positive',
      icon: Calendar,
    }
  )

  return (stats)
}

export function StatsCards({ states }: Propstates) {
  const stats = loadingStats(states)
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {
                index != 2 && <p
                  className={`text-xs ${stat.changeType === "positive"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                    }`}
                >
                  {stat.change} em relação ao mês anterior
                </p>
              }
            </CardContent>
          </Card>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 * 0.1 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos e Campanhas Ativas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className={`text-xs text-green-600`}>
              neste mês
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
