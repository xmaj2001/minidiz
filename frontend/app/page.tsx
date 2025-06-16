import { AppSidebar } from "@/components/app-sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { SidebarInset } from "@/components/ui/sidebar"

export default function DashboardPage() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <DashboardContent />
      </SidebarInset>
    </>
  )
}
