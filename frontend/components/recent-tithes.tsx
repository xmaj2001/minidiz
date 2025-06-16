"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentTithes = [
  {
    id: 1,
    member: "Maria Silva",
    amount: "R$ 450,00",
    date: "Hoje, 14:30",
    type: "Dízimo",
    status: "confirmed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    member: "João Santos",
    amount: "R$ 200,00",
    date: "Hoje, 10:15",
    type: "Oferta",
    status: "confirmed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    member: "Ana Costa",
    amount: "R$ 350,00",
    date: "Ontem, 19:45",
    type: "Dízimo",
    status: "pending",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    member: "Pedro Lima",
    amount: "R$ 150,00",
    date: "Ontem, 16:20",
    type: "Oferta",
    status: "confirmed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    member: "Carla Oliveira",
    amount: "R$ 500,00",
    date: "2 dias atrás",
    type: "Dízimo",
    status: "confirmed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function RecentTithes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contribuições Recentes</CardTitle>
        <CardDescription>Últimas contribuições registradas no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTithes.map((tithe) => (
            <div key={tithe.id} className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={tithe.avatar || "/placeholder.svg"} alt={tithe.member} />
                <AvatarFallback>
                  {tithe.member
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{tithe.member}</p>
                <p className="text-sm text-muted-foreground">{tithe.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={tithe.type === "Dízimo" ? "default" : "secondary"}>{tithe.type}</Badge>
                <Badge
                  variant={tithe.status === "confirmed" ? "default" : "outline"}
                  className={tithe.status === "confirmed" ? "bg-green-600" : ""}
                >
                  {tithe.status === "confirmed" ? "Confirmado" : "Pendente"}
                </Badge>
              </div>
              <div className="text-sm font-medium">{tithe.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
