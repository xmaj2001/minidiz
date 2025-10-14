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

import { Building, Edit, FileText, Receipt, ShoppingCart, Trash2, Users, Wrench, Zap } from "lucide-react";
import { IExpense } from "@/lib/interfaces/expense.interface";

interface TableProps {
  data: IExpense[];
  onEdit: (data: IExpense) => void;
  onDelete: (id: number) => void;
}

export const TableData = ({
  data,
  onDelete,
  onEdit,
}: TableProps) => {
  const getStatusBadge = (status: string) => {
    return status === "Pago" ? (
      <Badge
        variant="default"
        className="bg-secondary text-secondary-foreground"
      >
        Pago
      </Badge>
    ) : (
      <Badge
        variant="secondary"
        className="bg-destructive text-destructive-foreground"
      >
        Pendente
      </Badge>
    );
  };

  const getCategoriaIcon = (categoria: string) => {
    const icons = {
      Utilidades: Zap,
      Manutenção: Wrench,
      Materiais: ShoppingCart,
      Equipamentos: Receipt,
      Transporte: Building,
      Pessoal: Users,
    };
    const Icon = icons[categoria as keyof typeof icons] || FileText;
    return <Icon className="h-4 w-4" />;
  };
  return (
     <Card>
        <CardHeader>
          <CardTitle>Lista de Despesas</CardTitle>
          <CardDescription>
            {data.length} despesa(s) encontrada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((despesa) => (
                <TableRow key={despesa.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{despesa.descricao}</div>
                      <div className="text-sm text-muted-foreground">
                        {despesa.observacao}
                      </div>
                      {/* {despesa.numeroNF && (
                        <div className="text-xs text-muted-foreground">
                          NF: {despesa.numeroNF}
                        </div>
                      )} */}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoriaIcon(despesa.categoria)}
                      <Badge variant="outline">{despesa.categoria}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-destructive">
                    {despesa.valor.toLocaleString("pt-AO", {
                      style: "currency",
                      currency: "AOA",
                    })}
                  </TableCell>
                  <TableCell>
                    {new Date(despesa.data).toLocaleDateString("pt-AO")}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{despesa.fornecedor}</div>
                      <div className="text-sm text-muted-foreground">
                        {despesa.forma_pagamento}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(despesa.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(despesa)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(despesa.id)}
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
