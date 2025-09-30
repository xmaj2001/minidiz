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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Plus,
  Search,
  Heart,
  Gift,
  PiggyBank,
  DollarSign,
  TrendingUp,
  CalendarIcon,
  Edit,
  Trash2,
  ImageIcon,
  Upload,
  Eye,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Dados mockados das contribuições
const contribuicoesData = [
  {
    id: 1,
    tipo: "Dízimo",
    membro: "João Silva",
    valor: 450.0,
    data: "2024-12-15",
    formaPagamento: "PIX",
    observacoes: "Dízimo mensal",
    status: "Confirmado",
  },
  {
    id: 2,
    tipo: "Oferta",
    membro: "Maria Santos",
    valor: 200.0,
    data: "2024-12-14",
    formaPagamento: "Dinheiro",
    observacoes: "Oferta especial para missões",
    status: "Confirmado",
  },
  {
    id: 3,
    tipo: "Doação",
    membro: "Pedro Costa",
    valor: 15000.0,
    data: "2024-12-13",
    formaPagamento: "Transferência",
    observacoes: "Doação de veículo - Civic 2020",
    status: "Pendente",
    temImagem: true,
    tipoObjeto: "Veículo",
  },
  {
    id: 4,
    tipo: "Oferta",
    membro: "Ana Oliveira",
    valor: 100.0,
    data: "2024-12-12",
    formaPagamento: "Cartão",
    observacoes: "Oferta de gratidão",
    status: "Confirmado",
  },
  {
    id: 5,
    tipo: "Doação",
    membro: "Carlos Mendes",
    valor: 2500.0,
    data: "2024-12-11",
    formaPagamento: "PIX",
    observacoes: "Doação de computador para secretaria",
    status: "Confirmado",
    temImagem: true,
    tipoObjeto: "Equipamento",
  },
]

export default function ContribuicoesPage() {
  const [contribuicoes, setContribuicoes] = useState(contribuicoesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [tipoFilter, setTipoFilter] = useState("todos")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingContribuicao, setEditingContribuicao] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  // Filtrar contribuições
  const filteredContribuicoes = contribuicoes.filter((contrib) => {
    const matchesSearch =
      contrib.membro.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrib.observacoes.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTipo = tipoFilter === "todos" || contrib.tipo.toLowerCase() === tipoFilter
    const matchesStatus = statusFilter === "todos" || contrib.status.toLowerCase() === statusFilter

    return matchesSearch && matchesTipo && matchesStatus
  })

  // Calcular totais
  const totalGeral = contribuicoes.reduce((total, contrib) => total + contrib.valor, 0)
  const totalDizimos = contribuicoes
    .filter((c) => c.tipo === "Dízimo")
    .reduce((total, contrib) => total + contrib.valor, 0)
  const totalOfertas = contribuicoes
    .filter((c) => c.tipo === "Oferta")
    .reduce((total, contrib) => total + contrib.valor, 0)
  const totalDoacoes = contribuicoes
    .filter((c) => c.tipo === "Doação")
    .reduce((total, contrib) => total + contrib.valor, 0)

  const handleAddContribuicao = () => {
    setEditingContribuicao(null)
    setIsDialogOpen(true)
  }

  const handleEditContribuicao = (contrib: any) => {
    setEditingContribuicao(contrib)
    setIsDialogOpen(true)
  }

  const handleDeleteContribuicao = (id: number) => {
    setContribuicoes(contribuicoes.filter((c) => c.id !== id))
  }

  const handleViewImages = (contrib: any) => {
    // Simular imagens para demonstração
    setSelectedImages([
      `/placeholder.svg?height=300&width=400&query=${contrib.tipoObjeto} ${contrib.observacoes}`,
      `/placeholder.svg?height=300&width=400&query=${contrib.tipoObjeto} detalhes`,
    ])
    setShowImageDialog(true)
  }

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

  const getTipoBadge = (tipo: string) => {
    const colors = {
      Dízimo: "bg-primary text-primary-foreground",
      Oferta: "bg-accent text-accent-foreground",
      Doação: "bg-secondary text-secondary-foreground",
    }
    return <Badge className={colors[tipo as keyof typeof colors]}>{tipo}</Badge>
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Contribuições</h1>
            <p className="text-muted-foreground">Gerencie dízimos, ofertas e doações</p>
          </div>
          <Button onClick={handleAddContribuicao}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Contribuição
          </Button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Geral</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalGeral.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                {contribuicoes.length} contribuições
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dízimos</CardTitle>
              <Heart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalDizimos.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <p className="text-xs text-muted-foreground">
                {contribuicoes.filter((c) => c.tipo === "Dízimo").length} registros
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ofertas</CardTitle>
              <Gift className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalOfertas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <p className="text-xs text-muted-foreground">
                {contribuicoes.filter((c) => c.tipo === "Oferta").length} registros
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Doações</CardTitle>
              <PiggyBank className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalDoacoes.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <p className="text-xs text-muted-foreground">
                {contribuicoes.filter((c) => c.tipo === "Doação").length} registros
              </p>
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

              <Select value={tipoFilter} onValueChange={setTipoFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Tipos</SelectItem>
                  <SelectItem value="dízimo">Dízimo</SelectItem>
                  <SelectItem value="oferta">Oferta</SelectItem>
                  <SelectItem value="doação">Doação</SelectItem>
                </SelectContent>
              </Select>

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
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Contribuições */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Contribuições</CardTitle>
            <CardDescription>{filteredContribuicoes.length} contribuição(ões) encontrada(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Membro</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Pagamento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContribuicoes.map((contrib) => (
                  <TableRow key={contrib.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTipoBadge(contrib.tipo)}
                        {contrib.temImagem && <ImageIcon className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{contrib.membro}</div>
                        <div className="text-sm text-muted-foreground">{contrib.observacoes}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {contrib.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </TableCell>
                    <TableCell>{new Date(contrib.data).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>{contrib.formaPagamento}</TableCell>
                    <TableCell>{getStatusBadge(contrib.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {contrib.temImagem && (
                          <Button variant="outline" size="sm" onClick={() => handleViewImages(contrib)}>
                            <Eye className="h-3 w-3" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => handleEditContribuicao(contrib)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteContribuicao(contrib.id)}>
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

        {/* Dialog para Adicionar/Editar Contribuição */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingContribuicao ? "Editar Contribuição" : "Nova Contribuição"}</DialogTitle>
              <DialogDescription>
                {editingContribuicao
                  ? "Edite as informações da contribuição"
                  : "Registre uma nova contribuição (dízimo, oferta ou doação)"}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="basico" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basico">Informações Básicas</TabsTrigger>
                <TabsTrigger value="detalhes">Detalhes e Imagens</TabsTrigger>
              </TabsList>

              <TabsContent value="basico" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Contribuição</Label>
                    <Select defaultValue={editingContribuicao?.tipo}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dízimo">Dízimo</SelectItem>
                        <SelectItem value="Oferta">Oferta</SelectItem>
                        <SelectItem value="Doação">Doação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="membro">Membro</Label>
                    <Input id="membro" placeholder="Nome do membro" defaultValue={editingContribuicao?.membro} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor</Label>
                    <Input
                      id="valor"
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      defaultValue={editingContribuicao?.valor}
                    />
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
                    <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
                    <Select defaultValue={editingContribuicao?.formaPagamento}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a forma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                        <SelectItem value="PIX">PIX</SelectItem>
                        <SelectItem value="Transferência">Transferência</SelectItem>
                        <SelectItem value="Cartão">Cartão</SelectItem>
                        <SelectItem value="Cheque">Cheque</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue={editingContribuicao?.status || "Pendente"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                        <SelectItem value="Confirmado">Confirmado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="observacoes">Observações</Label>
                    <Textarea
                      id="observacoes"
                      placeholder="Informações adicionais sobre a contribuição"
                      defaultValue={editingContribuicao?.observacoes}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="detalhes" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipoObjeto">Tipo de Objeto (para doações)</Label>
                    <Select defaultValue={editingContribuicao?.tipoObjeto}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de objeto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Veículo">Veículo</SelectItem>
                        <SelectItem value="Equipamento">Equipamento</SelectItem>
                        <SelectItem value="Móvel">Móvel</SelectItem>
                        <SelectItem value="Imóvel">Imóvel</SelectItem>
                        <SelectItem value="Eletrônico">Eletrônico</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Imagens da Oferta/Doação</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Clique para adicionar imagens ou arraste e solte aqui
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG até 10MB cada</p>
                      <Button variant="outline" className="mt-4 bg-transparent">
                        <Upload className="h-4 w-4 mr-2" />
                        Selecionar Imagens
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricaoDetalhada">Descrição Detalhada</Label>
                    <Textarea
                      id="descricaoDetalhada"
                      placeholder="Descreva detalhadamente o objeto doado (marca, modelo, estado, etc.)"
                      rows={4}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                {editingContribuicao ? "Salvar Alterações" : "Registrar Contribuição"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog para Visualizar Imagens */}
        <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Imagens da Contribuição</DialogTitle>
              <DialogDescription>Visualize as imagens anexadas à contribuição</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Imagem ${index + 1}`}
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
