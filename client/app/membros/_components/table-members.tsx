import { getMaritalStatusBadge } from "@/components/member/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { IMember } from "@/http/member/member.interface";
import { Mail, Phone,} from "lucide-react";

interface TableMemberProps {
  data: IMember[];
  onSelect: (data: IMember) => void;
}

export const TableMember = ({
  data,
  onSelect,
}: TableMemberProps) => {
  

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
              <TableHead>Estado Civil</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Paróquia</TableHead>
              <TableHead>Batismo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((membro) => (
              <TableRow key={membro.id} onClick={() => onSelect(membro)}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={`/abstract-geometric-shapes.png?height=32&width=32&query=${membro.name}`}
                      />
                      <AvatarFallback>{membro.name}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{membro.name}</div>
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium">
                          <span>
                            <b>Genero:</b> {membro.gender}
                          </span>
                          {" "}
                          <span>
                            <b>Idade:</b> {membro.age}
                          </span>
                        </p>
                        Membro desde{" "}
                        {new Date(membro.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {getMaritalStatusBadge(membro.maritalStatus ?? "")}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="h-3 w-3" />
                      {membro.email}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3" />
                      {membro.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{"Nomde da paróquia"}</Badge>
                </TableCell>

                {/* <TableCell>
                  <Badge variant="outline">{`Esta em (${membro.groups.length})`}</Badge>
                </TableCell> */}

                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      {membro.isBaptized ? (
                        <Badge variant="secondary">{`Batizado`}</Badge>
                      ) : (
                        <Badge variant="outline">{`Não batizado`}</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      {membro.isConfirmed? (
                        <Badge variant="default">{`Batismo confirmado`}</Badge>
                      ): (
                        <Badge variant="destructive">{`Batismo não confirmado`}</Badge>
                      )}
                    </div>
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
