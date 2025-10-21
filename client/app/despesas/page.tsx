"use client";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ContentInset from "./_components/content-Inset";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <ContentInset/>
      <Toaster />
    </SidebarProvider>
  );
}
