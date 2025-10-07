"use client"; 

import React from "react";
import { motion } from "framer-motion";

import { PiggyBank, Users, TrendingUp, DollarSign, Heart, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IListaContributions } from "@/lib/interfaces/contribution.interface";

interface TitheHeroProps {
  data: IListaContributions;
}

export const TitheHero = ({ data }:TitheHeroProps) => {

  return (
    <div className="p-4 rounded-2xl shadow-2xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center border-b border-gray-700 pb-4"
      >
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-500">
          Visão Geral dos Dízimos
        </h1>
        <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-purple-600 transition duration-300">
          <PiggyBank className="w-5 h-5 mr-2" />
          Registrar Novo Dízimo
        </button>
      </motion.div>

      {/* Cards de Estatísticas */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Arrecadado
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.length.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              Este mês
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Média por Dízimo
            </CardTitle>
            <Heart className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.length.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
            <p className="text-xs text-muted-foreground">Valor médio</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dizimistas Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{}</div>
            <p className="text-xs text-muted-foreground">
              Membros contribuindo
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{}</div>
            <p className="text-xs text-muted-foreground">
              de {data.length} registros
            </p>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
};
