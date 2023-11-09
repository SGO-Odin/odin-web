export const sanitalizePhones = (phone: string): string => {
    if (!phone) return null
    phone = phone.replace(/\D/g, '');

    if (phone.startsWith("55")) {
        phone = phone.substring(2);
    }
    return phone
}