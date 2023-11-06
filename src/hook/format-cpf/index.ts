export const formatCPF = (value: string): string => {
    if (!value) return null
    const cpf = value.replace(/\D/g, '');

    if (!cpf) return null
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}