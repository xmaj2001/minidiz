"use client";
import { SidebarInset } from "@/components/ui/sidebar";
import { TableMember } from "./table-members";
import { DashboardHeader } from "@/components/DashboardHeader";
import { IMember } from "@/lib/interfaces/member.interface";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import MemberRegistrationForm from "./registration-form";
import { HeaderMember } from "./header";
import { FilterMember } from "./filter";
import { useState } from "react";
import { Loader, Plus } from "lucide-react";

interface ContentInsetProps {
  data: IMember[];
}

export default function ContentInset({ data }: ContentInsetProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [grupoFilter, setGrupoFilter] = useState("todos");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingMembro, setEditingMembro] = useState<IMember | null>(null);

  // Filtrar membros
  const filteredMembros = data.filter((membro) => {
    const matchesSearch =
      membro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membro.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "todos" || membro.status.toLowerCase() === statusFilter;
    // const matchesGrupo = grupoFilter === "todos" || membro.grupo.toLowerCase() === grupoFilter.toLowerCase()

    return matchesSearch && matchesStatus;
    // && matchesGrupo
  });

  const handleEditMembro = (membro: IMember) => {
    setEditingMembro(membro);
    setIsDialogOpen(true);
  };

  const handleDeleteMembro = (id: number) => {};
  return (
    <SidebarInset>
      <Drawer direction="right" open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full gap-2 px-4">
            {/* <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            /> */}
            <DashboardHeader />
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
          <HeaderMember />
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div> */}
          {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
          <FilterMember
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={searchTerm}
            setStatusFilter={setStatusFilter}
          />
          <TableMember
            data={filteredMembros}
            onEditMembro={handleEditMembro}
            oneDeleteMembro={handleDeleteMembro}
          />
        </div>
        <Button disabled={isCreating} className="absolute bottom-8 right-8 rounded-full" onClick={()=> setIsDialogOpen(true)}>
          {isCreating ? <Loader className="animate-spin" /> : <Plus />}
        </Button>
        <DrawerContent>
          <MemberRegistrationForm onCreating={setIsCreating} />
        </DrawerContent>
      </Drawer>
    </SidebarInset>
  );
}
