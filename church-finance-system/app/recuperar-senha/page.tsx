"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Church, Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("")
  const [enviado, setEnviado] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")

  const handleRecuperarSenha = async (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setErro("")

    try {
      // Simular envio de email
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setEnviado(true)
    } catch (error) {
      setErro("Erro ao enviar email. Tente novamente.")
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo e Título */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Church className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sistema Igreja</h1>
            <p className="text-muted-foreground">Recuperação de Senha</p>
          </div>
        </div>

        {/* Formulário de Recuperação */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-semibold">{enviado ? "Email Enviado!" : "Recuperar Senha"}</CardTitle>
            <CardDescription>
              {enviado
                ? "Verifique sua caixa de entrada para redefinir sua senha"
                : "Digite seu email para receber as instruções de recuperação"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {enviado ? (
              <div className="space-y-4">
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Um email com instruções para redefinir sua senha foi enviado para <strong>{email}</strong>
                  </AlertDescription>
                </Alert>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Verifique sua caixa de entrada e spam</p>
                  <p>• O link expira em 24 horas</p>
                  <p>• Se não receber, tente novamente</p>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={() => {
                      setEnviado(false)
                      setEmail("")
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Enviar Novamente
                  </Button>
                  <Link href="/login">
                    <Button variant="ghost" className="w-full">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Voltar ao Login
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRecuperarSenha} className="space-y-4">
                {erro && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">{erro}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      disabled={carregando}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={carregando}>
                  {carregando ? "Enviando..." : "Enviar Instruções"}
                </Button>

                <Link href="/login">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar ao Login
                  </Button>
                </Link>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          © 2024 Sistema Igreja. Todos os direitos reservados.
        </div>
      </div>
    </div>
  )
}
