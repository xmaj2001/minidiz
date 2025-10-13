"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Plus,
  Search,
  CalendarIcon,
  Users,
  MapPin,
  Clock,
  Edit,
  Trash2,
  DollarSign,
  TrendingUp,
  Church,
  Heart,
  Music,
  BookOpen,
  Coffee,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Dados mockados dos eventos
const eventosData = [
  {
    id: 1,
    nome: "Culto de Ação de Graças",
    tipo: "Culto Especial",
    data: "2024-12-25",
    horario: "19:00",
    local: "Templo Principal",
    responsavel: "Pastor João",
    participantesEsperados: 200,
    orcamento: 500.0,
    gastoReal: 0,
    status: "Planejado",
    descricao: "Culto especial de Natal com apresentações musicais",
    observacoes: "Preparar decoração natalina",
  },
  {
    id: 2,
    nome: "Reunião de Obreiros",
    tipo: "Administrativa",
    data: "2024-12-18",
    horario: "14:00",
    local: "Sala de Reuniões",
    responsavel: "Diácono Pedro",
    participantesEsperados: 25,
    orcamento: 150.0,
    gastoReal: 120.0,
    status: "Realizado",
    descricao: "Reunião mensal dos obreiros da igreja",
    observacoes: "Lanche servido após a reunião",
  },
  {
    id: 3,
    nome: "Conferência de Jovens",
    tipo: "Conferência",
    data: "2024-12-30",
    horario: "09:00",
    local: "Auditório",
    responsavel: "Líder Maria",
    participantesEsperados: 150,
    orcamento: 2000.0,
    gastoReal: 0,
    status: "Planejado",
    descricao: "Conferência anual dos jovens com palestrantes convidados",
    observacoes: "Evento de 2 dias com hospedagem",
  },
  {
    id: 4,
    nome: "Chá Beneficente",
    tipo: "Social",
    data: "2024-12-20",
    horario: "15:00",
    local: "Salão Social",
    responsavel: "Grupo de Mulheres",
    participantesEsperados: 80,
    orcamento: 300.0,
    gastoReal: 280.0,
    status: "Realizado",
    descricao: "Chá beneficente para arrecadar fundos para ação social",
    observacoes: "Arrecadado R$ 800,00 para cestas básicas",
  },
  {
    id: 5,
    nome: "Vigília de Ano Novo",
    tipo: "Vigília",
    data: "2024-12-31",
    horario: "22:00",
    local: "Templo Principal",
    responsavel: "Pastor João",
    participantesEsperados: 300,
    orcamento: 400.0,
    gastoReal: 0,
    status: "Planejado",
    descricao: "Vigília de passagem de ano com oração e louvor",
    observacoes: "Ceia será servida à meia-noite",
  },
]

export default function EventosPage() {
  const [eventos, setEventos] = useState(eventosData)
  const [searchTerm, setSearchTerm] = useState("")
  const [tipoFilter, setTipoFilter] = useState("todos")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvento, setEditingEvento] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date>()

  // Filtrar eventos
  const filteredEventos = eventos.filter((evento) => {
    const matchesSearch =
      evento.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.responsavel.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTipo = tipoFilter === "todos" || evento.tipo.toLowerCase().includes(tipoFilter.toLowerCase())
    const matchesStatus = statusFilter === "todos" || evento.status.toLowerCase() === statusFilter

    return matchesSearch && matchesTipo && matchesStatus
  })

  // Calcular estatísticas
  const totalOrcamento = eventos.reduce((total, evento) => total + evento.orcamento, 0)
  const totalGastos = eventos.reduce((total, evento) => total + evento.gastoReal, 0)
  const eventosRealizados = eventos.filter((e) => e.status === "Realizado").length
  const proximosEventos = eventos.filter((e) => e.status === "Planejado" && new Date(e.data) > new Date()).length

  const handleAddEvento = () => {
    setEditingEvento(null)
    setIsDialogOpen(true)
  }

  const handleEditEvento = (evento: any) => {
    setEditingEvento(evento)
    setIsDialogOpen(true)
  }

  const handleDeleteEvento = (id: number) => {
    setEventos(eventos.filter((e) => e.id !== id))
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      Planejado: "bg-accent text-accent-foreground",
      Realizado: "bg-secondary text-secondary-foreground",
      Cancelado: "bg-destructive text-destructive-foreground",
    }
    return <Badge className={colors[status as keyof typeof colors] || "bg-muted text-muted-foreground"}>{status}</Badge>
  }

  const getTipoIcon = (tipo: string) => {
    const icons = {
      "Culto Especial": Church,
      Administrativa: Users,
      Conferência: BookOpen,
      Social: Coffee,
      Vigília: Heart,
      Musical: Music,
    }
    const Icon = icons[tipo as keyof typeof icons] || CalendarIcon
    return <Icon className="h-4 w-4" />
  }

  const getTipoBadge = (tipo: string) => {
    const colors = {
      "Culto Especial": "bg-primary text-primary-foreground",
      Administrativa: "bg-muted text-muted-foreground",
      Conferência: "bg-accent text-accent-foreground",
      Social: "bg-secondary text-secondary-foreground",
      Vigília: "bg-primary text-primary-foreground",
      Musical: "bg-accent text-accent-foreground",
    }
    return <Badge className={colors[tipo as keyof typeof colors] || "bg-muted text-muted-foreground"}>{tipo}</Badge>
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Eventos</h1>
            <p className="text-muted-foreground">Organize e gerencie os eventos da igreja</p>
          </div>
          <Button onClick={handleAddEvento}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Evento
          </Button>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orçamento Total</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalOrcamento.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                Planejado para eventos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gastos Reais</CardTitle>
              <DollarSign className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {totalGastos.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <p className="text-xs text-muted-foreground">Gastos efetivos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eventos Realizados</CardTitle>
              <CalendarIcon className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{eventosRealizados}</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximos Eventos</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{proximosEventos}</div>
              <p className="text-xs text-muted-foreground">Eventos planejados</p>
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
                    placeholder="Buscar por nome, descrição ou responsável..."
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
                  <SelectItem value="culto especial">Culto Especial</SelectItem>
                  <SelectItem value="administrativa">Administrativa</SelectItem>
                  <SelectItem value="conferência">Conferência</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="vigília">Vigília</SelectItem>
                  <SelectItem value="musical">Musical</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="planejado">Planejado</SelectItem>
                  <SelectItem value="realizado">Realizado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Eventos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEventos.map((evento) => (
            <Card key={evento.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getTipoIcon(evento.tipo)}
                    {evento.nome}
                  </CardTitle>
                  {getStatusBadge(evento.status)}
                </div>
                <CardDescription>{evento.descricao}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  {getTipoBadge(evento.tipo)}
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Orçamento</div>
                    <div className="font-semibold">
                      {evento.orcamento.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(evento.data).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{evento.horario}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{evento.local}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{evento.participantesEsperados} pessoas</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Responsável:</span> {evento.responsavel}
                  </div>
                  {evento.gastoReal > 0 && (
                    <div className="text-sm">
                      <span className="font-medium">Gasto Real:</span>{" "}
                      <span className="text-destructive">
                        {evento.gastoReal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                    </div>
                  )}
                  {evento.observacoes && <p className="text-sm text-muted-foreground">{evento.observacoes}</p>}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditEvento(evento)} className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteEvento(evento.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog para Adicionar/Editar Evento */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEvento ? "Editar Evento" : "Novo Evento"}</DialogTitle>
              <DialogDescription>
                {editingEvento ? "Edite as informações do evento" : "Crie um novo evento na igreja"}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="nome">Nome do Evento</Label>
                <Input id="nome" placeholder="Nome do evento" defaultValue={editingEvento?.nome} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Evento</Label>
                <Select defaultValue={editingEvento?.tipo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Culto Especial">Culto Especial</SelectItem>
                    <SelectItem value="Administrativa">Administrativa</SelectItem>
                    <SelectItem value="Conferência">Conferência</SelectItem>
                    <SelectItem value="Social">Social</SelectItem>
                    <SelectItem value="Vigília">Vigília</SelectItem>
                    <SelectItem value="Musical">Musical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável</Label>
                <Input id="responsavel" placeholder="Nome do responsável" defaultValue={editingEvento?.responsavel} />
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
                <Label htmlFor="horario">Horário</Label>
                <Input id="horario" type="time" defaultValue={editingEvento?.horario} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="local">Local</Label>
                <Input id="local" placeholder="Local do evento" defaultValue={editingEvento?.local} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="participantesEsperados">Participantes Esperados</Label>
                <Input
                  id="participantesEsperados"
                  type="number"
                  placeholder="0"
                  defaultValue={editingEvento?.participantesEsperados}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="orcamento">Orçamento</Label>
                <Input
                  id="orcamento"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  defaultValue={editingEvento?.orcamento}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gastoReal">Gasto Real (opcional)</Label>
                <Input
                  id="gastoReal"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  defaultValue={editingEvento?.gastoReal}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={editingEvento?.status || "Planejado"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planejado">Planejado</SelectItem>
                    <SelectItem value="Realizado">Realizado</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea id="descricao" placeholder="Descrição do evento" defaultValue={editingEvento?.descricao} />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Observações adicionais"
                  defaultValue={editingEvento?.observacoes}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                {editingEvento ? "Salvar Alterações" : "Criar Evento"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
