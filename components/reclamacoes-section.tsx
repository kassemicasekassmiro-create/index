"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Trash2 } from "lucide-react"

interface Reclamacao {
  id: string
  nome: string
  email: string
  assunto: string
  mensagem: string
  data: string
  status: "nova" | "lida"
}

interface ReclamacoesSectionProps {
  userData: { username: string; profileImage: string; isAdmin: boolean }
}

export default function ReclamacoesSection({ userData }: ReclamacoesSectionProps) {
  const [reclamacoes, setReclamacoes] = useState<Reclamacao[]>([])
  const [novaReclamacao, setNovaReclamacao] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  })
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    const savedReclamacoes = localStorage.getItem("schoolReclamacoes")
    if (savedReclamacoes) {
      setReclamacoes(JSON.parse(savedReclamacoes))
    }
  }, [])

  const salvarReclamacoes = (novasReclamacoes: Reclamacao[]) => {
    localStorage.setItem("schoolReclamacoes", JSON.stringify(novasReclamacoes))
    setReclamacoes(novasReclamacoes)
  }

  const enviarReclamacao = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!novaReclamacao.nome || !novaReclamacao.email || !novaReclamacao.assunto || !novaReclamacao.mensagem) {
      alert("Por favor, preencha todos os campos")
      return
    }

    setEnviando(true)

    const reclamacao: Reclamacao = {
      id: Date.now().toString(),
      nome: novaReclamacao.nome,
      email: novaReclamacao.email,
      assunto: novaReclamacao.assunto,
      mensagem: novaReclamacao.mensagem,
      data: new Date().toLocaleString("pt-BR"),
      status: "nova",
    }

    const novasReclamacoes = [reclamacao, ...reclamacoes]
    salvarReclamacoes(novasReclamacoes)

    setNovaReclamacao({ nome: "", email: "", assunto: "", mensagem: "" })
    setEnviando(false)
    alert("Reclamação enviada com sucesso!")
  }

  const marcarComoLida = (id: string) => {
    const novasReclamacoes = reclamacoes.map((rec) => (rec.id === id ? { ...rec, status: "lida" as const } : rec))
    salvarReclamacoes(novasReclamacoes)
  }

  const excluirReclamacao = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta reclamação?")) {
      const novasReclamacoes = reclamacoes.filter((rec) => rec.id !== id)
      salvarReclamacoes(novasReclamacoes)
    }
  }

  const reclamacoesNovas = reclamacoes.filter((rec) => rec.status === "nova").length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reclamações e Sugestões</h1>
        <p className="text-gray-600">
          {userData.isAdmin
            ? `Gerencie as reclamações dos usuários. ${reclamacoesNovas > 0 ? `${reclamacoesNovas} nova(s) reclamação(ões)` : "Nenhuma reclamação nova"}`
            : "Envie sua reclamação ou sugestão para o administrador"}
        </p>
      </div>

      {!userData.isAdmin ? (
        // Formulário para usuários normais
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Nova Reclamação
            </CardTitle>
            <CardDescription>Preencha o formulário abaixo para enviar sua reclamação ou sugestão</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={enviarReclamacao} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    value={novaReclamacao.nome}
                    onChange={(e) => setNovaReclamacao({ ...novaReclamacao, nome: e.target.value })}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={novaReclamacao.email}
                    onChange={(e) => setNovaReclamacao({ ...novaReclamacao, email: e.target.value })}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="assunto">Assunto</Label>
                <Input
                  id="assunto"
                  value={novaReclamacao.assunto}
                  onChange={(e) => setNovaReclamacao({ ...novaReclamacao, assunto: e.target.value })}
                  placeholder="Resumo da sua reclamação"
                  required
                />
              </div>

              <div>
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea
                  id="mensagem"
                  value={novaReclamacao.mensagem}
                  onChange={(e) => setNovaReclamacao({ ...novaReclamacao, mensagem: e.target.value })}
                  placeholder="Descreva detalhadamente sua reclamação ou sugestão..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" disabled={enviando} className="w-full">
                {enviando ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Reclamação
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        // Painel administrativo
        <div className="space-y-6">
          {reclamacoes.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma reclamação</h3>
                <p className="text-gray-600">Ainda não há reclamações enviadas pelos usuários.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {reclamacoes.map((reclamacao) => (
                <Card key={reclamacao.id} className={reclamacao.status === "nova" ? "border-blue-200 bg-blue-50" : ""}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{reclamacao.assunto}</CardTitle>
                        <CardDescription>
                          Por {reclamacao.nome} ({reclamacao.email}) • {reclamacao.data}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={reclamacao.status === "nova" ? "default" : "secondary"}>
                          {reclamacao.status === "nova" ? "Nova" : "Lida"}
                        </Badge>
                        {userData.isAdmin && (
                          <div className="flex gap-1">
                            {reclamacao.status === "nova" && (
                              <Button size="sm" variant="outline" onClick={() => marcarComoLida(reclamacao.id)}>
                                Marcar como Lida
                              </Button>
                            )}
                            <Button size="sm" variant="destructive" onClick={() => excluirReclamacao(reclamacao.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 whitespace-pre-wrap">{reclamacao.mensagem}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
