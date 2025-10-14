"use client";

import React from "react";

import {
  DollarSign,
  Receipt,
  TrendingDown,
  CalendarIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardsProps {
  total: number;
  pagas: {
    amount: number;
    count: number;
  };
  pendentes: {
    amount: number;
    count: number;
  };
  despesasPorCategoria: Record<string, number>;
  length: number;
}

export const StatsCards = ({
  total,
  pagas,
  pendentes,
  length,
  despesasPorCategoria,
}: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Despesas
          </CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">
            {total.toLocaleString("pt-AO", {
              style: "currency",
              currency: "AOA",
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            {length} despesas registradas
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Despesas Pagas</CardTitle>
          <DollarSign className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {pagas.amount.toLocaleString("pt-AO", {
              style: "currency",
              currency: "AOA",
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            {pagas.count} despesas pagas
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Despesas Pendentes
          </CardTitle>
          <CalendarIcon className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">
            {pendentes.amount.toLocaleString("pt-AO", {
              style: "currency",
              currency: "AOA",
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            {pendentes.count} despesas pendentes
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Maior Categoria</CardTitle>
          <Receipt className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {
              Object.keys(despesasPorCategoria).length === 0 ? "N/A" : ""
            }
          </div>
          <p className="text-xs text-muted-foreground">
            Categoria com mais gastos
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
