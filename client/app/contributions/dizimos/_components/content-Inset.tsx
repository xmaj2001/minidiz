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

interface ContentInsetProps {
  data: IContribution[];
}

export default function ContentInset({ data }: ContentInsetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleEdit = (membro: IContribution) => {};
  const handleDelete = (id: number) => {};

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex w-full gap-2 px-4">
          <DashboardHeader />
        </div>
      </header>

      <TitheHero data={data} />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <TableContribution
          data={data}
          onEdit={handleEdit}
          oneDelete={handleDelete}
        />
      </div>

      {/* Drawer isolado */}
      <Drawer open={isOpen} direction="bottom" onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button className="absolute bottom-14 right-14">
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
