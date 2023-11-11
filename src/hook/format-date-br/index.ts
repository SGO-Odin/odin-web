export const handleFormatDateBR = (dateIso: string, type: 'DATE' | 'HOUR'): string => {
    const date = new Date(dateIso);

    // Verifica se a data é válida
    if (isNaN(date.getTime())) {
        throw new Error('Formato de data inválido.');
    }

    if (type === 'DATE') {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().padStart(4, '0');

        const formatedDate = `${day}/${month}/${year}`;

        return formatedDate;
    }

    const horas = date.getHours().toString().padStart(2, '0');
    const minutos = date.getMinutes().toString().padStart(2, '0');
    const segundos = date.getSeconds().toString().padStart(2, '0');

    // Formata a data no formato brasileiro
    const formatedHour = `${horas}:${minutos}:${segundos}`;

    return formatedHour;
}