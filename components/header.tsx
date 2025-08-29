"use client"

import { Button } from "@/components/ui/button"
import { LogOut, Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  userData: { username: string; profileImage: string; isAdmin: boolean }
  currentSection: string
  onSectionChange: (section: string) => void
  onLogout: () => void
}

export default function Header({ userData, currentSection, onSectionChange, onLogout }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAppDropdownOpen, setIsAppDropdownOpen] = useState(false)
  const [clickedOption, setClickedOption] = useState<string | null>(null)

  const handleSectionChange = (section: string) => {
    onSectionChange(section)
    setIsMobileMenuOpen(false) // Close mobile menu when section changes
  }

  const handleAppOptionClick = (option: string, url: string) => {
    setClickedOption(option)
    setIsAppDropdownOpen(false)
    window.open(url, "_blank")
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Escola Virtual</h1>
            <div className="hidden sm:block relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAppDropdownOpen(!isAppDropdownOpen)}
                className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 border-blue-200"
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e-learning-9xz1FerTojzQON4b44658Ti6gGHZUD.png"
                  alt="Aplicativo"
                  className="w-4 h-4"
                />
                <span className="text-xs text-blue-700 font-medium">baixe o nosso app</span>
                <ChevronDown className="w-3 h-3 text-blue-700" />
              </Button>

              {isAppDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <a
                    href="https://www.webintoapp.com/store/877035"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-2 py-2 hover:bg-blue-50 transition-colors duration-200"
                    onClick={() => setIsAppDropdownOpen(false)}
                  >
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e-learning-9xz1FerTojzQON4b44658Ti6gGHZUD.png"
                      alt="App Principal"
                      className="w-4 h-4"
                    />
                    <span className="text-xs text-blue-700 font-medium">
                      Baixe também nossa app na página web principal
                    </span>
                  </a>
                  <a
                    href="https://drive.google.com/embeddedfolderview?id=1UfLvjvJyj2mLuxetJj8yFrkWWrXSvdTy#grid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-2 py-2 hover:bg-green-50 transition-colors duration-200"
                    onClick={() => setIsAppDropdownOpen(false)}
                  >
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e-learning-9xz1FerTojzQON4b44658Ti6gGHZUD.png"
                      alt="App Externo"
                      className="w-4 h-4"
                    />
                    <span className="text-xs text-green-700 font-medium">Baixe também na página externa</span>
                  </a>
                </div>
              )}
            </div>
            <div className="block sm:hidden relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAppDropdownOpen(!isAppDropdownOpen)}
                className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 border-blue-200"
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e-learning-9xz1FerTojzQON4b44658Ti6gGHZUD.png"
                  alt="Aplicativo"
                  className="w-4 h-4"
                />
                <span className="text-xs text-blue-700 font-medium">
                  {clickedOption ? `Baixar ${clickedOption}` : "baixe o nosso app"}
                </span>
                <ChevronDown className="w-3 h-3 text-blue-700" />
              </Button>

              {isAppDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <button
                    onClick={() => handleAppOptionClick("página principal", "https://www.webintoapp.com/store/877035")}
                    className="flex items-center space-x-2 px-2 py-2 hover:bg-blue-50 transition-colors duration-200 w-full text-left"
                  >
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e-learning-9xz1FerTojzQON4b44658Ti6gGHZUD.png"
                      alt="App Principal"
                      className="w-4 h-4"
                    />
                    <span className="text-xs text-blue-700 font-medium">
                      Baixe também nossa app na página web principal
                    </span>
                  </button>

                  <div className="px-2 py-1 text-center">
                    <span className="text-xs text-gray-500">ou</span>
                  </div>

                  <button
                    onClick={() =>
                      handleAppOptionClick(
                        "externa",
                        "https://drive.google.com/embeddedfolderview?id=1UfLvjvJyj2mLuxetJj8yFrkWWrXSvdTy#grid",
                      )
                    }
                    className="flex items-center space-x-2 px-2 py-2 hover:bg-green-50 transition-colors duration-200 w-full text-left"
                  >
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e-learning-9xz1FerTojzQON4b44658Ti6gGHZUD.png"
                      alt="App Externo"
                      className="w-4 h-4"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs text-green-700 font-medium">Baixe também na página externa</span>
                      <span className="text-xs text-gray-500">
                        (para versões androides que não funcionam na página principal)
                      </span>
                    </div>
                  </button>
                </div>
              )}
            </div>
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
            <Button
              variant={currentSection === "perfil" ? "default" : "ghost"}
              onClick={() => onSectionChange("perfil")}
              size="sm"
            >
              Perfil
            </Button>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                <img
                  src={userData.profileImage || "/generic-user-avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/generic-user-avatar.png"
                  }}
                />
              </div>
              <span className="text-sm text-gray-700 max-w-24 truncate">{userData.username}</span>
            </div>

            <div className="sm:hidden">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                <img
                  src={userData.profileImage || "/generic-user-avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/generic-user-avatar.png"
                  }}
                />
              </div>
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
              <Button
                variant={currentSection === "perfil" ? "default" : "ghost"}
                onClick={() => handleSectionChange("perfil")}
                className="w-full justify-start"
                size="sm"
              >
                Perfil
              </Button>

              <div className="pt-2 border-t mt-2">
                <div className="flex items-center space-x-2 px-3 py-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={userData.profileImage || "/generic-user-avatar.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/generic-user-avatar.png"
                      }}
                    />
                  </div>
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
