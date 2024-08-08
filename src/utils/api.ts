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

interface Category {
    id: number,
    descricao: string
}

export const getCategories = async () => {
    const res = await http.get<Category[]>("/categoria");
    return res.data
};

export const deleteRecord = async (id:number) => {
    await http.delete(`/transacao/${id}`);
};

interface CreateRecordParams {
    tipo: 'entrada' | 'saida',
    descricao: string,
    valor: number,
    data: string,
    categoria_id: number
}

interface Record {
    id: number,
    tipo: 'entrada' | 'saida',
    descricao: string,
    valor: number,
    data: string,
    usuario_id: number,
    categoria_id: number,
    categoria_nome: string,
}

export const createRecord = async(params:CreateRecordParams) => {
    const res = await http.post<Record>("/transacao",params);
    return res.data;
}


interface EditRecordParams {
    descricao: string,
    valor: number,
    data: string,
    categoria_id: number,
    tipo: 'entrada' | 'saida'
};


export const editRecord = async (id:number,params:EditRecordParams) => {
    await http.put(`/transacao/${id}`,params);
};