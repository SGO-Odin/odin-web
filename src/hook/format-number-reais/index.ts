export const formatNumberReais = (value: string): string => {
    const money = Number(value.replace(/\D/g, ''));
    if (!money) return value
    // Verifica se o money é um número
    if (typeof money !== 'number') {
        throw new Error('O money deve ser um número.');
    }

    // Formata o money com o símbolo da moeda, separador de milhares e casas decimais
    const moneyFormated = money.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return moneyFormated;
}