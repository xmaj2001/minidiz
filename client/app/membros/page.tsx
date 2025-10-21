import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ContentInset from "./_components/content-inset";

export default async function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <ContentInset />
    </SidebarProvider>
  );
}
