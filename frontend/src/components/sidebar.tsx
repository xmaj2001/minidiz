"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  Users,
  UsersRound,
  TrendingDown,
  Calendar,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Church,
  Heart,
  Gift,
  PiggyBank,
  UserCog,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Membros",
    href: "/membros",
    icon: Users,
  },
  {
    name: "Grupos",
    href: "/grupos",
    icon: UsersRound,
  },
  {
    name: "Contribuições",
    href: "/contribuicoes",
    icon: Heart,
    children: [
      { name: "Dízimos", href: "/contribuicoes/dizimos", icon: Church },
      { name: "Ofertas", href: "/contribuicoes/ofertas", icon: Gift },
      { name: "Doações", href: "/contribuicoes/doacoes", icon: PiggyBank },
    ],
  },
  {
    name: "Despesas",
    href: "/despesas",
    icon: TrendingDown,
  },
  {
    name: "Eventos",
    href: "/eventos",
    icon: Calendar,
  },
  {
    name: "Usuários",
    href: "/usuarios",
    icon: UserCog,
  },
  {
    name: "Relatórios",
    href: "/relatorios",
    icon: FileText,
  },
  {
    name: "Logs",
    href: "/logs",
    icon: FileText,
  },
  {
    name: "Configurações",
    href: "/configuracoes",
    icon: Settings,
  },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Church className="h-8 w-8 text-sidebar-primary" />
            <div>
              <h1 className="font-semibold text-sidebar-foreground">Igreja</h1>
              <p className="text-xs text-sidebar-foreground/70">Sistema Financeiro</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent/10"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  "hover:bg-sidebar-accent/10 hover:text-sidebar-accent-foreground",
                  pathname === item.href
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground",
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>

              {/* Submenu para Contribuições */}
              {item.children && !collapsed && pathname.startsWith("/contribuicoes") && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors",
                        "hover:bg-sidebar-accent/10 hover:text-sidebar-accent-foreground",
                        pathname === child.href
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/70",
                      )}
                    >
                      <child.icon className="h-3 w-3" />
                      <span>{child.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-foreground/50 text-center">© 2024 Sistema Igreja</div>
        </div>
      )}
    </div>
  )
}
