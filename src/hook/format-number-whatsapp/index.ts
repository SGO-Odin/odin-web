export const formatNumberWhatsapp = (numero: string): string => {
    if (!numero) return null
    numero = numero.replace(/\D/g, '');

    if (numero.startsWith("55")) {
        numero = numero.substring(2);
    }

    if (numero.length >= 11) {
        return `+55 (${numero.slice(0, 2)}) ${numero.slice(2, 7)}-${numero.slice(7)}`;
    }

    return numero;
}