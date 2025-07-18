import { User } from "@/models/UserModel"

let cachedUser: User | null = null

export async function signIn(email: string, password: string) {
  try {

    return { user: null, error: "Credenciales inválidas" }
  } catch (error) {
    return { user: null, error: "Error al iniciar sesión" }
  }
}

export function signOut() {
  localStorage.removeItem("user")
  cachedUser = null
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  if (cachedUser) return cachedUser

  const userStr = localStorage.getItem("user")
  if (!userStr) return null

  try {
    cachedUser = JSON.parse(userStr) as User
    return cachedUser
  } catch {
    return null
  }
}