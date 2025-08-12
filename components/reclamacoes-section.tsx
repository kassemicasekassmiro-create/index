"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Trash2 } from "lucide-react"

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
            : "Envie sua reclamação ou sugestão através do formulário abaixo"}
        </p>
      </div>

      {!userData.isAdmin ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Formulário de Reclamações
            </CardTitle>
            <CardDescription>Preencha o formulário abaixo para enviar sua reclamação ou sugestão</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full" style={{ paddingBottom: "75%", height: 0 }}>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSf7pBxGF4Pcu9H5uxRv919YaK0IWfohjzNc6jSVKLYuHs8rvQ/viewform?embedded=true"
                className="absolute top-0 left-0 w-full h-full border-0 rounded-b-lg"
                title="Formulário de Reclamações"
                allowFullScreen
              >
                Carregando…
              </iframe>
            </div>
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
