"use client";

import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { IMember } from "@/http/member/member.interface";
import {
  Church,
  Edit,
  Mail,
  Move,
  MoveDiagonal,
  MoveUpRight,
  Phone,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";
import { getMaritalStatusBadge } from "./utils";
import { Badge } from "../ui/badge";

interface DrawerViewMemberProps {
  data: IMember;
}

export default function DrawerViewMember({ data }: DrawerViewMemberProps) {
  const handleAddMembro = () => {
   /* setEditingMembro(null);
    setIsDialogOpen(true);*/
  };

  const handleEditMembro = (membro: IMember) => {
    /*setEditingMembro(membro);
    setIsDialogOpen(true);*/
  };

  const handleDeleteMembro = (id: string) => {
    /*setMembros(membros.filter((m) => m.id !== id));*/
  };
  return (
    <DrawerContent className="px-4">
      <DrawerHeader>
        <DrawerTitle>{data.name}</DrawerTitle>
        <DrawerDescription>Informacões</DrawerDescription>
      </DrawerHeader>
      <div className="px-4">
        <div className="font-medium mt-2">{"Dados"}</div>
        <div className="text-sm text-muted-foreground">
          <p className="font-medium">
            <b>Genero:</b> {data.gender}
          </p>
          <p className="font-medium">
            <b>Idade:</b> {data.age}
          </p>
          <p>
            <b>Estado Civil:</b>
            {getMaritalStatusBadge(data.maritalStatus ?? "")}
          </p>
        </div>

        <div className="font-medium mt-2">{"Contactos"}</div>
        <div className="text-sm text-muted-foreground px-2">
          <p className="font-medium flex gap-2 items-center">
            <div className="flex items-center gap-1">
              <Mail size={16} />
              <b>Email:</b>
            </div>
            {data.email}
          </p>
          <p className="font-medium flex gap-2 items-center">
            <div className="flex items-center gap-1">
              <Phone size={16} />
              <b>Telefone:</b>
            </div>
            {data.phone}
          </p>
        </div>

        <div className="font-medium mt-2">{"Paróquia"}</div>
        <div className="text-sm text-muted-foreground px-2">
          <p className="font-medium flex gap-2 items-center">
            <div className="flex items-center gap-1">
              <Church size={16} />
              <b>{data.parish.name}</b>
            </div>
          </p>
            Registrada desde {new Date(data.parish.createdAt).toLocaleDateString("pt-BR")}
        </div>

        <div className="font-medium mt-2">{"Batismo"}</div>
        <div className="text-sm text-muted-foreground px-2">
          <div className="flex items-center gap-1 text-sm">
            {data.isBaptized ? (
              <Badge variant="secondary">{`Batizado`}</Badge>
            ) : (
              <Badge variant="outline">{`Não batizado`}</Badge>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm">
            {data.isConfirmed ? (
              <Badge variant="default">{`Batismo confirmado`}</Badge>
            ) : (
              <Badge variant="destructive">{`Batismo não confirmado`}</Badge>
            )}
          </div>
        </div>

        <div className="flex gap-2 absolute bottom-2 w-full">
          <Button
            variant="default"
            color="primary"
            size="sm"
            onClick={() => handleEditMembro(data)}
          >
            <Edit className="h-3 w-3" /> Editar
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleEditMembro(data)}
          >
            <Move className="h-3 w-3" /> Migrar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDeleteMembro(data.id)}
          >
            <Trash2 className="h-3 w-3" /> Apagar
          </Button>
        </div>
      </div>
    </DrawerContent>
  );
}
