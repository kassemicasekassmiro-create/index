"use client"

import { useState, useEffect } from "react"
import LoginForm from "@/components/login-form"
import Header from "@/components/header"
import DashboardSection from "@/components/dashboard-section"
import VitrineSection from "@/components/vitrine-section"
import LivrosSection from "@/components/livros-section"
import ReclamacoesSection from "@/components/reclamacoes-section"
import ProfileSection from "@/components/profile-section"
import Footer from "@/components/footer"

interface UserData {
  username: string
  email?: string
  profileImage: string
  isAdmin: boolean
  description?: string
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [currentSection, setCurrentSection] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUserData = localStorage.getItem("schoolUserData")
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData)

      if (parsedData.email && !parsedData.username) {
        parsedData.username = parsedData.email
        delete parsedData.email
        localStorage.setItem("schoolUserData", JSON.stringify(parsedData))
      }

      if (!parsedData.hasOwnProperty("isAdmin")) {
        parsedData.isAdmin = parsedData.username === "administradorstarlink1@esgl"
        localStorage.setItem("schoolUserData", JSON.stringify(parsedData))
      }

      setUserData(parsedData)
      setIsLoggedIn(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (userData: UserData) => {
    setUserData(userData)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("schoolUserData")
    setUserData(null)
    setIsLoggedIn(false)
    setCurrentSection("dashboard")
  }

  const handleUpdateProfile = (updatedData: UserData) => {
    setUserData(updatedData)
  }

  const renderCurrentSection = () => {
    if (!userData) return null

    switch (currentSection) {
      case "dashboard":
        return <DashboardSection userData={userData} onSectionChange={setCurrentSection} /> // passando função de mudança de seção
      case "vitrine":
        return <VitrineSection />
      case "livros":
        return <LivrosSection />
      case "reclamacoes":
        return <ReclamacoesSection userData={userData} />
      case "perfil":
        return <ProfileSection userData={userData} onUpdateProfile={handleUpdateProfile} />
      default:
        return <DashboardSection userData={userData} onSectionChange={setCurrentSection} /> // passando função de mudança de seção
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        userData={userData!}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        onLogout={handleLogout}
      />
      <main className="flex-1">{renderCurrentSection()}</main>
      <Footer />
    </div>
  )
}
