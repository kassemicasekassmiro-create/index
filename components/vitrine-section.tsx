"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileSpreadsheet } from "lucide-react"
import { vitrineLink } from "@/lib/drive-links"

export default function VitrineSection() {
  const handleVitrineClick = () => {
    // SUBSTITUA O LINK ABAIXO PELO SEU DRIVE DA VITRINE
    window.open(vitrineLink, "_blank")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Vitrine Escolar</h2>
        <p className="text-lg text-gray-600">Acesse documentos, planilhas e recursos administrativos da escola</p>
      </div>

      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <FileSpreadsheet className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <CardTitle className="text-xl">Documentos da Escola</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              Clique para acessar a pasta com documentos Excel e outros recursos administrativos
            </p>
            <Button onClick={handleVitrineClick} className="w-full font-bold" size="lg">
              <ExternalLink className="w-5 h-5 mr-2" />
              Acessar Vitrine
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
