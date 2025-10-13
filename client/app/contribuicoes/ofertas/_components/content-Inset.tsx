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
import { Filter } from "./filter";

interface ContentInsetProps {
  data: IContribution[];
}

export default function ContentInset({ data }: ContentInsetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  // Filtrar dízimos
  const filteredData = data.filter((i) => {
    const matchesSearch = (i.member.nome + " " + i.member.sobreNome)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "todos" || i.status.toLowerCase() === statusFilter;
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
  const media = totalDizimos / data.length;
  const confirmados = data.filter((d) => d.status === "RECEBIDO").length;
  //  const dizimistasMes = new Set(data.map((d) => d.member)).size;

  const handleEdit = (membro: IContribution) => {
    console.log("Editar contribuição:", membro);
  };
  const handleDelete = (id: number) => {
    console.log("Deletar contribuição com ID:", id);
  };

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
          media={media}
          confirmadas={confirmados}
          total={totalDizimos}
          Imagens={0} // TODO: calcular total de ofertas com imagens
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
