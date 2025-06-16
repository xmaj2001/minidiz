import type React from "react"
import type { Metadata } from "next"
// import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"

// const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistema de Dízimos - Igreja",
  description: "Sistema de gerenciamento de dízimos e ofertas da igreja",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      {/* <body className={inter.className}> */}
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SidebarProvider defaultOpen={true}>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
