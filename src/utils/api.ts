import { Category, FinanceRecord, FinanceType, StatementSummary } from "../types/finance"
import { User } from "../types/user"
import { http } from "./http"

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

export const getCategories = async () => {
    const res = await http.get<Category[]>("/categoria")
    return res.data
}

export const deleteRecord = async (id: number) => {
    await http.delete(`/transacao/${id}`)
}

interface CreateRecordParams {
    tipo: FinanceType,
    descricao: string,
    valor: number,
    data: string,
    categoria_id: number
}

export const createRecord = async (params: CreateRecordParams) => {
    const res = await http.post<FinanceRecord>("/transacao", params)
    return res.data
}

interface EditRecordParams {
    descricao: string,
    valor: number,
    data: string,
    categoria_id: number,
    tipo: FinanceType
}

export const editRecord = async (id: number, params: EditRecordParams) => {
    await http.put(`/transacao/${id}`, params)
}

export const getRecords = async () => {
    const res = await http.get<FinanceRecord[]>("/transacao")
    return res.data
}

export const getStatementSummary = async () => {
    const res = await http.get<StatementSummary>("/transacao/extrato")
    return res.data
}