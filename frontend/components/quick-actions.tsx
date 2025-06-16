"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Users, Calendar, DollarSign, Settings } from "lucide-react"

const quickActions = [
  {
    title: "Registrar Dízimo",
    description: "Adicionar nova contribuição",
    icon: Plus,
    action: "register-tithe",
  },
  {
    title: "Novo Membro",
    description: "Cadastrar novo membro",
    icon: Users,
    action: "new-member",
  },
  {
    title: "Gerar Relatório",
    description: "Relatório mensal",
    icon: FileText,
    action: "generate-report",
  },
  {
    title: "Agendar Evento",
    description: "Novo evento no calendário",
    icon: Calendar,
    action: "schedule-event",
  },
  {
    title: "Campanha",
    description: "Nova campanha de arrecadação",
    icon: DollarSign,
    action: "new-campaign",
  },
  {
    title: "Configurações",
    description: "Ajustar configurações",
    icon: Settings,
    action: "settings",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
        <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.action}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-primary/5"
            >
              <action.icon className="h-5 w-5" />
              <div className="text-center">
                <div className="text-xs font-medium">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
