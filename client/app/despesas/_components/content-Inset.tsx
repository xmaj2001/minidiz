"use client";

import { Button } from "@/components/ui/button";
import {
  Building,
  FileText,
  Plus,
  Receipt,
  ShoppingCart,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { IExpense } from "@/lib/interfaces/expense.interface";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatsCards } from "./statsCards";
import { Filter } from "./filter";
import { TableData } from "./table";
import { DialogForm } from "./dialog-form";

interface ContentInsetProps {
  data: IExpense[];
}

export default function ContentInset({ data }: ContentInsetProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDespesa, setEditingDespesa] = useState<IExpense | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // Filtrar despesas
  const filteredDespesas = data.filter((despesa) => {
    const matchesSearch =
      despesa.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      despesa.fornecedor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      despesa.observacao?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria =
      categoriaFilter === "todos" ||
      despesa.categoria.toLowerCase() === categoriaFilter;
    const matchesStatus =
      statusFilter === "todos" || despesa.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesCategoria && matchesStatus;
  });

  // Calcular totais
  const totalDespesas = data.reduce(
    (total, despesa) => total + despesa.valor,
    0
  );
  const despesasPagas = data
    .filter((d) => d.status === "Pago")
    .reduce((total, despesa) => total + despesa.valor, 0);
  const despesasPendentes = data
    .filter((d) => d.status === "Pendente")
    .reduce((total, despesa) => total + despesa.valor, 0);

  // Agrupar por categoria
  const despesasPorCategoria = data.reduce((acc, despesa) => {
    acc[despesa.categoria] = (acc[despesa.categoria] || 0) + despesa.valor;
    return acc;
  }, {} as Record<string, number>);

  const handleAddDespesa = () => {
    setEditingDespesa(null);
    setIsDialogOpen(true);
  };

  const handleEditDespesa = (despesa: IExpense) => {
    setEditingDespesa(despesa);
    setIsDialogOpen(true);
  };

  const handleDeleteDespesa = (id: number) => {
    // Implementar lógica de exclusão aqui
    alert(`Excluir despesa com ID: ${id}`);
  };

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
    <div className="space-y-6 w-full p-4 md:p-8 lg:p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Gestão de Despesas
          </h1>
          <p className="text-muted-foreground">
            Controle completo das despesas da igreja
          </p>
        </div>
        <Button onClick={handleAddDespesa}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Despesa
        </Button>
      </div>

      {/* Cards de Resumo */}
      <StatsCards
        total={totalDespesas}
        pagas={{
          amount: despesasPagas,
          count: data.filter((d) => d.status === "Pago").length,
        }}
        pendentes={{
          amount: despesasPendentes,
          count: data.filter((d) => d.status === "Pendente").length,
        }}
        despesasPorCategoria={despesasPorCategoria}
        length={data.length}
      />

      {/* Despesas por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Despesas por Categoria</CardTitle>
          <CardDescription>
            Distribuição dos gastos por categoria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(despesasPorCategoria).map(([categoria, valor]) => (
              <div
                key={categoria}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  {getCategoriaIcon(categoria)}
                  <span className="font-medium">{categoria}</span>
                </div>
                <span className="font-semibold text-destructive">
                  {valor.toLocaleString("pt-AO", {
                    style: "currency",
                    currency: "AOA",
                  })}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <Filter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoriaFilter={categoriaFilter}
        setCategoriaFilter={setCategoriaFilter}
      />

      {/* Tabela de Despesas */}
      <TableData
        data={filteredDespesas}
        onEdit={handleEditDespesa}
        onDelete={handleDeleteDespesa}
      />

      {/* Dialog para Adicionar/Editar Despesa */}
      <DialogForm
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        editingDespesa={editingDespesa}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      
    </div>
  );
}
