"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, FileText, FolderOpen, Users, Bell, BellRing } from "lucide-react"

interface DashboardSectionProps {
  userData: { email: string; profileImage: string; isAdmin: boolean }
}

export default function DashboardSection({ userData }: DashboardSectionProps) {
  const [vitrineAlert, setVitrineAlert] = useState(false)

  useEffect(() => {
    const savedVitrineAlert = localStorage.getItem("vitrineAlert")
    if (savedVitrineAlert === "true") {
      setVitrineAlert(true)
    }
  }, [])

  const toggleVitrineAlert = () => {
    const newAlertState = !vitrineAlert
    setVitrineAlert(newAlertState)
    localStorage.setItem("vitrineAlert", newAlertState.toString())
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 flex flex-col sm:flex-row sm:items-center gap-2">
            <span>Bem-vindo, {userData.email.split("@")[0]}!</span>
            {userData.isAdmin && <Badge variant="destructive">Administrador</Badge>}
          </h2>
          <p className="text-sm sm:text-base text-gray-600">Acesse os recursos educacionais da nossa escola virtual</p>
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
              <span className="hidden sm:inline">Alerta Vitrine</span>
              <span className="sm:hidden">Alerta</span>
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardContent className="p-3 sm:p-6 text-center">
            <BookOpen className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-2 sm:mb-4 text-blue-600" />
            <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">Livros</h3>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
              Acesse materiais didáticos de todas as classes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-6 text-center">
            <FileText className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-2 sm:mb-4 text-red-600" />
            <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">Exames</h3>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
              Provas e exames das classes 9ª, 10ª e 12ª
            </p>
          </CardContent>
        </Card>

        <Card className={vitrineAlert ? "ring-2 ring-orange-500 ring-opacity-50" : ""}>
          <CardContent className="p-3 sm:p-6 text-center">
            <div className="relative">
              <FolderOpen className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-2 sm:mb-4 text-green-600" />
              {vitrineAlert && (
                <div className="absolute -top-1 -right-1 w-2 sm:w-3 h-2 sm:h-3 bg-orange-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2 flex items-center justify-center gap-1 sm:gap-2">
              Vitrine
              {vitrineAlert && <Bell className="w-3 sm:w-4 h-3 sm:h-4 text-orange-500" />}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
              Documentos e recursos administrativos
              {vitrineAlert && <span className="block text-orange-600 font-medium mt-1">Novos lançamentos!</span>}
            </p>
            {vitrineAlert && <span className="block sm:hidden text-xs text-orange-600 font-medium">Novo!</span>}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-6 text-center">
            <Users className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-2 sm:mb-4 text-purple-600" />
            <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">Comunidade</h3>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Conecte-se com outros estudantes</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-b-lg">
            <iframe
              src="https://docs.google.com/document/d/1fH1QU5mneyOLZ3tKsy7Bat_UT0cpWdf4DG14QekrXF0/edit?usp=sharing"
              width="100%"
              height="600"
              className="border-0 sm:h-[800px]"
              title="Publicações da Escola"
              style={{
                marginTop: "-80px",
                marginLeft: "-10px",
                marginRight: "-10px",
                width: "calc(100% + 20px)",
                height: "680px",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, white 0px, transparent 80px, transparent calc(100% - 40px), white 100%)",
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
