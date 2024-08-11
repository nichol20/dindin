import { OrderType } from "../components/FinanceList";
import { FinanceRecord } from "../types/finance";

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