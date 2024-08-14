import { FinanceRecord, Order, OrderType } from "../types/finance";

export const sortRecordsByDate = (records: FinanceRecord[], type: OrderType) => {
    return records.sort((a, b) => {
        if (type === "ascendant") return Date.parse(a.data) - Date.parse(b.data)
        return Date.parse(b.data) - Date.parse(a.data)
    })
}

export const sortRecordsByValue = (records: FinanceRecord[], type: OrderType) => {
    return records.sort((a, b) => {
        if (type === "ascendant") return a.valor - b.valor
        return b.valor - a.valor
    })
}

export const sortRecordsByCategory = (records: FinanceRecord[], type: OrderType) => {
    return records.sort((a, b) => {
        if (type === "ascendant") return a.categoria_nome.localeCompare(b.categoria_nome)
        return b.categoria_nome.localeCompare(a.categoria_nome)
    })
}

export const sortRecordsByDescription = (records: FinanceRecord[], type: OrderType) => {
    return records.sort((a, b) => {
        if (type === "ascendant") return a.descricao.localeCompare(b.descricao)
        return b.descricao.localeCompare(a.descricao)
    })
}

export const sortRecords = (records: FinanceRecord[], orderBy: Order, type: OrderType) => {
    switch (orderBy) {
        case "date":
            return sortRecordsByDate(records, type)
        case "value":
            return sortRecordsByValue(records, type)
        case "category":
            return sortRecordsByCategory(records, type)
        case "description":
            return sortRecordsByDescription(records, type)
        default:
            return records
    }
}