export const getDateFromString = (date: string) => {
    let values = date.split('-');
    return new Date(
        parseInt(values[0]),
        parseInt(values[1])-1,
        parseInt(values[2])
    );
};

export const addYearsToDate = (date: Date, years: number) => {
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    return `${year+years}-${month}-${day}`;
};