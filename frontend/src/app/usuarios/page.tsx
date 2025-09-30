"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  UserPlus,
  Search,
  Edit,
  Trash2,
  Shield,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Calendar,
  Activity,
} from "lucide-react"

const usuarios = [
  {
    id: 1,
    nome: "Pastor João Silva",
    email: "joao@igreja.com",
    telefone: "(11) 99999-9999",
    cargo: "Pastor Principal",
    nivel: "Administrador",
    status: "Ativo",
    ultimoAcesso: "2024-01-15 14:30",
    dataCriacao: "2023-01-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@igreja.com",
    telefone: "(11) 88888-8888",
    cargo: "Tesoureira",
    nivel: "Financeiro",
    status: "Ativo",
    ultimoAcesso: "2024-01-15 10:15",
    dataCriacao: "2023-02-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    nome: "Carlos Oliveira",
    email: "carlos@igreja.com",
    telefone: "(11) 77777-7777",
    cargo: "Secretário",
    nivel: "Editor",
    status: "Ativo",
    ultimoAcesso: "2024-01-14 16:45",
    dataCriacao: "2023-03-20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    nome: "Ana Costa",
    email: "ana@igreja.com",
    telefone: "(11) 66666-6666",
    cargo: "Assistente",
    nivel: "Visualizador",
    status: "Inativo",
    ultimoAcesso: "2024-01-10 09:20",
    dataCriacao: "2023-04-05",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const estatisticas = [
  {
    titulo: "Total de Usuários",
    valor: "4",
    descricao: "Usuários cadastrados",
    icone: User,
    cor: "text-blue-600",
  },
  {
    titulo: "Usuários Ativos",
    valor: "3",
    descricao: "Ativos no sistema",
    icone: Activity,
    cor: "text-green-600",
  },
  {
    titulo: "Administradores",
    valor: "1",
    descricao: "Com acesso total",
    icone: ShieldCheck,
    cor: "text-purple-600",
  },
  {
    titulo: "Último Acesso",
    valor: "Hoje",
    descricao: "Atividade recente",
    icone: Calendar,
    cor: "text-orange-600",
  },
]

export default function UsuariosPage() {
  const [busca, setBusca] = useState("")
  const [filtroNivel, setFiltroNivel] = useState("todos")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [dialogAberto, setDialogAberto] = useState(false)

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const matchBusca =
      usuario.nome.toLowerCase().includes(busca.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busca.toLowerCase())
    const matchNivel = filtroNivel === "todos" || usuario.nivel === filtroNivel
    const matchStatus = filtroStatus === "todos" || usuario.status === filtroStatus

    return matchBusca && matchNivel && matchStatus
  })

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "Administrador":
        return "bg-red-100 text-red-800"
      case "Financeiro":
        return "bg-purple-100 text-purple-800"
      case "Editor":
        return "bg-blue-100 text-blue-800"
      case "Visualizador":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "Ativo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Usuários do Sistema</h1>
          <p className="text-muted-foreground">Gerencie usuários e permissões do sistema</p>
        </div>
        <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Usuário</DialogTitle>
              <DialogDescription>Preencha as informações do novo usuário do sistema</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" placeholder="Nome do usuário" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@igreja.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" placeholder="(11) 99999-9999" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input id="cargo" placeholder="Cargo na igreja" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nivel">Nível de Acesso</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrador">Administrador</SelectItem>
                    <SelectItem value="financeiro">Financeiro</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="visualizador">Visualizador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea id="observacoes" placeholder="Observações sobre o usuário" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogAberto(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setDialogAberto(false)}>Criar Usuário</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {estatisticas.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.titulo}</CardTitle>
              <stat.icone className={`h-4 w-4 ${stat.cor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.valor}</div>
              <p className="text-xs text-muted-foreground">{stat.descricao}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filtroNivel} onValueChange={setFiltroNivel}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os níveis</SelectItem>
                  <SelectItem value="Administrador">Administrador</SelectItem>
                  <SelectItem value="Financeiro">Financeiro</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Visualizador">Visualizador</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Usuários */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
          <CardDescription>{usuariosFiltrados.length} usuário(s) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Último Acesso</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuariosFiltrados.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={usuario.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {usuario.nome
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{usuario.nome}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {usuario.email}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {usuario.telefone}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{usuario.cargo}</TableCell>
                  <TableCell>
                    <Badge className={getNivelColor(usuario.nivel)}>
                      {usuario.nivel === "Administrador" && <Shield className="mr-1 h-3 w-3" />}
                      {usuario.nivel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(usuario.status)}>{usuario.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{usuario.ultimoAcesso}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
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
  )
}
