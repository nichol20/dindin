import { createContext, useContext, useEffect, useState } from "react";

import { User } from "../types/user";
import * as api from '../utils/api'
import { getFromCache, removeFromCache, SessionStorageKeys, setToCache } from "../utils/sessionStorage";
import { useNavigate } from "react-router-dom";
import { http } from "../utils/http";

interface AuthContext {
    user: User | null
    token: string | null
    login: (email: string, password: string) => Promise<void>,
    signUp: (username: string, email: string, password: string) => Promise<void>,
    logout: () => void
}

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContext)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const login = async (email: string, password: string) => {
        const res = await api.login(email, password)
        setToCache(SessionStorageKeys.TOKEN, res.token)
        setToken(res.token)
        setUser(res.usuario)
        navigate("/")
    }

    const signUp = async (name: string, email: string, password: string) => {
        const user = await api.signUp(name, email, password)
        setUser(user)
        navigate("/login")
    }

    const logout = () => {
        removeFromCache(SessionStorageKeys.TOKEN)
        setUser(null)
        navigate("/login")
    }

    useEffect(() => {
        const refreshUser = async () => {
            try {
                const t = getFromCache<string>(SessionStorageKeys.TOKEN)
                setToken(t)

                const user = await api.getUser(t ?? "")
                setUser(user)
            }
            catch (err) {
                console.error(err)
            }
            finally {
                setIsLoading(false)
            }
        }

        refreshUser()
    }, [])

    useEffect(() => {
        const requestIntercept = http.interceptors.request.use(
            config => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config
            }, (error) => Promise.reject(error)
        )

        const responseIntercept = http.interceptors.response.use(
            response => response,
            async error => {
                if (error?.response?.status === 403 || error?.response?.status === 401) {
                    navigate("/login")
                }
                return Promise.reject(error)
            }
        )

        return () => {
            http.interceptors.request.eject(requestIntercept)
            http.interceptors.response.eject(responseIntercept)
        }
    }, [token, navigate])

    if (isLoading) return <>Loading...</>

    return (
        <AuthContext.Provider value={{ user, token, login, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    )
}