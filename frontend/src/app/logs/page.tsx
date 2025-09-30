"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Search,
  FileText,
  Activity,
  Users,
  CalendarIcon,
  Filter,
  Download,
  Eye,
  Plus,
  Edit,
  Trash2,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Dados mockados dos logs de atividade
const logsData = [
  {
    id: 1,
    usuario: "Pastor João",
    acao: "Criou",
    modulo: "Eventos",
    detalhes: "Criou evento 'Culto de Ação de Graças'",
    dataHora: "2024-12-15T14:30:00",
    ip: "192.168.1.100",
    tipo: "Criação",
    status: "Sucesso",
  },
  {
    id: 2,
    usuario: "Maria Santos",
    acao: "Editou",
    modulo: "Membros",
    detalhes: "Atualizou informações do membro 'João Silva'",
    dataHora: "2024-12-15T13:45:00",
    ip: "192.168.1.101",
    tipo: "Edição",
    status: "Sucesso",
  },
  {
    id: 3,
    usuario: "Pedro Costa",
    acao: "Registrou",
    modulo: "Contribuições",
    detalhes: "Registrou dízimo de R$ 450,00 para João Silva",
    dataHora: "2024-12-15T12:20:00",
    ip: "192.168.1.102",
    tipo: "Criação",
    status: "Sucesso",
  },
  {
    id: 4,
    usuario: "Ana Oliveira",
    acao: "Tentou Excluir",
    modulo: "Despesas",
    detalhes: "Tentativa de exclusão da despesa 'Conta de Energia'",
    dataHora: "2024-12-15T11:15:00",
    ip: "192.168.1.103",
    tipo: "Exclusão",
    status: "Erro",
  },
  {
    id: 5,
    usuario: "Carlos Mendes",
    acao: "Visualizou",
    modulo: "Relatórios",
    detalhes: "Acessou relatório financeiro mensal",
    dataHora: "2024-12-15T10:30:00",
    ip: "192.168.1.104",
    tipo: "Visualização",
    status: "Sucesso",
  },
  {
    id: 6,
    usuario: "Líder Maria",
    acao: "Criou",
    modulo: "Grupos",
    detalhes: "Criou novo grupo 'Adolescentes'",
    dataHora: "2024-12-15T09:45:00",
    ip: "192.168.1.105",
    tipo: "Criação",
    status: "Sucesso",
  },
  {
    id: 7,
    usuario: "Diácono Pedro",
    acao: "Atualizou",
    modulo: "Configurações",
    detalhes: "Alterou configurações de backup automático",
    dataHora: "2024-12-15T09:00:00",
    ip: "192.168.1.106",
    tipo: "Configuração",
    status: "Sucesso",
  },
  {
    id: 8,
    usuario: "Secretária Ana",
    acao: "Exportou",
    modulo: "Contribuições",
    detalhes: "Exportou relatório de dízimos para Excel",
    dataHora: "2024-12-15T08:30:00",
    ip: "192.168.1.107",
    tipo: "Exportação",
    status: "Sucesso",
  },
  {
    id: 9,
    usuario: "Tesoureiro José",
    acao: "Aprovou",
    modulo: "Despesas",
    detalhes: "Aprovou despesa de R$ 2.450,00 para reparo do telhado",
    dataHora: "2024-12-14T16:20:00",
    ip: "192.168.1.108",
    tipo: "Aprovação",
    status: "Sucesso",
  },
  {
    id: 10,
    usuario: "Sistema",
    acao: "Backup",
    modulo: "Sistema",
    detalhes: "Backup automático realizado com sucesso",
    dataHora: "2024-12-14T02:00:00",
    ip: "127.0.0.1",
    tipo: "Sistema",
    status: "Sucesso",
  },
]

export default function LogsPage() {
  const [logs, setLogs] = useState(logsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [usuarioFilter, setUsuarioFilter] = useState("todos")
  const [moduloFilter, setModuloFilter] = useState("todos")
  const [tipoFilter, setTipoFilter] = useState("todos")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [selectedDate, setSelectedDate] = useState<Date>()

  // Filtrar logs
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.acao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.detalhes.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesUsuario = usuarioFilter === "todos" || log.usuario.toLowerCase().includes(usuarioFilter.toLowerCase())
    const matchesModulo = moduloFilter === "todos" || log.modulo.toLowerCase() === moduloFilter
    const matchesTipo = tipoFilter === "todos" || log.tipo.toLowerCase() === tipoFilter
    const matchesStatus = statusFilter === "todos" || log.status.toLowerCase() === statusFilter
    const matchesDate = !selectedDate || new Date(log.dataHora).toDateString() === selectedDate.toDateString()

    return matchesSearch && matchesUsuario && matchesModulo && matchesTipo && matchesStatus && matchesDate
  })

  // Calcular estatísticas
  const totalLogs = logs.length
  const logsHoje = logs.filter((log) => {
    const hoje = new Date()
    const logDate = new Date(log.dataHora)
    return logDate.toDateString() === hoje.toDateString()
  }).length
  const usuariosAtivos = new Set(logs.map((log) => log.usuario)).size
  const logsSucesso = logs.filter((log) => log.status === "Sucesso").length

  const getStatusBadge = (status: string) => {
    const configs = {
      Sucesso: { color: "bg-secondary text-secondary-foreground", icon: CheckCircle },
      Erro: { color: "bg-destructive text-destructive-foreground", icon: XCircle },
      Aviso: { color: "bg-accent text-accent-foreground", icon: AlertTriangle },
    }
    const config = configs[status as keyof typeof configs] || { color: "bg-muted text-muted-foreground", icon: Info }
    const Icon = config.icon
    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </Badge>
    )
  }

  const getTipoIcon = (tipo: string) => {
    const icons = {
      Criação: Plus,
      Edição: Edit,
      Exclusão: Trash2,
      Visualização: Eye,
      Exportação: Download,
      Aprovação: CheckCircle,
      Configuração: Settings,
      Sistema: Activity,
    }
    const Icon = icons[tipo as keyof typeof icons] || FileText
    return <Icon className="h-4 w-4 text-muted-foreground" />
  }

  const getModuloColor = (modulo: string) => {
    const colors = {
      Membros: "bg-primary text-primary-foreground",
      Grupos: "bg-secondary text-secondary-foreground",
      Contribuições: "bg-accent text-accent-foreground",
      Despesas: "bg-destructive text-destructive-foreground",
      Eventos: "bg-primary text-primary-foreground",
      Relatórios: "bg-muted text-muted-foreground",
      Configurações: "bg-accent text-accent-foreground",
      Sistema: "bg-secondary text-secondary-foreground",
    }
    return colors[modulo as keyof typeof colors] || "bg-muted text-muted-foreground"
  }

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime)
    return {
      date: date.toLocaleDateString("pt-BR"),
      time: date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Logs de Atividade</h1>
            <p className="text-muted-foreground">Monitore todas as ações realizadas no sistema</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar Logs
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros Avançados
            </Button>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Logs</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLogs}</div>
              <p className="text-xs text-muted-foreground">Registros no sistema</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Atividades Hoje</CardTitle>
              <Activity className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{logsHoje}</div>
              <p className="text-xs text-muted-foreground">Ações realizadas hoje</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usuariosAtivos}</div>
              <p className="text-xs text-muted-foreground">Usuários com atividade</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
              <CheckCircle className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round((logsSucesso / totalLogs) * 100)}%</div>
              <p className="text-xs text-muted-foreground">Operações bem-sucedidas</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Filtre os logs por diferentes critérios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por usuário, ação ou detalhes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={usuarioFilter} onValueChange={setUsuarioFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Usuário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Usuários</SelectItem>
                  <SelectItem value="pastor joão">Pastor João</SelectItem>
                  <SelectItem value="maria santos">Maria Santos</SelectItem>
                  <SelectItem value="pedro costa">Pedro Costa</SelectItem>
                  <SelectItem value="ana oliveira">Ana Oliveira</SelectItem>
                  <SelectItem value="sistema">Sistema</SelectItem>
                </SelectContent>
              </Select>

              <Select value={moduloFilter} onValueChange={setModuloFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Módulo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Módulos</SelectItem>
                  <SelectItem value="membros">Membros</SelectItem>
                  <SelectItem value="grupos">Grupos</SelectItem>
                  <SelectItem value="contribuições">Contribuições</SelectItem>
                  <SelectItem value="despesas">Despesas</SelectItem>
                  <SelectItem value="eventos">Eventos</SelectItem>
                  <SelectItem value="relatórios">Relatórios</SelectItem>
                  <SelectItem value="configurações">Configurações</SelectItem>
                  <SelectItem value="sistema">Sistema</SelectItem>
                </SelectContent>
              </Select>

              <Select value={tipoFilter} onValueChange={setTipoFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Tipos</SelectItem>
                  <SelectItem value="criação">Criação</SelectItem>
                  <SelectItem value="edição">Edição</SelectItem>
                  <SelectItem value="exclusão">Exclusão</SelectItem>
                  <SelectItem value="visualização">Visualização</SelectItem>
                  <SelectItem value="exportação">Exportação</SelectItem>
                  <SelectItem value="aprovação">Aprovação</SelectItem>
                  <SelectItem value="configuração">Configuração</SelectItem>
                  <SelectItem value="sistema">Sistema</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : "Data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex gap-2 mt-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="sucesso">Sucesso</SelectItem>
                  <SelectItem value="erro">Erro</SelectItem>
                  <SelectItem value="aviso">Aviso</SelectItem>
                </SelectContent>
              </Select>

              {(searchTerm || usuarioFilter !== "todos" || moduloFilter !== "todos" || selectedDate) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setUsuarioFilter("todos")
                    setModuloFilter("todos")
                    setTipoFilter("todos")
                    setStatusFilter("todos")
                    setSelectedDate(undefined)
                  }}
                >
                  Limpar Filtros
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Registro de Atividades</CardTitle>
            <CardDescription>{filteredLogs.length} log(s) encontrado(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Módulo</TableHead>
                  <TableHead>Detalhes</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => {
                  const dateTime = formatDateTime(log.dataHora)
                  return (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/abstract-geometric-shapes.png?height=32&width=32&query=${log.usuario}`} />
                            <AvatarFallback>
                              {log.usuario
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{log.usuario}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTipoIcon(log.tipo)}
                          <span>{log.acao}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getModuloColor(log.modulo)}>{log.modulo}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate" title={log.detalhes}>
                          {log.detalhes}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{dateTime.date}</div>
                          <div className="text-sm text-muted-foreground">{dateTime.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(log.status)}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">{log.ip}</code>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Resumo de Atividades por Módulo */}
        <Card>
          <CardHeader>
            <CardTitle>Atividades por Módulo</CardTitle>
            <CardDescription>Distribuição das ações por módulo do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(
                logs.reduce(
                  (acc, log) => {
                    acc[log.modulo] = (acc[log.modulo] || 0) + 1
                    return acc
                  },
                  {} as Record<string, number>,
                ),
              ).map(([modulo, count]) => (
                <div key={modulo} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Badge className={getModuloColor(modulo)}>{modulo}</Badge>
                  </div>
                  <span className="font-semibold">{count} ações</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
