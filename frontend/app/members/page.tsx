import { AppSidebar } from "@/components/app-sidebar"
import { MembersContent } from "@/components/contents/members-content"
import { SidebarInset } from "@/components/ui/sidebar"

export default function DashboardPage() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <MembersContent />
      </SidebarInset>
    </>
  )
}
