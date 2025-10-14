"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Settings, Church, Users, Database, Bell, Palette, Save, Download, Upload } from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function ConfiguracoesPage() {
  const [configuracoes, setConfiguracoes] = useState({
    // Configurações da Igreja
    nomeIgreja: "Igreja Evangélica Esperança",
    endereco: "Rua da Fé, 123 - Centro",
    telefone: "(11) 3333-4444",
    email: "contato@igrejaesperanca.com.br",
    cnpj: "12.345.678/0001-90",
    pastor: "Pastor João Silva",

    // Configurações do Sistema
    backupAutomatico: true,
    frequenciaBackup: "diario",
    notificacoesPorEmail: true,
    logDetalhado: true,
    manterLogsAte: "90",

    // Configurações de Usuários
    permitirAutoRegistro: false,
    aprovarNovosUsuarios: true,
    sessaoExpiraEm: "480",
    senhaMinima: "8",

    // Configurações de Notificações
    notificarNovaContribuicao: true,
    notificarNovaDespesa: true,
    notificarNovoMembro: true,
    notificarEventos: true,
  })

  const handleSave = () => {
    // Simular salvamento
    console.log("Configurações salvas:", configuracoes)
  }

  const handleBackup = () => {
    // Simular backup
    console.log("Backup iniciado...")
  }

  const handleRestore = () => {
    // Simular restauração
    console.log("Restauração iniciada...")
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="space-y-6 w-full p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
            <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleBackup}>
              <Download className="h-4 w-4 mr-2" />
              Backup
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>

        <Tabs defaultValue="igreja" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="igreja" className="flex items-center gap-2">
              <Church className="h-4 w-4" />
              Igreja
            </TabsTrigger>
            <TabsTrigger value="sistema" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Sistema
            </TabsTrigger>
            <TabsTrigger value="usuarios" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="notificacoes" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Backup
            </TabsTrigger>
          </TabsList>

          {/* Configurações da Igreja */}
          <TabsContent value="igreja">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Church className="h-5 w-5" />
                  Informações da Igreja
                </CardTitle>
                <CardDescription>Configure as informações básicas da igreja</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nomeIgreja">Nome da Igreja</Label>
                    <Input
                      id="nomeIgreja"
                      value={configuracoes.nomeIgreja}
                      onChange={(e) => setConfiguracoes({ ...configuracoes, nomeIgreja: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pastor">Pastor Responsável</Label>
                    <Input
                      id="pastor"
                      value={configuracoes.pastor}
                      onChange={(e) => setConfiguracoes({ ...configuracoes, pastor: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={configuracoes.telefone}
                      onChange={(e) => setConfiguracoes({ ...configuracoes, telefone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={configuracoes.email}
                      onChange={(e) => setConfiguracoes({ ...configuracoes, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      value={configuracoes.cnpj}
                      onChange={(e) => setConfiguracoes({ ...configuracoes, cnpj: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço Completo</Label>
                  <Textarea
                    id="endereco"
                    value={configuracoes.endereco}
                    onChange={(e) => setConfiguracoes({ ...configuracoes, endereco: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações do Sistema */}
          <TabsContent value="sistema">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Configurações Gerais
                  </CardTitle>
                  <CardDescription>Configure o comportamento geral do sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Log Detalhado</Label>
                      <p className="text-sm text-muted-foreground">Registrar todas as ações dos usuários</p>
                    </div>
                    <Switch
                      checked={configuracoes.logDetalhado}
                      onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, logDetalhado: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="manterLogsAte">Manter Logs Por (dias)</Label>
                      <Input
                        id="manterLogsAte"
                        type="number"
                        value={configuracoes.manterLogsAte}
                        onChange={(e) => setConfiguracoes({ ...configuracoes, manterLogsAte: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Aparência
                  </CardTitle>
                  <CardDescription>Personalize a aparência do sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tema</Label>
                    <Select defaultValue="claro">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="claro">Claro</SelectItem>
                        <SelectItem value="escuro">Escuro</SelectItem>
                        <SelectItem value="automatico">Automático</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Configurações de Usuários */}
          <TabsContent value="usuarios">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Gerenciamento de Usuários
                </CardTitle>
                <CardDescription>Configure as políticas de usuários e segurança</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Permitir Auto-registro</Label>
                    <p className="text-sm text-muted-foreground">Usuários podem se registrar automaticamente</p>
                  </div>
                  <Switch
                    checked={configuracoes.permitirAutoRegistro}
                    onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, permitirAutoRegistro: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Aprovar Novos Usuários</Label>
                    <p className="text-sm text-muted-foreground">Novos usuários precisam de aprovação</p>
                  </div>
                  <Switch
                    checked={configuracoes.aprovarNovosUsuarios}
                    onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, aprovarNovosUsuarios: checked })}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessaoExpiraEm">Sessão Expira em (minutos)</Label>
                    <Input
                      id="sessaoExpiraEm"
                      type="number"
                      value={configuracoes.sessaoExpiraEm}
                      onChange={(e) => setConfiguracoes({ ...configuracoes, sessaoExpiraEm: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="senhaMinima">Tamanho Mínimo da Senha</Label>
                    <Input
                      id="senhaMinima"
                      type="number"
                      value={configuracoes.senhaMinima}
                      onChange={(e) => setConfiguracoes({ ...configuracoes, senhaMinima: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações de Notificações */}
          <TabsContent value="notificacoes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificações
                </CardTitle>
                <CardDescription>Configure quando e como receber notificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">Receber notificações por email</p>
                  </div>
                  <Switch
                    checked={configuracoes.notificacoesPorEmail}
                    onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, notificacoesPorEmail: checked })}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Notificar sobre:</h4>

                  <div className="flex items-center justify-between">
                    <Label>Nova Contribuição</Label>
                    <Switch
                      checked={configuracoes.notificarNovaContribuicao}
                      onCheckedChange={(checked) =>
                        setConfiguracoes({ ...configuracoes, notificarNovaContribuicao: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Nova Despesa</Label>
                    <Switch
                      checked={configuracoes.notificarNovaDespesa}
                      onCheckedChange={(checked) =>
                        setConfiguracoes({ ...configuracoes, notificarNovaDespesa: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Novo Membro</Label>
                    <Switch
                      checked={configuracoes.notificarNovoMembro}
                      onCheckedChange={(checked) =>
                        setConfiguracoes({ ...configuracoes, notificarNovoMembro: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Eventos</Label>
                    <Switch
                      checked={configuracoes.notificarEventos}
                      onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, notificarEventos: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações de Backup */}
          <TabsContent value="backup">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Backup Automático
                  </CardTitle>
                  <CardDescription>Configure backups automáticos do sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Backup Automático</Label>
                      <p className="text-sm text-muted-foreground">Realizar backups automaticamente</p>
                    </div>
                    <Switch
                      checked={configuracoes.backupAutomatico}
                      onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, backupAutomatico: checked })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Frequência do Backup</Label>
                    <Select
                      value={configuracoes.frequenciaBackup}
                      onValueChange={(value) => setConfiguracoes({ ...configuracoes, frequenciaBackup: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diario">Diário</SelectItem>
                        <SelectItem value="semanal">Semanal</SelectItem>
                        <SelectItem value="mensal">Mensal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Backup Manual</CardTitle>
                  <CardDescription>Realize backup ou restaure dados manualmente</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Button onClick={handleBackup} className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Fazer Backup Agora
                    </Button>
                    <Button variant="outline" onClick={handleRestore} className="flex-1 bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Restaurar Backup
                    </Button>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>Último backup: 15/12/2024 às 02:00</p>
                    <p>Próximo backup: 16/12/2024 às 02:00</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarProvider>
  )
}
