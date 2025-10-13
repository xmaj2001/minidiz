"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { IContribution } from "@/lib/interfaces/contribution.interface";
import { TableContribution } from "./table-contributions";
import { TitheHero } from "./statsCards";
import { useState } from "react";
import { SearchMembers } from "./searchMembers";
import { useToast } from "@/hooks/use-toast";
import { Filter } from "./filter";

interface ContentInsetProps {
  data: IContribution[];
}

export default function ContentInset({ data }: ContentInsetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [mesFilter, setMesFilter] = useState("todos");
  const { toast } = useToast();

  // Filtrar dízimos
  const filteredData = data.filter((dizimo) => {
    const matchesSearch = (dizimo.member.nome + " " + dizimo.member.sobreNome)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "todos" || dizimo.status.toLowerCase() === statusFilter;
    // TODO: Aplicar filtro de mes
    // const matchesMes =
    //   mesFilter === "todos" || dizimo.referencia.includes(mesFilter);

    return matchesSearch && matchesStatus;
    // && matchesMes;
  });

  // Calcular estatísticas
  const totalDizimos = data.reduce(
    (total, dizimo) => total + Number(dizimo.valor),
    0
  );
  const mediaDizimo = totalDizimos / data.length;
  const dizimosConfirmados = data.filter((d) => d.status === "RECEBIDO").length;
  const dizimistasMes = new Set(data.map((d) => d.member)).size;
  
  const handleEdit = (membro: IContribution) => {};
  const handleDelete = (id: number) => {};

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex w-full gap-2 px-4">
          <DashboardHeader />
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <TitheHero
          data={filteredData}
          confirmadas={dizimosConfirmados}
          media={mediaDizimo}
          total={totalDizimos}

        />

        <Filter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
        />

        <TableContribution
          data={filteredData}
          onEdit={handleEdit}
          oneDelete={handleDelete}
        />
      </div>

      {/* Drawer isolado */}
      <Drawer open={isOpen} direction="bottom" onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button className="fixed bottom-14 right-14">
            <Plus />
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <SearchMembers setOpenDialog={setIsOpen} />
        </DrawerContent>
      </Drawer>
    </SidebarInset>
  );
}
