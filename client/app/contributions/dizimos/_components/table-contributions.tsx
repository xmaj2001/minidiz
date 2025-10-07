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
import { Edit, Heart, Trash2, UserCheck, UserX } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

interface TableContributionProps {
  data: IListaContributions;
  onEdit: (data: IContribution) => void;
  oneDelete: (id: number) => void;
}

export const TableContribution = ({
  data,
  oneDelete,
  onEdit,
}: TableContributionProps) => {
  const getStatusBadge = (status: string) => {
    return status === ContributionStatus.RECEBIDO ? (
      <Badge
        variant="default"
        className="bg-secondary text-secondary-foreground"
      >
        Confirmado
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-muted text-muted-foreground">
        Pendente
      </Badge>
    );
  };
  const formtValorInNumber = (v?: string | null | undefined) => {
    return Number.parseInt(v ?? "0");
  };
  return (
    <Card className="border-2 border-primary dark:border-none">
      <CardHeader>
        <CardTitle>Registro de Dízimos</CardTitle>
        <CardDescription>{data.length} dízimo(s) encontrado(s)</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Membro</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Referência</TableHead>
              <TableHead>Pagamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((dizimo) => (
              <TableRow key={dizimo.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-secondary" />
                    <span className="font-medium">{`${dizimo.member.nome} ${dizimo.member.sobreNome}`}</span>
                  </div>
                </TableCell>
                <TableCell className="font-semibold">
                  {formtValorInNumber(dizimo.valor).toLocaleString("pt-AO", {
                    style: "currency",
                    currency: "AOA",
                  })}
                </TableCell>
                <TableCell>
                  {new Date(dizimo.data).toLocaleDateString("pt-AO")}
                </TableCell>
                <TableCell>
                  <Badge variant="default" color="primary">
                    {format(dizimo.data, "PPP", { locale: pt }).toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{dizimo.metodo}</TableCell>
                <TableCell>{getStatusBadge(dizimo.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button onClick={() => onEdit(dizimo)} variant="outline" size="sm">
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
