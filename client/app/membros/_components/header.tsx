import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

const stats = [
  {
    title: "Receitas do Mês",
    value: "R$ 45.231,00",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Despesas do Mês",
    value: "R$ 32.450,00",
    change: "-8.2%",
    trend: "down",
    icon: ArrowDownIcon,
  },
  {
    title: "Dízimos & Ofertas",
    value: "R$ 38.920,00",
    change: "+15.3%",
    trend: "up",
    icon: Wallet,
  },
];

export const HeaderMember = () => {
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3 mt-10">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="bg-primary hover:bg-white/10 transition-colors
       group
        "
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="">
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="flex items-center gap-1 text-xs">
              {stat.trend === "up" ? (
                <ArrowUpIcon className="h-3 w-3 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 text-red-500" />
              )}
              <span
                className={
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }
              >
                {stat.change}
              </span>
              <span className="text-muted-foreground">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
