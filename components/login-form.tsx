"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Eye, EyeOff } from "lucide-react"

interface LoginFormProps {
  onLogin: (userData: { username: string; email: string; profileImage: string; isAdmin: boolean }) => void
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("") // adicionado campo de email
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfileImage(result)
        setImagePreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const checkUserExists = (username: string): boolean => {
    const users = JSON.parse(localStorage.getItem("schoolUsers") || "{}")
    return users.hasOwnProperty(username)
  }

  const saveUser = (username: string, email: string, password: string, profileImage: string, isAdmin: boolean) => {
    // adicionado parâmetro email
    const users = JSON.parse(localStorage.getItem("schoolUsers") || "{}")
    users[username] = {
      email, // salvando email no localStorage
      password,
      profileImage,
      isAdmin,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem("schoolUsers", JSON.stringify(users))
  }

  const verifyCredentials = (username: string, password: string): { valid: boolean; userData?: any } => {
    const users = JSON.parse(localStorage.getItem("schoolUsers") || "{}")
    const user = users[username]

    if (user && user.password === password) {
      return {
        valid: true,
        userData: {
          username,
          email: user.email, // incluindo email nos dados do usuário
          profileImage: user.profileImage,
          isAdmin: user.isAdmin,
        },
      }
    }
    return { valid: false }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isLogin) {
      if (username && password) {
        const { valid, userData } = verifyCredentials(username, password)
        if (valid) {
          // Salvar dados do usuário atual no localStorage
          localStorage.setItem("schoolUserData", JSON.stringify(userData))
          onLogin(userData)
        } else {
          alert("Nome de usuário ou senha incorretos!")
        }
      }
    } else {
      if (username && email && password && confirmPassword && profileImage) {
        // verificando se email foi preenchido
        if (password !== confirmPassword) {
          alert("As senhas não coincidem!")
          return
        }

        if (checkUserExists(username)) {
          alert("Este nome de usuário já existe!")
          return
        }

        const isAdmin = username === "administradorstarlink1@esgl"
        saveUser(username, email, password, profileImage, isAdmin) // passando email para saveUser

        const userData = { username, email, profileImage, isAdmin } // incluindo email nos dados do usuário
        localStorage.setItem("schoolUserData", JSON.stringify(userData))
        onLogin(userData)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">Escola Virtual</CardTitle>
          <p className="text-gray-600">{isLogin ? "Faça login para continuar" : "Crie sua conta"}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu nome de usuário"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme sua senha"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {!isLogin && (
              <div>
                <Label htmlFor="profileImage">Foto de Perfil</Label>
                <div className="mt-2">
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="profileImage"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400" />
                        <p className="text-sm text-gray-500">Clique para enviar foto</p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={
                isLogin ? !username || !password : !username || !email || !password || !confirmPassword || !profileImage
              } // incluindo email na validação
            >
              {isLogin ? "Entrar" : "Criar Conta"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setEmail("") // limpando campo de email ao alternar
                  setPassword("")
                  setConfirmPassword("")
                  setProfileImage("")
                  setImagePreview("")
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                {isLogin ? "Não tem conta? Criar conta" : "Já tem conta? Fazer login"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
