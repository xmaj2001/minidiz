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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Download,
  FileText,
  BarChart3,
  PieChart,
  TrendingUp,
  CalendarIcon,
  DollarSign,
  Users,
  Heart,
  Gift,
  PiggyBank,
  Receipt,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function RelatoriosPage() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [tipoRelatorio, setTipoRelatorio] = useState("financeiro");
  const [periodo, setPeriodo] = useState("mensal");

  // Dados mockados para relatórios
  const dadosFinanceiros = {
    totalEntradas: 45231.89,
    totalSaidas: 6570.0,
    saldoLiquido: 38661.89,
    dizimos: 28450.0,
    ofertas: 8950.0,
    doacoes: 7831.89,
    despesasOperacionais: 4320.0,
    despesasManutencao: 2250.0,
  };

  const dadosMembros = {
    totalMembros: 324,
    membrosAtivos: 298,
    novosMembros: 12,
    membrosInativos: 26,
    dizimistas: 145,
    participantesEventos: 256,
  };

  const relatoriosDisponiveis = [
    {
      id: "financeiro-completo",
      nome: "Relatório Financeiro Completo",
      descricao: "Entradas, saídas, saldo e análise detalhada",
      tipo: "Financeiro",
      icon: DollarSign,
    },
    {
      id: "contribuicoes",
      nome: "Relatório de Contribuições",
      descricao: "Dízimos, ofertas e doações detalhadas",
      tipo: "Financeiro",
      icon: Heart,
    },
    {
      id: "despesas",
      nome: "Relatório de Despesas",
      descricao: "Gastos por categoria e fornecedor",
      tipo: "Financeiro",
      icon: Receipt,
    },
    {
      id: "membros",
      nome: "Relatório de Membros",
      descricao: "Estatísticas e dados dos membros",
      tipo: "Administrativo",
      icon: Users,
    },
    {
      id: "eventos",
      nome: "Relatório de Eventos",
      descricao: "Eventos realizados e planejados",
      tipo: "Administrativo",
      icon: CalendarIcon,
    },
    {
      id: "grupos",
      nome: "Relatório de Grupos",
      descricao: "Atividades e participação dos grupos",
      tipo: "Administrativo",
      icon: Users,
    },
  ];

  const filteredRelatorios = relatoriosDisponiveis.filter((rel) =>
    tipoRelatorio === "todos" ? true : rel.tipo.toLowerCase() === tipoRelatorio
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="space-y-6 w-full p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
            <p className="text-muted-foreground">
              Gere relatórios detalhados do sistema
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard Analítico
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar Tudo
            </Button>
          </div>
        </div>

        {/* Resumo Executivo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                Resumo Financeiro
              </CardTitle>
              <CardDescription>
                Visão geral das finanças este mês
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-secondary/10">
                  <div className="text-2xl font-bold text-secondary">
                    {dadosFinanceiros.totalEntradas.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total de Entradas
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-destructive/10">
                  <div className="text-2xl font-bold text-destructive">
                    {dadosFinanceiros.totalSaidas.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total de Saídas
                  </div>
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-primary/10">
                <div className="text-3xl font-bold text-primary">
                  {dadosFinanceiros.saldoLiquido.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
                <div className="text-sm text-muted-foreground">
                  Saldo Líquido
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                Resumo de Membros
              </CardTitle>
              <CardDescription>
                Estatísticas dos membros da igreja
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-primary/10">
                  <div className="text-2xl font-bold text-primary">
                    {dadosMembros.totalMembros}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total de Membros
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/10">
                  <div className="text-2xl font-bold text-secondary">
                    {dadosMembros.membrosAtivos}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Membros Ativos
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-accent/10">
                  <div className="text-2xl font-bold text-accent">
                    {dadosMembros.novosMembros}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Novos este Mês
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/10">
                  <div className="text-2xl font-bold text-secondary">
                    {dadosMembros.dizimistas}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Dizimistas
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros para Relatórios */}
        <Card>
          <CardHeader>
            <CardTitle>Configurações de Relatório</CardTitle>
            <CardDescription>
              Configure os parâmetros para gerar relatórios personalizados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Relatório" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Tipos</SelectItem>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                  <SelectItem value="administrativo">Administrativo</SelectItem>
                </SelectContent>
              </Select>

              <Select value={periodo} onValueChange={setPeriodo}>
                <SelectTrigger>
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diario">Diário</SelectItem>
                  <SelectItem value="semanal">Semanal</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                  <SelectItem value="anual">Anual</SelectItem>
                  <SelectItem value="personalizado">Personalizado</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate
                      ? format(selectedDate, "PPP", { locale: ptBR })
                      : "Data Específica"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Button>
                <BarChart3 className="h-4 w-4 mr-2" />
                Aplicar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Relatórios Disponíveis */}
        <Card>
          <CardHeader>
            <CardTitle>Relatórios Disponíveis</CardTitle>
            <CardDescription>
              Selecione o relatório que deseja gerar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRelatorios.map((relatorio) => (
                <Card
                  key={relatorio.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <relatorio.icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">
                        {relatorio.nome}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {relatorio.descricao}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <FileText className="h-3 w-3 mr-1" />
                        Visualizar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Análise de Contribuições */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-accent" />
              Análise de Contribuições
            </CardTitle>
            <CardDescription>
              Distribuição das contribuições por tipo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-primary/10">
                <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">
                  {dadosFinanceiros.dizimos.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
                <div className="text-sm text-muted-foreground">Dízimos</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {Math.round(
                    (dadosFinanceiros.dizimos /
                      dadosFinanceiros.totalEntradas) *
                      100
                  )}
                  % do total
                </div>
              </div>

              <div className="text-center p-6 rounded-lg bg-accent/10">
                <Gift className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-accent">
                  {dadosFinanceiros.ofertas.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
                <div className="text-sm text-muted-foreground">Ofertas</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {Math.round(
                    (dadosFinanceiros.ofertas /
                      dadosFinanceiros.totalEntradas) *
                      100
                  )}
                  % do total
                </div>
              </div>

              <div className="text-center p-6 rounded-lg bg-secondary/10">
                <PiggyBank className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-secondary">
                  {dadosFinanceiros.doacoes.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
                <div className="text-sm text-muted-foreground">Doações</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {Math.round(
                    (dadosFinanceiros.doacoes /
                      dadosFinanceiros.totalEntradas) *
                      100
                  )}
                  % do total
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarProvider>
  );
}
