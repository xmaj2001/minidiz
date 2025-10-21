
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMember, StatusMember } from "@/lib/interfaces/member.interface";
import { Edit, Mail, Phone, Trash2, UserCheck, UserX } from "lucide-react";

interface TableMemberProps {
  data: IMember[];
  onEditMembro: (data: IMember) => void;
  oneDeleteMembro: (id: number) => void;
}

export const TableMember = ({
  data,
  oneDeleteMembro,
  onEditMembro,
}: TableMemberProps) => {

  const getStatusBadge = (status: StatusMember) => {
    return status == 'ATIVO' ? (
      <Badge
        variant="secondary"
        className="bg-primary text-white"
      >
        <UserCheck className="h-3 w-3 mr-1" />
        Ativo
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-muted text-muted-foreground">
        <UserX className="h-3 w-3 mr-1" />
        Inativo
      </Badge>
    );
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Lista de Membros</CardTitle>
        <CardDescription>{data.length} membro(s) encontrado(s)</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Membro</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Genero</TableHead>
              <TableHead>Grupo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((membro) => (
              <TableRow key={membro.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={`/abstract-geometric-shapes.png?height=32&width=32&query=${membro.nome}`}
                      />
                      <AvatarFallback>
                        {membro.nome + " " + membro.sobreNome}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{membro.nome}</div>
                      <div className="text-sm text-muted-foreground">
                        Membro desde{" "}
                        {new Date(membro.data_cadastro).toLocaleDateString(
                          "pt-BR"
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="h-3 w-3" />
                      {membro.email}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3" />
                      {membro.telefone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{membro.genero}</TableCell>
                <TableCell>
                  <Badge variant="outline">{`Esta em (${membro.grupos_membro.length})`}</Badge>
                </TableCell>
                <TableCell>{getStatusBadge(membro.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditMembro(membro)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => oneDeleteMembro(membro.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
