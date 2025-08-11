"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BookOpen, FileText, FolderOpen, Users, Plus, Bell, BellRing } from "lucide-react"

interface DashboardSectionProps {
  userData: { email: string; profileImage: string; isAdmin: boolean }
}

interface Publication {
  id: string
  title: string
  content: string
  date: string
  author: string
}

export default function DashboardSection({ userData }: DashboardSectionProps) {
  const [publications, setPublications] = useState<Publication[]>([])
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")
  const [showPublishForm, setShowPublishForm] = useState(false)
  const [vitrineAlert, setVitrineAlert] = useState(false)

  useEffect(() => {
    const savedPublications = localStorage.getItem("schoolPublications")
    const savedVitrineAlert = localStorage.getItem("vitrineAlert")

    if (savedPublications) {
      setPublications(JSON.parse(savedPublications))
    } else {
      // Publicações padrão se não houver nenhuma salva
      const defaultPublications = [
        {
          id: "1",
          title: "Novos materiais de Matemática",
          content: "Foram adicionados novos exercícios para a 10ª classe",
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          author: "Sistema",
        },
        {
          id: "2",
          title: "Exames de Física disponíveis",
          content: "Provas anteriores de Física da 12ª classe foram atualizadas",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          author: "Sistema",
        },
      ]
      setPublications(defaultPublications)
      localStorage.setItem("schoolPublications", JSON.stringify(defaultPublications))
    }

    if (savedVitrineAlert === "true") {
      setVitrineAlert(true)
    }
  }, [])

  const handlePublish = () => {
    if (!newTitle.trim() || !newContent.trim()) return

    const newPublication: Publication = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      date: new Date().toISOString(),
      author: userData.email.split("@")[0],
    }

    const updatedPublications = [newPublication, ...publications]
    setPublications(updatedPublications)
    localStorage.setItem("schoolPublications", JSON.stringify(updatedPublications))

    setNewTitle("")
    setNewContent("")
    setShowPublishForm(false)
  }

  const toggleVitrineAlert = () => {
    const newAlertState = !vitrineAlert
    setVitrineAlert(newAlertState)
    localStorage.setItem("vitrineAlert", newAlertState.toString())
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Há 1 dia"
    if (diffDays < 7) return `Há ${diffDays} dias`
    if (diffDays < 14) return "Há 1 semana"
    return `Há ${Math.ceil(diffDays / 7)} semanas`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            Bem-vindo, {userData.email.split("@")[0]}!
            {userData.isAdmin && <Badge variant="destructive">Administrador</Badge>}
          </h2>
          <p className="text-gray-600">Acesse os recursos educacionais da nossa escola virtual</p>
        </div>

        {userData.isAdmin && (
          <div className="flex gap-2">
            <Button
              onClick={toggleVitrineAlert}
              variant={vitrineAlert ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-2"
            >
              {vitrineAlert ? <BellRing className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
              Alerta Vitrine
            </Button>
            <Button onClick={() => setShowPublishForm(!showPublishForm)} size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nova Publicação
            </Button>
          </div>
        )}
      </div>

      {userData.isAdmin && showPublishForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Nova Publicação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Título da publicação" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <Textarea
              placeholder="Conteúdo da publicação"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={3}
            />
            <div className="flex gap-2">
              <Button onClick={handlePublish}>Publicar</Button>
              <Button variant="outline" onClick={() => setShowPublishForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-lg font-semibold mb-2">Livros</h3>
            <p className="text-sm text-gray-600">Acesse materiais didáticos de todas as classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-red-600" />
            <h3 className="text-lg font-semibold mb-2">Exames</h3>
            <p className="text-sm text-gray-600">Provas e exames das classes 9ª, 10ª e 12ª</p>
          </CardContent>
        </Card>

        <Card className={vitrineAlert ? "ring-2 ring-orange-500 ring-opacity-50" : ""}>
          <CardContent className="p-6 text-center">
            <div className="relative">
              <FolderOpen className="w-12 h-12 mx-auto mb-4 text-green-600" />
              {vitrineAlert && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
              Vitrine
              {vitrineAlert && <Bell className="w-4 h-4 text-orange-500" />}
            </h3>
            <p className="text-sm text-gray-600">
              Documentos e recursos administrativos
              {vitrineAlert && <span className="block text-orange-600 font-medium mt-1">Novos lançamentos!</span>}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-lg font-semibold mb-2">Comunidade</h3>
            <p className="text-sm text-gray-600">Conecte-se com outros estudantes</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Publicações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {publications.map((publication) => (
              <div key={publication.id} className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">{publication.title}</h4>
                <p className="text-sm text-gray-600">{publication.content}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">{formatDate(publication.date)}</span>
                  <span className="text-xs text-gray-500">Por: {publication.author}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
