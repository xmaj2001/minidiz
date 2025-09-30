"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Users, Phone, Mail, Calendar, Edit, Trash2, UserCheck, UserX } from "lucide-react"


interface MembrosPageProps {
  data: any[]
}

export function MembrosPageX({data}: MembrosPageProps) {
  const [membros, setMembros] = useState(data)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [grupoFilter, setGrupoFilter] = useState("todos")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMembro, setEditingMembro] = useState<any>(null)

  // Filtrar membros
  const filteredMembros = membros.filter((membro) => {
    const matchesSearch =
      membro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membro.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || membro.status.toLowerCase() === statusFilter
    const matchesGrupo = grupoFilter === "todos" || membro.grupo.toLowerCase() === grupoFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesGrupo
  })

  const handleAddMembro = () => {
    setEditingMembro(null)
    setIsDialogOpen(true)
  }

  const handleEditMembro = (membro: any) => {
    setEditingMembro(membro)
    setIsDialogOpen(true)
  }

  const handleDeleteMembro = (id: number) => {
    setMembros(membros.filter((m) => m.id !== id))
  }

  const getStatusBadge = (status: string) => {
    return status === "Ativo" ? (
      <Badge variant="default" className="bg-secondary text-secondary-foreground">
        <UserCheck className="h-3 w-3 mr-1" />
        Ativo
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-muted text-muted-foreground">
        <UserX className="h-3 w-3 mr-1" />
        Inativo
      </Badge>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Membros</h1>
            <p className="text-muted-foreground">Gerencie os membros da igreja</p>
          </div>
          <Button onClick={handleAddMembro}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Membro
          </Button>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Membros</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{membros.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Membros Ativos</CardTitle>
              <UserCheck className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{membros.filter((m) => m.status === "Ativo").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novos este Mês</CardTitle>
              <Calendar className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Líderes</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {membros.filter((m) => m.cargo === "Líder" || m.cargo === "Diácono").length}
              </div>
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
                    placeholder="Buscar por nome ou email..."
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
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>

              <Select value={grupoFilter} onValueChange={setGrupoFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Grupo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Grupos</SelectItem>
                  <SelectItem value="jovens">Jovens</SelectItem>
                  <SelectItem value="mulheres">Mulheres</SelectItem>
                  <SelectItem value="homens">Homens</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Membros */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Membros</CardTitle>
            <CardDescription>{filteredMembros.length} membro(s) encontrado(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Membro</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Grupo</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembros.map((membro) => (
                  <TableRow key={membro.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/abstract-geometric-shapes.png?height=32&width=32&query=${membro.nome}`} />
                          <AvatarFallback>
                            {membro.nome+" "+membro.sobreNome}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{membro.nome}</div>
                          <div className="text-sm text-muted-foreground">
                            Membro desde {new Date(membro.data_cadastro).toLocaleDateString("pt-BR")}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {membro.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3" />
                          {membro.telefone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{membro.grupo}</Badge>
                    </TableCell>
                    <TableCell>{membro.cargo}</TableCell>
                    <TableCell>{getStatusBadge(membro.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditMembro(membro)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteMembro(membro.id)}>
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

        {/* Dialog para Adicionar/Editar Membro */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingMembro ? "Editar Membro" : "Novo Membro"}</DialogTitle>
              <DialogDescription>
                {editingMembro ? "Edite as informações do membro" : "Adicione um novo membro à igreja"}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" placeholder="Digite o primeiro nome" defaultValue={editingMembro?.nome} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nome">Sobre Nome</Label>
                <Input id="nome" placeholder="Digite o  sobre nome" defaultValue={editingMembro?.sobreNome} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@exemplo.com" defaultValue={editingMembro?.email} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" placeholder="(11) 99999-9999" defaultValue={editingMembro?.telefone} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input id="dataNascimento" type="date" defaultValue={editingMembro?.dataNascimento} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grupo">Grupo</Label>
                <Select defaultValue={editingMembro?.grupo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um grupo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Jovens">Jovens</SelectItem>
                    <SelectItem value="Mulheres">Mulheres</SelectItem>
                    <SelectItem value="Homens">Homens</SelectItem>
                    <SelectItem value="Crianças">Crianças</SelectItem>
                    <SelectItem value="Adolescentes">Adolescentes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo</Label>
                <Select defaultValue={editingMembro?.cargo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Membro">Membro</SelectItem>
                    <SelectItem value="Líder">Líder</SelectItem>
                    <SelectItem value="Diácono">Diácono</SelectItem>
                    <SelectItem value="Pastor">Pastor</SelectItem>
                    <SelectItem value="Presbítero">Presbítero</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input id="endereco" placeholder="Rua, número, bairro, cidade" defaultValue={editingMembro?.endereco} />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Informações adicionais sobre o membro"
                  defaultValue={editingMembro?.observacao}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                {editingMembro ? "Salvar Alterações" : "Adicionar Membro"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
