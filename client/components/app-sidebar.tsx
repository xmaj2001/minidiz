"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Calendar,
  Church,
  Command,
  CreditCard,
  DollarSign,
  FileText,
  Frame,
  GalleryVerticalEnd,
  Gift,
  LayoutDashboard,
  Map,
  PieChart,
  PiggyBank,
  Settings,
  Settings2,
  SquareTerminal,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { NavContribution } from "./nav-contribution"

// This is sample data.
const data = {
  user: {
    name: "Dx",
    email: "i@x.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Maria Santa",
      logo: GalleryVerticalEnd,
      plan: "Luanda",
    },
    {
      name: "Maria Santa.",
      logo: AudioWaveform,
      plan: "Mussulo",
    },
    {
      name: "Maria Santa.",
      logo: Command,
      plan: "Kwanza-Sul",
    },
  ],
  contributions: [
    {
      title: "Contribuições",
      url: "/contribuicoes",
      icon: Wallet,
      isActive: true,
      items: [
        {
          title: "Dízimos",
          icon: Church,
          url: "/contribuicoes/dizimos",
        },
        {
          title: "Doações",
          icon: Gift,
          url: "/contribuicoes/doacoes",
        },
        {
          title: "Ofertas",
          icon: PiggyBank,
          url: "/contribuicoes/ofertas",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};


const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Receitas", url: "/receitas", icon: TrendingUp },
  { title: "Despesas", url: "/despesas", icon: DollarSign },
];

const managementItems = [
  { title: "Membros", url: "/membros", icon: Users },
  { title: "Eventos", url: "/eventos", icon: Calendar },
  { title: "Relatórios", url: "/relatorios", icon: FileText },
  { title: "Análises", url: "/analises", icon: PieChart },
];

const systemItems = [
  { title: "Contas Bancárias", url: "/contas", icon: CreditCard },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">
            Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      href={item.url}
                      
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavContribution items={data.contributions} />

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">
            Gerenciamento
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      href={item.url}
                      
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">
            Sistema
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      href={item.url}
                      
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* <NavMain items={data.navMain} /> */}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
