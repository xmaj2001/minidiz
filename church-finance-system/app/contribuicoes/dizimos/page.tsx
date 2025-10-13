"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, DollarSign, TrendingUp, Users, Calendar, Search, Plus, Edit, Trash2 } from "lucide-react"

// Dados mockados dos dízimos
const dizimosData = [
  {
    id: 1,
    membro: "João Silva",
    valor: 450.0,
    data: "2024-12-15",
    formaPagamento: "PIX",
    referencia: "Dezembro/2024",
    status: "Confirmado",
  },
  {
    id: 2,
    membro: "Maria Santos",
    valor: 380.0,
    data: "2024-12-14",
    formaPagamento: "Transferência",
    referencia: "Dezembro/2024",
    status: "Confirmado",
  },
  {
    id: 3,
    membro: "Pedro Costa",
    valor: 520.0,
    data: "2024-12-13",
    formaPagamento: "Dinheiro",
    referencia: "Dezembro/2024",
    status: "Confirmado",
  },
  {
    id: 4,
    membro: "Ana Oliveira",
    valor: 300.0,
    data: "2024-12-12",
    formaPagamento: "PIX",
    referencia: "Dezembro/2024",
    status: "Pendente",
  },
]

export default function DizimosPage() {
  const [dizimos, setDizimos] = useState(dizimosData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [mesFilter, setMesFilter] = useState("todos")

  // Filtrar dízimos
  const filteredDizimos = dizimos.filter((dizimo) => {
    const matchesSearch = dizimo.membro.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || dizimo.status.toLowerCase() === statusFilter
    const matchesMes = mesFilter === "todos" || dizimo.referencia.includes(mesFilter)

    return matchesSearch && matchesStatus && matchesMes
  })

  // Calcular estatísticas
  const totalDizimos = dizimos.reduce((total, dizimo) => total + dizimo.valor, 0)
  const mediaDizimo = totalDizimos / dizimos.length
  const dizimosConfirmados = dizimos.filter((d) => d.status === "Confirmado").length
  const dizimistasMes = new Set(dizimos.map((d) => d.membro)).size

  const getStatusBadge = (status: string) => {
    return status === "Confirmado" ? (
      <Badge variant="default" className="bg-secondary text-secondary-foreground">
        Confirmado
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-muted text-muted-foreground">
        Pendente
      </Badge>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dízimos</h1>
            <p className="text-muted-foreground">Gestão completa dos dízimos da igreja</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Registrar Dízimo
          </Button>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Arrecadado</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalDizimos.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                Este mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Média por Dízimo</CardTitle>
              <Heart className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mediaDizimo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <p className="text-xs text-muted-foreground">Valor médio</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dizimistas Ativos</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dizimistasMes}</div>
              <p className="text-xs text-muted-foreground">Membros contribuindo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dizimosConfirmados}</div>
              <p className="text-xs text-muted-foreground">de {dizimos.length} registros</p>
            </CardContent>
          </Card>
        </div>

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
                    placeholder="Buscar por membro..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="confirmado">Confirmado</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>

              <Select value={mesFilter} onValueChange={setMesFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Mês" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Meses</SelectItem>
                  <SelectItem value="Dezembro/2024">Dezembro/2024</SelectItem>
                  <SelectItem value="Novembro/2024">Novembro/2024</SelectItem>
                  <SelectItem value="Outubro/2024">Outubro/2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Dízimos */}
        <Card>
          <CardHeader>
            <CardTitle>Registro de Dízimos</CardTitle>
            <CardDescription>{filteredDizimos.length} dízimo(s) encontrado(s)</CardDescription>
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
                {filteredDizimos.map((dizimo) => (
                  <TableRow key={dizimo.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-secondary" />
                        <span className="font-medium">{dizimo.membro}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {dizimo.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </TableCell>
                    <TableCell>{new Date(dizimo.data).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{dizimo.referencia}</Badge>
                    </TableCell>
                    <TableCell>{dizimo.formaPagamento}</TableCell>
                    <TableCell>{getStatusBadge(dizimo.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
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
      </div>
    </MainLayout>
  )
}
