"use client"

import { Button } from "@/components/ui/button"
import { LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  userData: { username: string; profileImage: string; isAdmin: boolean }
  currentSection: string
  onSectionChange: (section: string) => void
  onLogout: () => void
}

export default function Header({ userData, currentSection, onSectionChange, onLogout }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSectionChange = (section: string) => {
    onSectionChange(section)
    setIsMobileMenuOpen(false) // Close mobile menu when section changes
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Escola Virtual</h1>
          </div>

          <nav className="hidden md:flex space-x-4">
            <Button
              variant={currentSection === "dashboard" ? "default" : "ghost"}
              onClick={() => onSectionChange("dashboard")}
              size="sm"
            >
              Dashboard
            </Button>
            <Button
              variant={currentSection === "vitrine" ? "default" : "ghost"}
              onClick={() => onSectionChange("vitrine")}
              size="sm"
            >
              Vitrine
            </Button>
            <Button
              variant={currentSection === "livros" ? "default" : "ghost"}
              onClick={() => onSectionChange("livros")}
              size="sm"
            >
              Livros
            </Button>
            <Button
              variant={currentSection === "reclamacoes" ? "default" : "ghost"}
              onClick={() => onSectionChange("reclamacoes")}
              size="sm"
            >
              Reclamações
            </Button>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <img
                src={userData.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm text-gray-700 max-w-24 truncate">{userData.username}</span>
            </div>

            <div className="sm:hidden">
              <img
                src={userData.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>

            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              <Button
                variant={currentSection === "dashboard" ? "default" : "ghost"}
                onClick={() => handleSectionChange("dashboard")}
                className="w-full justify-start"
                size="sm"
              >
                Dashboard
              </Button>
              <Button
                variant={currentSection === "vitrine" ? "default" : "ghost"}
                onClick={() => handleSectionChange("vitrine")}
                className="w-full justify-start"
                size="sm"
              >
                Vitrine
              </Button>
              <Button
                variant={currentSection === "livros" ? "default" : "ghost"}
                onClick={() => handleSectionChange("livros")}
                className="w-full justify-start"
                size="sm"
              >
                Livros
              </Button>
              <Button
                variant={currentSection === "reclamacoes" ? "default" : "ghost"}
                onClick={() => handleSectionChange("reclamacoes")}
                className="w-full justify-start"
                size="sm"
              >
                Reclamações
              </Button>

              <div className="pt-2 border-t mt-2">
                <div className="flex items-center space-x-2 px-3 py-2">
                  <img
                    src={userData.profileImage || "/placeholder.svg"}
                    alt="Profile"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-700">{userData.username}</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
