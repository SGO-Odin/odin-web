export const handlePercent = (percent: string, value: string): string => {
    if (!percent || !value) return null

    value = value.replace(/\D/g, '') // Retira qualquer caracter não numerico
    percent = percent.replace(/\D/g, '') // Retira qualquer caracter não numerico

    const percentCalc = ((Number(percent) / Number(value)) * 100).toFixed(2)
    return percentCalc.toString()
}