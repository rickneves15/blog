'use client'

import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
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
  setUser: Dispatch<SetStateAction<UserWithoutPassword>>
  isLogged: boolean
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
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const signIn = useCallback(
    async (data: SignInForm) => {
      try {
        setIsLoading(true)
        const response = await AuthService.signIn(data)
        const {
          data: { accessToken },
        } = response

        if (response.status === 200) {
          api.defaults.headers.authorization = `Bearer ${accessToken}`

          const response = await UsersService.me()

          toast.success('Login Efetuado com sucesso. Redirecionando...', {
            duration: 1500,
            onAutoClose: () => {
              setIsLogged(true)
              setUser(response.data)

              setCookie(undefined, 'blog:token', accessToken, {
                maxAge: 60 * 60 * 24 * 3,
                path: '/',
              })
              router.push('/profile')
            },
          })
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const responseError = error.response?.data as AxiosError<ErrorApi>
          if (responseError.message === 'Invalid credentials') {
            toast.error('Credenciais inválidas.', {
              duration: 1500,
            })
          } else {
            toast.error('Não foi possível se autenticar. Tente novamente...', {
              duration: 1500,
            })
          }
        } else {
          toast.error('Houve um erro. Tente novamente mais tarde.', {
            duration: 1500,
          })
        }
      } finally {
        setIsLoading(false)
      }
    },
    [router],
  )

  const signUp = useCallback(
    async (data: SignUpForm) => {
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
        }
      } finally {
        setIsLoading(false)
      }
    },
    [router],
  )

  const signOut = useCallback(async () => {
    try {
      destroyCookie(undefined, 'blog:token')
      api.defaults.headers.authorization = null
      setUser({} as UserWithoutPassword)
      setIsLogged(false)
      await AuthService.signOut()
      router.push('/')

      // eslint-disable-next-line prettier/prettier
    } catch (error) { }
  }, [router])

  const loadUserStorageData = async () => {
    try {
      const { 'blog:token': token } = parseCookies()

      if (token) {
        api.defaults.headers.authorization = `Bearer ${token}`
        const response = await UsersService.me()

        setIsLogged(true)
        setUser(response.data)
      }
    } catch (error) {
      signOut()
    }
  }

  useEffect(() => {
    loadUserStorageData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLogged, isLoading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
