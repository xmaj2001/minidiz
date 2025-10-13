"use client";

import React from "react";
import { motion } from "framer-motion";

import {
  PiggyBank,
  TrendingUp,
  DollarSign,
  Calendar,
  ImageIcon,
  Gift,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IListaContributions } from "@/lib/interfaces/contribution.interface";

interface TitheHeroProps {
  data: IListaContributions;
  total: number;
  media: number;
  Imagens: number;
  confirmadas: number;
}

export const TitheHero = ({
  data,
  total,
  media,
  Imagens,
  confirmadas,
}: TitheHeroProps) => {
  return (
    <div className="rounded-2xl shadow-2xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center border-b border-gray-700 py-4"
      >
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-500">
          Visão Geral dos Ofertas
        </h1>
        <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-purple-600 transition duration-300">
          <PiggyBank className="w-5 h-5 mr-2" />
          Registrar Novo Oferta
        </button>
      </motion.div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Arrecadado
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {total.toLocaleString("pt-AO", {
                style: "currency",
                currency: "AOA",
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              Este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Média por Oferta
            </CardTitle>
            <Gift className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {media.toLocaleString("pt-AO", {
                style: "currency",
                currency: "AOA",
              })}
            </div>
            <p className="text-xs text-muted-foreground">Valor médio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ofertas com Imagem
            </CardTitle>
            <ImageIcon className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Imagens}</div>
            <p className="text-xs text-muted-foreground">Objetos doados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confirmadas}</div>
            <p className="text-xs text-muted-foreground">
              de {data.length} registros
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
