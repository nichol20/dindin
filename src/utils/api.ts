import { User } from "../types/user";
import { http } from "./http";

export const signUp = async (name: string, email: string, password: string): Promise<User> => {
    const res = await http.post<User>('/usuario', { nome: name, email, senha: password })
    return res.data
}

interface LoginResponse {
    usuario: User,
    token: string
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const res = await http.post<LoginResponse>('/login', { email, senha: password })
    return res.data
}

export const getUser = async (token: string): Promise<User> => {
    const res = await http.get<User>("/usuario", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}