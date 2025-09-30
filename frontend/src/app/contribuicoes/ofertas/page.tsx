"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gift, DollarSign, TrendingUp, Calendar, Search, Plus, Edit, Trash2, ImageIcon, Eye } from "lucide-react"

// Dados mockados das ofertas
const ofertasData = [
  {
    id: 1,
    membro: "Maria Santos",
    valor: 200.0,
    data: "2024-12-14",
    formaPagamento: "Dinheiro",
    finalidade: "Missões",
    observacoes: "Oferta especial para missões",
    status: "Confirmado",
    temImagem: false,
  },
  {
    id: 2,
    membro: "Ana Oliveira",
    valor: 100.0,
    data: "2024-12-12",
    formaPagamento: "PIX",
    finalidade: "Construção",
    observacoes: "Oferta para reforma do templo",
    status: "Confirmado",
    temImagem: false,
  },
  {
    id: 3,
    membro: "Carlos Silva",
    valor: 5000.0,
    data: "2024-12-10",
    formaPagamento: "Transferência",
    finalidade: "Equipamentos",
    observacoes: "Oferta de equipamento de som",
    status: "Confirmado",
    temImagem: true,
    tipoObjeto: "Equipamento de Som",
  },
  {
    id: 4,
    membro: "José Santos",
    valor: 150.0,
    data: "2024-12-08",
    formaPagamento: "Cartão",
    finalidade: "Ação Social",
    observacoes: "Para cesta básica",
    status: "Pendente",
    temImagem: false,
  },
]

export default function OfertasPage() {
  const [ofertas, setOfertas] = useState(ofertasData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [finalidadeFilter, setFinalidadeFilter] = useState("todos")

  // Filtrar ofertas
  const filteredOfertas = ofertas.filter((oferta) => {
    const matchesSearch =
      oferta.membro.toLowerCase().includes(searchTerm.toLowerCase()) ||
      oferta.observacoes.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || oferta.status.toLowerCase() === statusFilter
    const matchesFinalidade =
      finalidadeFilter === "todos" || oferta.finalidade.toLowerCase() === finalidadeFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesFinalidade
  })

  // Calcular estatísticas
  const totalOfertas = ofertas.reduce((total, oferta) => total + oferta.valor, 0)
  const mediaOferta = totalOfertas / ofertas.length
  const ofertasConfirmadas = ofertas.filter((o) => o.status === "Confirmado").length
  const ofertasComImagem = ofertas.filter((o) => o.temImagem).length

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

  const getFinalidadeBadge = (finalidade: string) => {
    const colors = {
      Missões: "bg-primary text-primary-foreground",
      Construção: "bg-accent text-accent-foreground",
      Equipamentos: "bg-secondary text-secondary-foreground",
      "Ação Social": "bg-muted text-muted-foreground",
    }
    return (
      <Badge className={colors[finalidade as keyof typeof colors] || "bg-muted text-muted-foreground"}>
        {finalidade}
      </Badge>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Ofertas</h1>
            <p className="text-muted-foreground">Gestão completa das ofertas da igreja</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Registrar Oferta
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
                {totalOfertas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                Este mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Média por Oferta</CardTitle>
              <Gift className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mediaOferta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <p className="text-xs text-muted-foreground">Valor médio</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ofertas com Imagem</CardTitle>
              <ImageIcon className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ofertasComImagem}</div>
              <p className="text-xs text-muted-foreground">Objetos doados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ofertasConfirmadas}</div>
              <p className="text-xs text-muted-foreground">de {ofertas.length} registros</p>
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
                    placeholder="Buscar por membro ou observação..."
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

              <Select value={finalidadeFilter} onValueChange={setFinalidadeFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Finalidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as Finalidades</SelectItem>
                  <SelectItem value="missões">Missões</SelectItem>
                  <SelectItem value="construção">Construção</SelectItem>
                  <SelectItem value="equipamentos">Equipamentos</SelectItem>
                  <SelectItem value="ação social">Ação Social</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Ofertas */}
        <Card>
          <CardHeader>
            <CardTitle>Registro de Ofertas</CardTitle>
            <CardDescription>{filteredOfertas.length} oferta(s) encontrada(s)</CardDescription>
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
                {filteredOfertas.map((oferta) => (
                  <TableRow key={oferta.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Gift className="h-4 w-4 text-accent" />
                        <div>
                          <div className="font-medium">{oferta.membro}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            {oferta.observacoes}
                            {oferta.temImagem && <ImageIcon className="h-3 w-3" />}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {oferta.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </TableCell>
                    <TableCell>{new Date(oferta.data).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>{getFinalidadeBadge(oferta.finalidade)}</TableCell>
                    <TableCell>{oferta.formaPagamento}</TableCell>
                    <TableCell>{getStatusBadge(oferta.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {oferta.temImagem && (
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
      </div>
    </MainLayout>
  )
}
