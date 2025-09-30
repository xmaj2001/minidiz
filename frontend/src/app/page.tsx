import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, Users, Calendar, Heart, Gift, PiggyBank, TrendingDown, Plus } from "lucide-react"

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Financeiro</h1>
            <p className="text-muted-foreground">Visão geral das finanças da igreja</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Este Mês
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nova Entrada
            </Button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Total Arrecadado</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">R$ 45.231,89</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +20.1% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Dízimos</CardTitle>
              <Heart className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">R$ 28.450,00</div>
              <p className="text-xs text-muted-foreground">145 contribuições este mês</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Ofertas & Doações</CardTitle>
              <Gift className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">R$ 16.781,89</div>
              <p className="text-xs text-muted-foreground">89 contribuições este mês</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Membros Ativos</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">324</div>
              <p className="text-xs text-muted-foreground">+12 novos membros este mês</p>
            </CardContent>
          </Card>
        </div>

        {/* Seção de Atividades Recentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Contribuições Recentes</CardTitle>
              <CardDescription>Últimas entradas registradas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { tipo: "Dízimo", valor: "R$ 450,00", membro: "João Silva", data: "Hoje" },
                { tipo: "Oferta", valor: "R$ 200,00", membro: "Maria Santos", data: "Ontem" },
                { tipo: "Doação", valor: "R$ 1.500,00", membro: "Pedro Costa", data: "2 dias" },
                { tipo: "Dízimo", valor: "R$ 380,00", membro: "Ana Oliveira", data: "3 dias" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    {item.tipo === "Dízimo" && <Heart className="h-4 w-4 text-secondary" />}
                    {item.tipo === "Oferta" && <Gift className="h-4 w-4 text-accent" />}
                    {item.tipo === "Doação" && <PiggyBank className="h-4 w-4 text-primary" />}
                    <div>
                      <p className="font-medium text-card-foreground">{item.membro}</p>
                      <p className="text-sm text-muted-foreground">{item.tipo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-card-foreground">{item.valor}</p>
                    <p className="text-xs text-muted-foreground">{item.data}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Próximos Eventos</CardTitle>
              <CardDescription>Eventos programados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { nome: "Culto de Ação de Graças", data: "15 Dez", tipo: "Culto Especial" },
                { nome: "Reunião de Obreiros", data: "18 Dez", tipo: "Administrativa" },
                { nome: "Natal da Igreja", data: "24 Dez", tipo: "Celebração" },
                { nome: "Vigília de Ano Novo", data: "31 Dez", tipo: "Vigília" },
              ].map((evento, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium text-card-foreground">{evento.nome}</p>
                      <Badge variant="secondary" className="text-xs">
                        {evento.tipo}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-card-foreground">{evento.data}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Seção de Despesas */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-destructive" />
              Despesas do Mês
            </CardTitle>
            <CardDescription>Principais gastos registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { categoria: "Manutenção", valor: "R$ 2.450,00", descricao: "Reparos no telhado" },
                { categoria: "Utilidades", valor: "R$ 1.230,00", descricao: "Energia e água" },
                { categoria: "Materiais", valor: "R$ 890,00", descricao: "Material de limpeza" },
              ].map((despesa, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-card-foreground">{despesa.categoria}</h4>
                    <span className="font-semibold text-destructive">{despesa.valor}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{despesa.descricao}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
