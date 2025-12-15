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

interface DialogFormProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (v: boolean) => void;
}

export function DialogFormRegisterGroup({
  isDialogOpen,
  setIsDialogOpen,
}: DialogFormProps) {
  const [editingGrupo, setEditingGrupo] = useState<IGroup | null>(null);

  return (
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
            <Input id="lider" placeholder="Nome do líder" defaultValue={""} />
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
            <Input id="proximaReuniao" type="date" defaultValue={""} />
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
  );
}
