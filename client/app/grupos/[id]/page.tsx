"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Users,
  UserCheck,
  Calendar,
  Edit,
  Trash2,
  Search,
  Store,
  User,
  Church,
  CardSimIcon,
} from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { gruposData } from "@/http/group/group.service";
import { IGroup } from "@/http/group/group.interface";
import { IMember } from "@/http/member/member.interface";
import { useQuery } from "@tanstack/react-query";
import { API_STALE_TIME } from "@/http/confg.http";
import { FilterMember } from "@/components/member/filter";
import { TableMember } from "@/components/member/table-members";
import { CardMember } from "@/components/member/CardMember";
import ServiceMember from "@/http/member/member.service";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
// Dados mockados dos grupos

export default function GruposPage() {
  const [grupos, setGrupos] = useState<IGroup[]>(gruposData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGrupo, setEditingGrupo] = useState<IGroup | null>(null);
  const [selectMember, setSelectMember] = useState<IMember | null>(null);
  const [viewMode, setViewMode] = useState<"Table" | "Card">("Table");

  const {
    data: membersData,
    isLoading,
    isError,
  } = useQuery<IMember[]>({
    queryKey: ["members"],
    queryFn: () => ServiceMember.findAll().then((res) => res.result),
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
  // Filtrar grupos
  const filteredGrupos = grupos.filter((grupo) =>
    grupo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddGrupo = () => {
    setEditingGrupo(null);
    setIsDialogOpen(true);
  };

  const handleEditGrupo = (grupo: IGroup) => {
    setEditingGrupo(grupo);
    setIsDialogOpen(true);
  };

  const handleDeleteGrupo = (id: string) => {};

  const totalMembros = grupos.reduce((total, grupo) => total + 1, 0);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="space-y-6 w-full p-4 md:p-8 lg:p-4">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full gap-2">
            <SidebarTrigger className="-ml-1 -mt-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            {/* <DashboardHeader /> */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Gropus</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>X</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <Button onClick={handleAddGrupo}>
            <Plus className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </header>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="showdon-none bg-transprent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Group</CardTitle>
              <Users className="h-4 w-4 text-primary" />
              {/* <CardDescription>xxxxxxxxxxxxxxxxxxxxxx</CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Lider: </span>
                  <span>EU</span>
                </div>{" "}
                <div className="flex items-center gap-2 text-sm">
                  <Church className="h-4 w-4 text-muted-foreground" />
                  <span>Paroquia: </span>
                  <span>WS</span>
                </div>{" "}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Criada: </span>
                </div>{" "}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Registrado: </span>
                </div>{" "}
                <div className="flex items-center gap-2 text-sm">
                  <CardSimIcon className="h-4 w-4 text-muted-foreground" />
                  <span>Descrição: </span>
                <p className="text-sm text-muted-foreground">
                  {"axaxaxaxaxxaaxaxax"}
                </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-3 w-3 mr-1" />
                  Editar
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Membros
              </CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMembros}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fundos</CardTitle>
              <Store className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(totalMembros / grupos.length)}
              </div>
            </CardContent>
          </Card>
        </div>

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
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
