'use server';
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ExpenseServices } from "@/lib/services/expense.service";
import ContentInset from "./_components/content-Inset";

export default async function Page() {
  const apiResult = await ExpenseServices.listPaginate()
   return (
     <SidebarProvider>
       <AppSidebar />
       <ContentInset data={apiResult.result} />
       <Toaster />
     </SidebarProvider>
   );
}

