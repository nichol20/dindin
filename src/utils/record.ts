export const getWeekDay = (date:string) => {
    const dateObj = new Date(date);
    const weekDays = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sabado']

    return weekDays[dateObj.getDay()+1];
};

export const formatDate = (date:string) => {

return new Date(date).toLocaleDateString().replaceAll('/','-')

};

export const formatValue = (valor:number) => {

    return `R$${(valor/100).toFixed(2).replace('.',',')}`;

};