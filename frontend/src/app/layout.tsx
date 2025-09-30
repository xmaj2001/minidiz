import type React from "react"
import type { Metadata } from "next"

import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sistema Financeiro - Igreja",
  description: "Sistema completo para gestão financeira da igreja",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>

      </body>
    </html>
  )
}
