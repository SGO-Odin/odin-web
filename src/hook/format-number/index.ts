export const handleFormatNumber = (value: string): string => {

    if (!value) return null

    value = value.replace(/\D/g, ''); // Retira qualquer caracter não numerico
    value = value.replace(/^0+/, ''); // Retira os "0" do inicio

    const number = value.split('')

    const lastNumber = number.pop()
    const penultimateNumber = number.pop()

    if (!number) return null
    const bodyNumber = number.join('').replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    if (number.length >= 1) {
        return `${bodyNumber},${penultimateNumber}${lastNumber}`
    } else if (penultimateNumber) {
        return `0,${penultimateNumber}${lastNumber}`
    } else if (lastNumber) {
        return `0,0${lastNumber}`
    }
    return value
}