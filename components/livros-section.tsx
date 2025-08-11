"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { driveLinks, examLinks } from "@/lib/drive-links"
import { BookOpen, FileText, ExternalLink } from "lucide-react"

export default function LivrosSection() {
  const [activeTab, setActiveTab] = useState<"exames" | "livros">("livros")
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const classes = Object.keys(driveLinks)
  const examClasses = ["9", "10", "12"]

  const handleSubjectClick = (driveUrl: string) => {
    window.open(driveUrl, "_blank")
  }

  const handleExamClick = (classNumber: string) => {
    const examUrl = examLinks[classNumber as keyof typeof examLinks]
    window.open(examUrl, "_blank")
  }

  const renderLivrosContent = () => {
    if (!selectedClass) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {classes.map((classNum) => (
            <Card
              key={classNum}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedClass(classNum)}
            >
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold">{classNum}ª Classe</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }

    const subjects = Object.keys(driveLinks[selectedClass as keyof typeof driveLinks])

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">{selectedClass}ª Classe - Disciplinas</h3>
          <Button variant="outline" onClick={() => setSelectedClass(null)}>
            Voltar às Classes
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <Card
              key={subject}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleSubjectClick(driveLinks[selectedClass as keyof typeof driveLinks][subject])}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800">{subject}</h4>
                    <p className="text-sm text-gray-600">Clique para acessar materiais</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const renderExamesContent = () => {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-6">Classes com Exames Nacionais</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {examClasses.map((classNum) => (
            <Card
              key={classNum}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleExamClick(classNum)}
            >
              <CardContent className="p-6 text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 text-red-600" />
                <h4 className="text-lg font-semibold mb-2">{classNum}ª Classe</h4>
                <p className="text-sm text-gray-600 mb-4">Exames Nacionais</p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Acessar Exames
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Biblioteca Escolar</h2>

        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === "livros" ? "default" : "outline"}
            onClick={() => {
              setActiveTab("livros")
              setSelectedClass(null)
            }}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Livros
          </Button>
          <Button
            variant={activeTab === "exames" ? "default" : "outline"}
            onClick={() => {
              setActiveTab("exames")
              setSelectedClass(null)
            }}
          >
            <FileText className="w-4 h-4 mr-2" />
            Exames
          </Button>
        </div>
      </div>

      {activeTab === "livros" ? renderLivrosContent() : renderExamesContent()}
    </div>
  )
}
