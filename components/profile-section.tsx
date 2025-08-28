"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, User, Save } from "lucide-react"

interface ProfileSectionProps {
  userData: {
    username: string
    email: string
    profileImage: string
    isAdmin: boolean
    description?: string
  }
  onUpdateProfile: (updatedData: any) => void
}

export default function ProfileSection({ userData, onUpdateProfile }: ProfileSectionProps) {
  const [profileData, setProfileData] = useState({
    username: userData.username,
    email: userData.email || "",
    profileImage: userData.profileImage || "/generic-user-avatar.png",
    description: userData.description || "",
  })
  const [imagePreview, setImagePreview] = useState(userData.profileImage || "/generic-user-avatar.png")
  const [isSaving, setIsSaving] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfileData((prev) => ({ ...prev, profileImage: result }))
        setImagePreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const users = JSON.parse(localStorage.getItem("schoolUsers") || "{}")
      if (users[userData.username]) {
        users[userData.username] = {
          ...users[userData.username],
          email: profileData.email,
          profileImage: profileData.profileImage,
          description: profileData.description,
        }
        localStorage.setItem("schoolUsers", JSON.stringify(users))
      }

      const updatedUserData = {
        ...userData,
        email: profileData.email,
        profileImage: profileData.profileImage,
        description: profileData.description,
      }
      localStorage.setItem("schoolUserData", JSON.stringify(updatedUserData))

      onUpdateProfile(updatedUserData)
      alert("Perfil atualizado com sucesso!")
    } catch (error) {
      alert("Erro ao salvar perfil. Tente novamente.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
        <p className="text-gray-600">Gerencie suas informações pessoais e preferências</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Foto de Perfil
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-4">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Foto de perfil"
                className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-200"
              />
            </div>
            <input
              id="profileImageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="profileImageUpload"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Alterar Foto
            </label>
            <p className="text-sm text-gray-500 mt-2">Foto opcional</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="username">Nome de Usuário</Label>
                  <Input id="username" value={profileData.username} disabled className="bg-gray-50" />
                  <p className="text-sm text-gray-500 mt-1">Nome de usuário não pode ser alterado</p>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Digite seu email"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={profileData.description}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Conte um pouco sobre você..."
                  rows={4}
                  className="resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">{profileData.description.length}/500 caracteres</p>
              </div>

              {userData.isAdmin && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-800">
                    <User className="w-4 h-4" />
                    <span className="font-medium">Conta Administrativa</span>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">Você tem privilégios de administrador neste sistema</p>
                </div>
              )}

              <div className="flex justify-end">
                <Button type="submit" disabled={isSaving} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  {isSaving ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
