export interface Category {
    id: number,
    descricao: string
}

export interface FinanceRecord {
    id: number,
    tipo: FinanceType,
    descricao: string,
    valor: number,
    data: string,
    usuario_id: number,
    categoria_id: number,
    categoria_nome: string,
}

export type FinanceType = "entrada" | "saida"

export interface StatementSummary {
    entrada: number,
    saida: number
}

export type Order = "date" | "value" | "category" | "description"
export type OrderType = "ascendant" | "descendant"