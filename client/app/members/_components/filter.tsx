import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface FilterMemberProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
}
export const FilterMember = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}: FilterMemberProps) => {
  return (
    <Card className="shadow-none rounded-none border-none">
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
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

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Status</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>

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
    </Card>
  );
};
