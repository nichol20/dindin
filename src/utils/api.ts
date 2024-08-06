import { http } from "./http";

interface SignUpResponse {id:number, nome:string, email:string};

export const signUp = async (name: string, email:string, password:string): Promise<SignUpResponse> => {

    const dadosCadastro = await http.post<SignUpResponse>('/usuario', {nome: name,email,senha: password});
    return  dadosCadastro.data

};

interface LoginResponse {usuario:{id:number, name:string, email:string},token:string};

export const login = async (email:string, password:string): Promise<LoginResponse> => {

    const dadosLogin = await http.post<LoginResponse>('/login', {email, senha: password});
    return dadosLogin.data


};


