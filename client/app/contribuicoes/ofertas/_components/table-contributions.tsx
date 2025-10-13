"use client";
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
import {
  ContributionStatus,
  IContribution,
  IListaContributions,
} from "@/lib/interfaces/contribution.interface";
import { Edit, Eye, Gift, ImageIcon, Trash2 } from "lucide-react";

interface TableContributionProps {
  data: IListaContributions;
  onEdit: (data: IContribution) => void;
  oneDelete: (id: number) => void;
}

export const TableContribution = ({
  data,
  // oneDelete,
  // onEdit,
}: TableContributionProps) => {
  const getStatusBadge = (status: string) => {
    return status === ContributionStatus.RECEBIDO ? (
      <Badge variant="default" className="bg-primary text-primary-foreground">
        CONFIRMADO
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-secondary text-muted-foreground">
        PENDENTE
      </Badge>
    );
  };

  const getFinalidadeBadge = (finalidade: string) => {
    const colors = {
      Missões: "bg-primary text-primary-foreground",
      Construção: "bg-accent text-accent-foreground",
      Equipamentos: "bg-secondary text-secondary-foreground",
      "Ação Social": "bg-muted text-muted-foreground",
      Outros: "bg-destructive text-destructive-foreground",
      Nenhuma: "bg-muted text-muted-foreground",
    };
    return (
      <Badge
        className={
          colors[finalidade as keyof typeof colors] ||
          "bg-muted text-muted-foreground"
        }
      >
        {finalidade}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro de Ofertas</CardTitle>
        <CardDescription>{data.length} oferta(s) encontrada(s)</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Membro</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Finalidade</TableHead>
              <TableHead>Pagamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((oferta) => (
              <TableRow key={oferta.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium">{`${oferta.member.nome} ${oferta.member.sobreNome}`}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        {oferta.observacao}
                        {oferta.imagens && oferta.imagens.length > 0 && (
                          <ImageIcon className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-semibold">
                  {Number(oferta.valor).toLocaleString("pt-AO", {
                    style: "currency",
                    currency: "AOA",
                  })}
                </TableCell>
                <TableCell>
                  {new Date(oferta.data).toLocaleDateString("pt-AO")}
                </TableCell>
                <TableCell>
                  {getFinalidadeBadge(oferta.finalidade ?? "Nenhuma")}
                </TableCell>
                <TableCell>{oferta.metodo}</TableCell>
                <TableCell>{getStatusBadge(oferta.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {oferta.imagens && (
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
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
