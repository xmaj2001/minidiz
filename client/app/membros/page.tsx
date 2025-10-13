"use server"
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MemberServices } from "@/lib/services/member.service";
import ContentInset from "./_components/content-inset";

export default async function Page() {
  const apiResult = await MemberServices.listPaginate();
  return (
    <SidebarProvider>
      <AppSidebar />
     <ContentInset data={apiResult.result}/>
    </SidebarProvider>
  );
}
