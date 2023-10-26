export const numberValidation = (value: string, current: string = '') => {
    const regex = /^[0-9]+$/

    if (regex.test(value)) return value
    if (current.length <= 1) return ''
    return current
}