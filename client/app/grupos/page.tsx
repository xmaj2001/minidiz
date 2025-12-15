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
} from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { gruposData } from "@/http/group/group.service";
import { IGroup } from "@/http/group/group.interface";

// Dados mockados dos grupos
type Grupo = {
  id: number;
  nome: string;
  descricao: string;
  lider: string;
  membros: number;
  ativo: boolean;
  dataCreacao: string;
  proximaReuniao: string;
  observacoes: string;
};


export default function GruposPage() {
  const [grupos, setGrupos] = useState<IGroup[]>(gruposData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGrupo, setEditingGrupo] = useState<IGroup | null>(null);

  // Filtrar grupos
  const filteredGrupos = grupos.filter(
    (grupo) =>
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

  const handleDeleteGrupo = (id: string) => {
  };

  const totalMembros = grupos.reduce(
    (total, grupo) => total + 1,
    0
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="space-y-6 w-full p-4 md:p-8 lg:p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Gestão de Grupos
            </h1>
            <p className="text-muted-foreground">
              Organize e gerencie os grupos da igreja
            </p>
          </div>
          <Button onClick={handleAddGrupo}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Grupo
          </Button>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Grupos
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{grupos.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Grupos Ativos
              </CardTitle>
              <UserCheck className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {/* {grupos.filter((g) => g.ativo).length} */}
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
              <CardTitle className="text-sm font-medium">
                Média por Grupo
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(totalMembros / grupos.length)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Busca */}
        <Card>
          <CardHeader>
            <CardTitle>Buscar Grupos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Lista de Grupos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGrupos.map((grupo) => (
            <Card key={grupo.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{grupo.name}</CardTitle>
                  <Badge variant={"secondary"}>
                    Ativo
                  </Badge>
                </div>
                <CardDescription>xxxxxxxxxxxxxxxxxxxxxx</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`/abstract-geometric-shapes.png?height=32&width=32&query=${"ww"}`}
                    />
                    <AvatarFallback>
                      
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Líder: {"eu"}</p>
                    <p className="text-xs text-muted-foreground">
                      {0} membros
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Próxima reunião:{" "}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {"axaxaxaxaxxaaxaxax"}
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditGrupo(grupo)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteGrupo(grupo.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog para Adicionar/Editar Grupo */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingGrupo ? "Editar Grupo" : "Novo Grupo"}
              </DialogTitle>
              <DialogDescription>
                {editingGrupo
                  ? "Edite as informações do grupo"
                  : "Crie um novo grupo na igreja"}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Grupo</Label>
                <Input
                  id="nome"
                  placeholder="Digite o nome do grupo"
                  defaultValue={""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lider">Líder</Label>
                <Input
                  id="lider"
                  placeholder="Nome do líder"
                  defaultValue={""}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva o propósito e atividades do grupo"
                  defaultValue={""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proximaReuniao">Próxima Reunião</Label>
                <Input
                  id="proximaReuniao"
                  type="date"
                  defaultValue={""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="membros">Número de Membros</Label>
                <Input
                  id="membros"
                  type="number"
                  placeholder="0"
                  defaultValue={""}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Horários de reunião, local, informações adicionais"
                  defaultValue={""}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                {editingGrupo ? "Salvar Alterações" : "Criar Grupo"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
