"use client";

import { Button } from "@/components/ui/button";
import {
  Bot,
  Building,
  FileText,
  Plus,
  Receipt,
  ShoppingCart,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { IExpense } from "@/lib/interfaces/expense.interface";
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
import { useQuery } from "@tanstack/react-query";
import { ExpenseServices } from "@/lib/services/expense.service";
import { AIChatAssistant } from "@/components/ai-chat-assistant";
import { API_STALE_TIME } from "@/config/settings";

export default function ContentInset() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDespesa, setEditingDespesa] = useState<IExpense | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const {
    data: despesas,
    isLoading,
    isError,
  } = useQuery<IExpense[]>({
    queryKey: [
      "expenses",
      {
        searchTerm,
        categoria: categoriaFilter,
        status: statusFilter,
      },
    ],
    queryFn: () => ExpenseServices.listPaginate().then((res) => res.result),
    staleTime: API_STALE_TIME.expenses.list,
  });

  const data = despesas || [];

  // 2. Cálculos de Estatísticas (Use useMemo para evitar recalcular a cada render)
  // Nota: Idealmente, as estatísticas viriam de um endpoint separado (expenseSummary)
  // com um useQuery próprio para melhor performance e cache. Mas mantemos aqui por simplicidade.
  const {
    totalDespesas,
    despesasPagas,
    despesasPendentes,
    despesasPorCategoria,
  } = useMemo(() => {
    // TODOS os cálculos agora são feitos sobre 'data' (que vem da API/Cache)
    const total = data.reduce((total, d) => total + d.valor, 0);

    const pagas = data
      .filter((d) => d.status === "Pago")
      .reduce((total, d) => total + d.valor, 0);

    const pendentes = data
      .filter((d) => d.status === "Pendente")
      .reduce((total, d) => total + d.valor, 0);

    const porCategoria = data.reduce((acc, despesa) => {
      acc[despesa.categoria] = (acc[despesa.categoria] || 0) + despesa.valor;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalDespesas: total,
      despesasPagas: pagas,
      despesasPendentes: pendentes,
      despesasPorCategoria: porCategoria,
    };
  }, [data]); // Recalcula SÓ quando a lista 'data' muda

  // Se 'isLoading' for true (primeiro carregamento), exibe um loading state

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Erro ao carregar despesas.
      </div>
    );
  }

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
        data={data}
        isLoading={isLoading}
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
      {/* Botão Flutuante do Assistente de IA */}
      <div className="fixed bottom-8 right-8  transition-transform flex flex-col gap-4 items-center">
        <Button
          className="rounded-full bg-purple-400/25 border-primary border-2 h-12 w-12 shadow-lg z-40 transition-transform hover:scale-105"
          onClick={() => setIsChatOpen(true)}
          aria-label="Abrir Assistente de IA"
        >
          <Bot className="h-6 w-6" />
        </Button>
        <Button title="Nova Despesa" className="rounded-full h-14 w-14" onClick={handleAddDespesa}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Componente Assistente de IA (Visível quando isChatOpen é true) */}
      {isChatOpen && <AIChatAssistant onClose={() => setIsChatOpen(false)} />}
    </div>
  );
}
