"use client";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { IMember } from "@/http/member/member.interface";
import DrawerViewMember from "@/components/member/DrawerViewMember";
import { FilterMember } from "@/components/member/filter";
import { CardMember } from "@/components/member/CardMember";
import { DrawerFormRegisterMember } from "@/components/member/DrawerForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ServiceMember from "@/http/member/member.service";
import { TableMember } from "@/components/member/table-members";
import { useQuery } from "@tanstack/react-query";
import { API_STALE_TIME } from "@/http/confg.http";

export default function ContentInset() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [selectMember, setSelectMember] = useState<IMember | null>(null);
  const [viewMode, setViewMode] = useState<"Table" | "Card">("Table");

  const {
    data: membersData,
    isLoading,
    isError,
  } = useQuery<IMember[]>({
    queryKey: ["members"],
    queryFn: () =>
      ServiceMember.findAll().then((res) => res.result),
    staleTime: API_STALE_TIME.members.list,
  });

  const onSelect = (data: IMember) => {
    setSelectMember(data);
    setIsDialogOpen(!isDialogOpen);
  };

  const selectViewMode = () => {
    setViewMode(viewMode == "Table" ? "Card" : "Table");
  };

  const members = membersData || [];
  return (
    <SidebarInset>
      <Drawer
        direction="right"
        open={isDialogOpen}
        onClose={() => {
          setSelectMember(null);
          setOpenRegister(false);
        }}
        onOpenChange={setIsDialogOpen}
      >
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full gap-2 px-4">
            <SidebarTrigger className="-ml-1 -mt-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            {/* <DashboardHeader /> */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Membros</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage></BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
          <FilterMember viewMode={viewMode} onSelectViewMode={selectViewMode} />
          {viewMode == "Table" ? (
            <TableMember data={members} onSelect={onSelect} />
          ) : (
            <div className="grid auto-rows-min gap-4 md:grid-cols-6">
              {members.map((it, index) => {
                return <CardMember key={index} data={it} onSelect={onSelect} />;
              })}
            </div>
          )}
        </div>
        {selectMember && <DrawerViewMember data={selectMember} />}
        {openRegister && (
          <DrawerFormRegisterMember
            onCreate={(m) => {
              
              setOpenRegister(false);
            }}
          />
        )}
        <Button
          className="fixed bottom-8 right-8 rounded-full h-12 w-12 p-0"
          onClick={() => {
            setOpenRegister(true);
            setIsDialogOpen(true);
          }}
        >
          {/* {isCreating ? <Loader className="animate-spin" /> : <Plus />} */}
          <Plus />
        </Button>
      </Drawer>
    </SidebarInset>
  );
}

// export default function ContentInset() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("todos");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isCreating, setIsCreating] = useState(false);

//   const {
//     data: membros,
//     isLoading,
//     isError,
//   } = useQuery<IMember[]>({
//     queryKey: [
//       "members",
//       {
//         searchTerm,
//         status: statusFilter,
//       },
//     ],
//     queryFn: () => ServiceMember.findAll().then((res) => res.result),
//     staleTime: API_STALE_TIME.members.list,
//   });

//    const data = membros || [];
//   // Filtrar membros
//   const filteredMembros = data.filter((membro) => {
//     const matchesSearch =
//       membro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       membro.email?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       statusFilter === "todos" || membro.maritalStatus?.toLowerCase() === statusFilter;
//     // const matchesGrupo = grupoFilter === "todos" || membro.grupo.toLowerCase() === grupoFilter.toLowerCase()
//     return matchesSearch && matchesStatus;
//     // && matchesGrupo
//   });

//   const handleEditMembro = (membro: IMember) => {
//     // setEditingMembro(membro);
//     setIsDialogOpen(true);
//   };

//   const handleDeleteMembro = (id: number) => {};
//   return (
//     <SidebarInset>
//       <Drawer
//         direction="right"
//         open={isDialogOpen}
//         onOpenChange={setIsDialogOpen}
//       >
//         <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
//           <div className="flex w-full gap-2 px-4">
//             {/* <SidebarTrigger className="-ml-1" />
//             <Separator
//               orientation="vertical"
//               className="mr-2 data-[orientation=vertical]:h-4"
//             /> */}
//             <DashboardHeader />
//             {/* <Breadcrumb>
//               <BreadcrumbList>
//                 <BreadcrumbItem className="hidden md:block">
//                   <BreadcrumbLink href="#">
//                     Building Your Application
//                   </BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator className="hidden md:block" />
//                 <BreadcrumbItem>
//                   <BreadcrumbPage>Data Fetching</BreadcrumbPage>
//                 </BreadcrumbItem>
//               </BreadcrumbList>
//             </Breadcrumb> */}
//           </div>
//         </header>
//         <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
//           <HeaderMember />
//           {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//             <div className="bg-muted/50 aspect-video rounded-xl" />
//             <div className="bg-muted/50 aspect-video rounded-xl" />
//             <div className="bg-muted/50 aspect-video rounded-xl" />
//           </div> */}
//           {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
//           <FilterMember
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             statusFilter={searchTerm}
//             setStatusFilter={setStatusFilter}
//           />
//           <TableMember
//             data={filteredMembros}
//             onEditMembro={handleEditMembro}
//             oneDeleteMembro={handleDeleteMembro}
//           />
//         </div>
//         <Button
//           disabled={isCreating}
//           className="fixed bottom-8 right-8 rounded-full h-12 w-12 p-0"
//           onClick={() => setIsDialogOpen(true)}
//         >
//           {isCreating ? <Loader className="animate-spin" /> : <Plus />}
//         </Button>
//         <DrawerContent>
//           <MemberRegistrationForm onCreating={setIsCreating} />
//         </DrawerContent>
//       </Drawer>
//     </SidebarInset>
//   );
// }
