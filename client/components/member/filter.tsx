import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid, List, Search } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface FilterMemberProps {
  viewMode: "Table" | "Card";
  onSelectViewMode: () => void;
}
export const FilterMember = ({
  viewMode,
  onSelectViewMode,
}: FilterMemberProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Card className="bg-transparent shadown-none border-none p-0 ">
      <CardHeader>
        <CardTitle>Lista de Membros</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <Button size={"icon-sm"} onClick={() => onSelectViewMode()}>
            {viewMode == "Table" ? <List /> : <Grid />}
          </Button>
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Button size={"sm"}>
            {"Aplicar filtro"}
          </Button>

          {/* <Select value={grupoFilter} onValueChange={setGrupoFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Grupo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Grupos</SelectItem>
              <SelectItem value="jovens">Jovens</SelectItem>
              <SelectItem value="mulheres">Mulheres</SelectItem>
              <SelectItem value="homens">Homens</SelectItem>
              
            </SelectContent>
          </Select> */}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <h1 className="text-lg text-muted-foreground">Filtros</h1>
        <div className="flex gap-2 items-center">
          <p>Genero: </p>
          <Select defaultValue="all">
            <SelectTrigger className="bg-transparent shadown-none border-none">
              <SelectValue placeholder="Genero" defaultValue={"all"} />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="F">Femenino</SelectItem>
              <SelectItem value="M">Masculino</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 items-center">
          <p>Estado de batismo: </p>
          <Select defaultValue="all">
            <SelectTrigger className="bg-transparent shadown-none border-none">
              <SelectValue
                placeholder="Estado de batismo"
                defaultValue={"all"}
              />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="B">Batizados</SelectItem>
              <SelectItem value="NB">Não batizados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 items-center">
          <p>Paróquia: </p>
          <Select defaultValue="todos">
            <SelectTrigger className="bg-transparent shadown-none border-none">
              <SelectValue placeholder="Paróquia" defaultValue={"todos"} />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="todos">Todas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 items-center">
          <p>Grupo: </p>
          <Select defaultValue="todos">
            <SelectTrigger className="bg-transparent shadown-none border-none">
              <SelectValue placeholder="Grupo" defaultValue={"todos"} />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="jovens">Jovens</SelectItem>
              <SelectItem value="mulheres">Mulheres</SelectItem>
              <SelectItem value="homens">Homens</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardFooter>
    </Card>
  );
};
