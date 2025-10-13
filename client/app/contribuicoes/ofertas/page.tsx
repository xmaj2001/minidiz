"use server";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ContributionServices } from "@/lib/services/contribution.service";
import ContentInset from "./_components/content-Inset";
import { ContributionType } from "@/lib/interfaces/contribution.interface";
import { Toaster } from "@/components/ui/toaster";


export default async function Page() {
    const apiResult = await ContributionServices.listPaginate(ContributionType.OFERTA)
  return (
    <SidebarProvider>
      <AppSidebar />
      <ContentInset data={apiResult.result} />
      <Toaster />
    </SidebarProvider>
  );
}
