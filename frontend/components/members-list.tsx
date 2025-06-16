"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatMony } from "@/lib/utils";

interface Contributor {
  name: string,
  totalAmount: string,
  frequency: string,
  status: "regular" | "irregular",
  avatar: "/placeholder.svg?height=32&width=32",
}

interface ContributorBruto {
  id: number;
  name: string;
  totalContributed: number;
  frequency: number;
}

interface TopContributorsProps {
  contributors: ContributorBruto[];
}

const getFrequency = (value: number) => {
  return (value < 12 ? 'irregular' : 'regular')
}
// const topMembers = [
//   {
//     name: "Maria Silva",
//     totalAmount: "R$ 5.400,00",
//     frequency: "12/12",
//     status: "regular",
//     avatar: "/placeholder.svg?height=32&width=32",
//   },
//   {
//     name: "João Santos",
//     totalAmount: "R$ 4.800,00",
//     frequency: "11/12",
//     status: "regular",
//     avatar: "/placeholder.svg?height=32&width=32",
//   },
//   {
//     name: "Ana Costa",
//     totalAmount: "R$ 4.200,00",
//     frequency: "12/12",
//     status: "regular",
//     avatar: "/placeholder.svg?height=32&width=32",
//   },
//   {
//     name: "Pedro Lima",
//     totalAmount: "R$ 3.600,00",
//     frequency: "10/12",
//     status: "irregular",
//     avatar: "/placeholder.svg?height=32&width=32",
//   },
//   {
//     name: "Carla Oliveira",
//     totalAmount: "R$ 6.000,00",
//     frequency: "12/12",
//     status: "regular",
//     avatar: "/placeholder.svg?height=32&width=32",
//   },
// ]

const loadingContributors = (contributorsBruto: ContributorBruto[]) => {
  const contributors: Contributor[] = []
  contributorsBruto.map((i) => {
    contributors.push({
      name: i.name,
      totalAmount: formatMony(i.totalContributed),
      frequency: `${i.frequency}/12`,
      status: getFrequency(i.frequency),
      avatar: "/placeholder.svg?height=32&width=32"
    })
  })
  return (contributors)
}

export function MembersList({contributors}: TopContributorsProps) {
  const topMembers = loadingContributors(contributors)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Principais Contribuintes</CardTitle>
        <CardDescription>Membros com maior contribuição no ano</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topMembers.map((member, index) => (
            <div key={member.name} className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-xs font-medium">
                {index + 1}
              </div>
              <Avatar className="h-9 w-9">
                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{member.name}</p>
                <p className="text-xs text-muted-foreground">Frequência: {member.frequency}</p>
              </div>
              <div className="text-right space-y-1">
                <div className="text-sm font-medium">{member.totalAmount}</div>
                <Badge
                  variant={member.status === "regular" ? "default" : "secondary"}
                  className={member.status === "regular" ? "bg-green-600" : ""}
                >
                  {member.status === "regular" ? "Regular" : "Irregular"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
