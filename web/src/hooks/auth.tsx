'use client'

import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'sonner'

import {
  SignInForm,
  SignUpForm,
  UserWithoutPassword,
} from '@/@types/models/user'
import { ErrorApi } from '@/@types/services'
import { api } from '@/lib/axios'
import { AuthService } from '@/services/authService'
import { UsersService } from '@/services/userService'

export type AuthContextDataProps = {
  user: UserWithoutPassword
  isLoading: boolean
  signIn: (data: SignInForm) => Promise<void>
  signUp: (data: SignUpForm) => Promise<void>
  signOut: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthProvider({ children }: AuthContextProviderProps) {
  const router = useRouter()
  const [user, setUser] = useState<UserWithoutPassword>(
    {} as UserWithoutPassword,
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const signIn = useCallback(async (data: SignInForm) => {
    try {
      setIsLoading(true)
      const response = await AuthService.signIn(data)
      const {
        data: { accessToken },
      } = response

      if (response.status === 200) {
        api.defaults.headers.authorization = `Bearer ${accessToken}`

        const response = await UsersService.me()

        setUser(response.data)

        setCookie(undefined, 'blog:token', accessToken, {
          maxAge: 60 * 60 * 24 * 3,
          path: '/',
        })

        toast.success('Login Efetuado com sucesso. Redirecionando...', {
          duration: 1500,
          onAutoClose: () => router.push('/profile'),
        })
      }
    } catch (error) {
      throw new Error('Não foi possível autenticar')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signUp = useCallback(async (data: SignUpForm) => {
    try {
      setIsLoading(true)
      const response = await AuthService.signUp(data)

      if (response.status === 201) {
        toast.success('Registro Efetuado com sucesso. Redirecionando...', {
          duration: 1500,
          onAutoClose: () => router.push('/sign-in'),
        })
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        const responseError = error.response?.data as AxiosError<ErrorApi>
        if (responseError.message === 'User already exists') {
          toast.error('Usuário ja existe.', {
            duration: 1500,
          })
        } else {
          toast.error('Não foi possível se registrar. Tente novamente...', {
            duration: 1500,
          })
        }
      } else {
        toast.error('Houve um erro. Tente novamente mais tarde.', {
          duration: 1500,
        })
        throw new Error('Não foi possível se registrar')
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      destroyCookie(undefined, 'blog:token')
      api.defaults.headers.authorization = null
      await AuthService.signOut()
      router.push('/')

      // eslint-disable-next-line prettier/prettier
    } catch (error) { }
  }, [])

  const loadUserStorageData = useCallback(() => {
    const { 'blog:token': token } = parseCookies()

    if (token) {
      const userLogged = JSON.parse(token) as UserWithoutPassword
      api.defaults.headers.authorization = `Bearer ${userLogged.accessToken}`

      setUser(userLogged)
    }
  }, [])

  useEffect(() => {
    loadUserStorageData()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
