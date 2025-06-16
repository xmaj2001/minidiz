"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Delete, Edit, Trash } from "lucide-react"

const recentTithes = [
  {
    id: 1,
    member: "Maria Silva",
    amount: "R$ 450,00",
    date: "user@gmail.com",
    type: "Dízimo",
    status: "confirmed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    member: "João Santos",
    amount: "R$ 200,00",
    date: "user@gmail.com",
    type: "Oferta",
    status: "confirmed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    member: "Ana Costa",
    amount: "R$ 350,00",
    date: "user@gmail.com",
    type: "Dízimo",
    status: "pending",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    member: "Pedro Lima",
    amount: "R$ 150,00",
    date: "user@gmail.com",
    type: "Oferta",
    status: "confirmed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    member: "Carla Oliveira",
    amount: "R$ 500,00",
    date: "user@gmail.com",
    type: "Dízimo",
    status: "confirmed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function ListMembers() {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Membros</CardTitle>
        <CardDescription>Temos 40 membors no sistema</CardDescription>
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
                <Badge variant={"outline"} className="flex justify-center items-center gap-2">
                  <span>Editar</span>
                  <Edit size={18} color="green"/>
                </Badge>
                
                <Badge variant={"outline"} className="flex justify-center items-center gap-2">
                  <span>Apagar</span>
                  <Trash size={18} color="red"/>
                </Badge>
              </div>
              {/* <div className="text-sm font-medium">{tithe.amount}</div> */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
