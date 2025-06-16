"use client"

import { motion } from "framer-motion"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { StatsCards } from "@/components/stats-cards"
import { RecentTithes } from "@/components/recent-tithes"
import { MonthlyChart } from "@/components/monthly-chart"
import { MembersList } from "@/components/members-list"
import { QuickActions } from "@/components/quick-actions"
import { useDashboard } from "@/hooks/use-dashboard"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function DashboardContent() {
  const { states, loading } = useDashboard()
  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <p>Carregando...</p>
      </div>
    )
  } else if (!states) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <p>O estatus esta null</p>
      </div>
    )
  }
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>
      </header>

      <motion.div className="flex-1 space-y-4" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <StatsCards states={states}/>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <motion.div variants={itemVariants} className="col-span-4">
            <MonthlyChart monthlyData={states.monthlyRevenue} />
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-3">
            <QuickActions />
          </motion.div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <motion.div variants={itemVariants} className="col-span-4">
            <RecentTithes />
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-3">
            <MembersList contributors={states.topContributors}/>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
