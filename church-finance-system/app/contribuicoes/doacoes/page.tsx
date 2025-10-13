"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  PiggyBank,
  DollarSign,
  TrendingUp,
  Calendar,
  Search,
  Plus,
  Edit,
  Trash2,
  ImageIcon,
  Eye,
  Car,
  Monitor,
  Home,
} from "lucide-react"

// Dados mockados das doações
const doacoesData = [
  {
    id: 1,
    membro: "Pedro Costa",
    valor: 15000.0,
    data: "2024-12-13",
    formaPagamento: "Transferência",
    tipoObjeto: "Veículo",
    descricao: "Honda Civic 2020 - Branco",
    observacoes: "Doação de veículo em excelente estado",
    status: "Pendente",
    temImagem: true,
    imagens: ["/honda-civic-2020-branco.jpg", "/honda-civic-interior.png"],
  },
  {
    id: 2,
    membro: "Carlos Mendes",
    valor: 2500.0,
    data: "2024-12-11",
    formaPagamento: "PIX",
    tipoObjeto: "Equipamento",
    descricao: "Computador Dell Inspiron 15",
    observacoes: "Computador para secretaria da igreja",
    status: "Confirmado",
    temImagem: true,
    imagens: ["/dell-inspiron-15-laptop.jpg", "/laptop-specifications.jpg"],
  },
  {
    id: 3,
    membro: "Família Oliveira",
    valor: 80000.0,
    data: "2024-12-05",
    formaPagamento: "Escritura",
    tipoObjeto: "Imóvel",
    descricao: "Casa de 3 quartos - Rua das Flores, 456",
    observacoes: "Doação de imóvel para sede da igreja",
    status: "Em Análise",
    temImagem: true,
    imagens: ["/casa-3-quartos-fachada.jpg", "/casa-interior-sala.jpg"],
  },
  {
    id: 4,
    membro: "João Ferreira",
    valor: 1200.0,
    data: "2024-12-01",
    formaPagamento: "Dinheiro",
    tipoObjeto: "Móvel",
    descricao: "Mesa de escritório e cadeiras",
    observacoes: "Mobília para escritório pastoral",
    status: "Confirmado",
    temImagem: false,
  },
]

export default function DoacoesPage() {
  const [doacoes, setDoacoes] = useState(doacoesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [tipoFilter, setTipoFilter] = useState("todos")
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [selectedDoacao, setSelectedDoacao] = useState<any>(null)

  // Filtrar doações
  const filteredDoacoes = doacoes.filter((doacao) => {
    const matchesSearch =
      doacao.membro.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doacao.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doacao.observacoes.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || doacao.status.toLowerCase().includes(statusFilter.toLowerCase())
    const matchesTipo = tipoFilter === "todos" || doacao.tipoObjeto.toLowerCase() === tipoFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesTipo
  })

  // Calcular estatísticas
  const totalDoacoes = doacoes.reduce((total, doacao) => total + doacao.valor, 0)
  const mediaDoacao = totalDoacoes / doacoes.length
  const doacoesConfirmadas = doacoes.filter((d) => d.status === "Confirmado").length
  const doacoesComImagem = doacoes.filter((d) => d.temImagem).length

  const handleViewImages = (doacao: any) => {
    setSelectedDoacao(doacao)
    setSelectedImages(doacao.imagens || [])
    setShowImageDialog(true)
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      Confirmado: "bg-secondary text-secondary-foreground",
      Pendente: "bg-muted text-muted-foreground",
      "Em Análise": "bg-accent text-accent-foreground",
    }
    return <Badge className={colors[status as keyof typeof colors] || "bg-muted text-muted-foreground"}>{status}</Badge>
  }

  const getTipoIcon = (tipo: string) => {
    const icons = {
      Veículo: Car,
      Equipamento: Monitor,
      Imóvel: Home,
      Móvel: Monitor,
    }
    const Icon = icons[tipo as keyof typeof icons] || PiggyBank
    return <Icon className="h-4 w-4" />
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Doações</h1>
            <p className="text-muted-foreground">Gestão completa das doações da igreja</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Registrar Doação
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
                {totalDoacoes.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                Este mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Média por Doação</CardTitle>
              <PiggyBank className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mediaDoacao.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <p className="text-xs text-muted-foreground">Valor médio</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Com Imagens</CardTitle>
              <ImageIcon className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{doacoesComImagem}</div>
              <p className="text-xs text-muted-foreground">Objetos documentados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{doacoesConfirmadas}</div>
              <p className="text-xs text-muted-foreground">de {doacoes.length} registros</p>
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
                    placeholder="Buscar por membro, descrição ou observação..."
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
                  <SelectItem value="análise">Em Análise</SelectItem>
                </SelectContent>
              </Select>

              <Select value={tipoFilter} onValueChange={setTipoFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Tipos</SelectItem>
                  <SelectItem value="veículo">Veículo</SelectItem>
                  <SelectItem value="equipamento">Equipamento</SelectItem>
                  <SelectItem value="imóvel">Imóvel</SelectItem>
                  <SelectItem value="móvel">Móvel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Doações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoacoes.map((doacao) => (
            <Card key={doacao.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getTipoIcon(doacao.tipoObjeto)}
                    {doacao.membro}
                  </CardTitle>
                  {getStatusBadge(doacao.status)}
                </div>
                <CardDescription>{doacao.descricao}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {doacao.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                  <Badge variant="outline">{doacao.tipoObjeto}</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Data: {new Date(doacao.data).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>Pagamento: {doacao.formaPagamento}</span>
                  </div>
                  {doacao.temImagem && (
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{doacao.imagens?.length || 0} imagem(ns) anexada(s)</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground">{doacao.observacoes}</p>

                <div className="flex gap-2 pt-2">
                  {doacao.temImagem && (
                    <Button variant="outline" size="sm" onClick={() => handleViewImages(doacao)}>
                      <Eye className="h-3 w-3 mr-1" />
                      Ver Imagens
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog para Visualizar Imagens */}
        <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Imagens da Doação - {selectedDoacao?.membro}</DialogTitle>
              <DialogDescription>{selectedDoacao?.descricao}</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Imagem ${index + 1} da doação`}
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setShowImageDialog(false)}>
                Fechar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
