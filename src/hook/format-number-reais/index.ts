export const useFormatNumberReais = (value: number): string => {
    const numberFormated = value.toFixed(2);

    const valueInReal = `R$ ${numberFormated}`;

    return valueInReal;
}