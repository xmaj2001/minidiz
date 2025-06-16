"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatMony, getMonth } from "@/lib/utils";

interface MonthlyChartProps {
  monthlyData: Array<{
    year: number;
    month: number;
    total: number;
    goal: number;
    percentage: number;
  }>;
}

// const monthlyData = [
//   { month: "Jan", amount: 35000, target: 40000 },
//   { month: "Fev", amount: 42000, target: 40000 },
//   { month: "Mar", amount: 38000, target: 40000 },
//   { month: "Abr", amount: 45000, target: 40000 },
//   { month: "Mai", amount: 41000, target: 40000 },
//   { month: "Jun", amount: 47000, target: 40000 },
// ]


const getColorStatesMeta = (percentage: number) => {
  if (percentage < 100)
    return ("text-red-600 dark:text-red-400")
  else if (percentage == 100)
    return ("")
  else if (percentage > 100)
    return ("text-green-600 dark:text-green-400")
}
export function MonthlyChart({ monthlyData }: MonthlyChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Arrecadação Mensal</CardTitle>
        <CardDescription>Comparativo de arrecadação vs meta mensal</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {monthlyData.map((data) => {
            const percentage = (data.total / data.goal) * 100
            return (
              <div key={data.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium capitalize">{getMonth(data.month)}</span>
                  <span className="text-muted-foreground">
                    {formatMony(data.total)} / {formatMony(data.goal)}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
                <div className={`text-xs text-muted-foreground ${getColorStatesMeta(percentage)}`}>
                  {percentage > 100 && "+"}
                  {percentage.toFixed(1)}% da meta
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
