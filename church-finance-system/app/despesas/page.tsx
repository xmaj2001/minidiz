"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Plus,
  Search,
  TrendingDown,
  DollarSign,
  CalendarIcon,
  Edit,
  Trash2,
  Receipt,
  Zap,
  Wrench,
  ShoppingCart,
  Users,
  Building,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Dados mockados das despesas
const despesasData = [
  {
    id: 1,
    descricao: "Conta de Energia Elétrica",
    categoria: "Utilidades",
    valor: 850.0,
    data: "2024-12-15",
    fornecedor: "Companhia Elétrica",
    formaPagamento: "Débito Automático",
    status: "Pago",
    observacoes: "Conta referente ao mês de novembro",
    numeroNF: "NF-2024-001",
  },
  {
    id: 2,
    descricao: "Reparo no Telhado",
    categoria: "Manutenção",
    valor: 2450.0,
    data: "2024-12-14",
    fornecedor: "Construtora Silva",
    formaPagamento: "Transferência",
    status: "Pago",
    observacoes: "Reparo de goteiras no salão principal",
    numeroNF: "NF-2024-002",
  },
  {
    id: 3,
    descricao: "Material de Limpeza",
    categoria: "Materiais",
    valor: 320.0,
    data: "2024-12-13",
    fornecedor: "Distribuidora Limpa",
    formaPagamento: "PIX",
    status: "Pago",
    observacoes: "Produtos para limpeza mensal",
    numeroNF: "NF-2024-003",
  },
  {
    id: 4,
    descricao: "Equipamento de Som",
    categoria: "Equipamentos",
    valor: 3200.0,
    data: "2024-12-12",
    fornecedor: "Audio Pro",
    formaPagamento: "Cartão",
    status: "Pendente",
    observacoes: "Microfone sem fio para cultos",
    numeroNF: "NF-2024-004",
  },
  {
    id: 5,
    descricao: "Combustível Veículo",
    categoria: "Transporte",
    valor: 180.0,
    data: "2024-12-11",
    fornecedor: "Posto Central",
    formaPagamento: "Dinheiro",
    status: "Pago",
    observacoes: "Abastecimento van da igreja",
    numeroNF: "",
  },
]

export default function DespesasPage() {
  const [despesas, setDespesas] = useState(despesasData)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoriaFilter, setCategoriaFilter] = useState("todos")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDespesa, setEditingDespesa] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date>()

  // Filtrar despesas
  const filteredDespesas = despesas.filter((despesa) => {
    const matchesSearch =
      despesa.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      despesa.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      despesa.observacoes.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategoria = categoriaFilter === "todos" || despesa.categoria.toLowerCase() === categoriaFilter
    const matchesStatus = statusFilter === "todos" || despesa.status.toLowerCase() === statusFilter

    return matchesSearch && matchesCategoria && matchesStatus
  })

  // Calcular totais
  const totalDespesas = despesas.reduce((total, despesa) => total + despesa.valor, 0)
  const despesasPagas = despesas.filter((d) => d.status === "Pago").reduce((total, despesa) => total + despesa.valor, 0)
  const despesasPendentes = despesas
    .filter((d) => d.status === "Pendente")
    .reduce((total, despesa) => total + despesa.valor, 0)

  // Agrupar por categoria
  const despesasPorCategoria = despesas.reduce(
    (acc, despesa) => {
      acc[despesa.categoria] = (acc[despesa.categoria] || 0) + despesa.valor
      return acc
    },
    {} as Record<string, number>,
  )

  const handleAddDespesa = () => {
    setEditingDespesa(null)
    setIsDialogOpen(true)
  }

  const handleEditDespesa = (despesa: any) => {
    setEditingDespesa(despesa)
    setIsDialogOpen(true)
  }

  const handleDeleteDespesa = (id: number) => {
    setDespesas(despesas.filter((d) => d.id !== id))
  }

  const getStatusBadge = (status: string) => {
    return status === "Pago" ? (
      <Badge variant="default" className="bg-secondary text-secondary-foreground">
        Pago
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-destructive text-destructive-foreground">
        Pendente
      </Badge>
    )
  }

  const getCategoriaIcon = (categoria: string) => {
    const icons = {
      Utilidades: Zap,
      Manutenção: Wrench,
      Materiais: ShoppingCart,
      Equipamentos: Receipt,
      Transporte: Building,
      Pessoal: Users,
    }
    const Icon = icons[categoria as keyof typeof icons] || FileText
    return <Icon className="h-4 w-4" />
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Despesas</h1>
            <p className="text-muted-foreground">Controle completo das despesas da igreja</p>
          </div>
          <Button onClick={handleAddDespesa}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Despesa
          </Button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Despesas</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {totalDespesas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <p className="text-xs text-muted-foreground">{despesas.length} despesas registradas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Despesas Pagas</CardTitle>
              <DollarSign className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {despesasPagas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <p className="text-xs text-muted-foreground">
                {despesas.filter((d) => d.status === "Pago").length} despesas pagas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Despesas Pendentes</CardTitle>
              <CalendarIcon className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {despesasPendentes.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <p className="text-xs text-muted-foreground">
                {despesas.filter((d) => d.status === "Pendente").length} despesas pendentes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maior Categoria</CardTitle>
              <Receipt className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.keys(despesasPorCategoria).length > 0
                  ? Object.entries(despesasPorCategoria).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
                  : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">Categoria com mais gastos</p>
            </CardContent>
          </Card>
        </div>

        {/* Despesas por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Despesas por Categoria</CardTitle>
            <CardDescription>Distribuição dos gastos por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(despesasPorCategoria).map(([categoria, valor]) => (
                <div key={categoria} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    {getCategoriaIcon(categoria)}
                    <span className="font-medium">{categoria}</span>
                  </div>
                  <span className="font-semibold text-destructive">
                    {valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por descrição, fornecedor ou observação..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as Categorias</SelectItem>
                  <SelectItem value="utilidades">Utilidades</SelectItem>
                  <SelectItem value="manutenção">Manutenção</SelectItem>
                  <SelectItem value="materiais">Materiais</SelectItem>
                  <SelectItem value="equipamentos">Equipamentos</SelectItem>
                  <SelectItem value="transporte">Transporte</SelectItem>
                  <SelectItem value="pessoal">Pessoal</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="pago">Pago</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Despesas */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Despesas</CardTitle>
            <CardDescription>{filteredDespesas.length} despesa(s) encontrada(s)</CardDescription>
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
                {filteredDespesas.map((despesa) => (
                  <TableRow key={despesa.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{despesa.descricao}</div>
                        <div className="text-sm text-muted-foreground">{despesa.observacoes}</div>
                        {despesa.numeroNF && (
                          <div className="text-xs text-muted-foreground">NF: {despesa.numeroNF}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getCategoriaIcon(despesa.categoria)}
                        <Badge variant="outline">{despesa.categoria}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-destructive">
                      {despesa.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </TableCell>
                    <TableCell>{new Date(despesa.data).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{despesa.fornecedor}</div>
                        <div className="text-sm text-muted-foreground">{despesa.formaPagamento}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(despesa.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditDespesa(despesa)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteDespesa(despesa.id)}>
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

        {/* Dialog para Adicionar/Editar Despesa */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingDespesa ? "Editar Despesa" : "Nova Despesa"}</DialogTitle>
              <DialogDescription>
                {editingDespesa ? "Edite as informações da despesa" : "Registre uma nova despesa da igreja"}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input id="descricao" placeholder="Descrição da despesa" defaultValue={editingDespesa?.descricao} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Select defaultValue={editingDespesa?.categoria}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Utilidades">Utilidades</SelectItem>
                    <SelectItem value="Manutenção">Manutenção</SelectItem>
                    <SelectItem value="Materiais">Materiais</SelectItem>
                    <SelectItem value="Equipamentos">Equipamentos</SelectItem>
                    <SelectItem value="Transporte">Transporte</SelectItem>
                    <SelectItem value="Pessoal">Pessoal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor">Valor</Label>
                <Input id="valor" type="number" step="0.01" placeholder="0,00" defaultValue={editingDespesa?.valor} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data">Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : "Selecione a data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fornecedor">Fornecedor</Label>
                <Input id="fornecedor" placeholder="Nome do fornecedor" defaultValue={editingDespesa?.fornecedor} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
                <Select defaultValue={editingDespesa?.formaPagamento}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a forma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="PIX">PIX</SelectItem>
                    <SelectItem value="Transferência">Transferência</SelectItem>
                    <SelectItem value="Cartão">Cartão</SelectItem>
                    <SelectItem value="Débito Automático">Débito Automático</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={editingDespesa?.status || "Pendente"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Pago">Pago</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numeroNF">Número da NF (opcional)</Label>
                <Input id="numeroNF" placeholder="NF-2024-001" defaultValue={editingDespesa?.numeroNF} />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Informações adicionais sobre a despesa"
                  defaultValue={editingDespesa?.observacoes}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                {editingDespesa ? "Salvar Alterações" : "Registrar Despesa"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
