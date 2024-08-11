export const getWeekday = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
        weekday: "long"
    })
}

export const formatToInputDate = (date: string) => {
    const dateObj = new Date(date)
    const month = dateObj.toLocaleDateString("en-US", {
        month: "2-digit"
    })
    const day = dateObj.toLocaleDateString("en-US", {
        day: "2-digit"
    })
    return `${dateObj.getFullYear()}-${month}-${day}`
}