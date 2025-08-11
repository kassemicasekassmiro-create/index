"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

interface HeaderProps {
  userData: { username: string; profileImage: string; isAdmin: boolean }
  currentSection: string
  onSectionChange: (section: string) => void
  onLogout: () => void
}

export default function Header({ userData, currentSection, onSectionChange, onLogout }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-900">Escola Virtual</h1>

            <nav className="flex space-x-4">
              <Button
                variant={currentSection === "dashboard" ? "default" : "ghost"}
                onClick={() => onSectionChange("dashboard")}
              >
                Dashboard
              </Button>
              <Button
                variant={currentSection === "vitrine" ? "default" : "ghost"}
                onClick={() => onSectionChange("vitrine")}
              >
                Vitrine
              </Button>
              <Button
                variant={currentSection === "livros" ? "default" : "ghost"}
                onClick={() => onSectionChange("livros")}
              >
                Livros
              </Button>
              <Button
                variant={currentSection === "reclamacoes" ? "default" : "ghost"}
                onClick={() => onSectionChange("reclamacoes")}
              >
                Reclamações
              </Button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src={userData.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm text-gray-700">{userData.username}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
