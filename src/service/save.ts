import fs from 'fs';

const delay = (amount = 750) =>
    new Promise((resolve) => setTimeout(resolve, amount));

async function criarArquivoJSONVazio(fileName: any) {
    await delay();
    try {
        fs.writeFileSync(fileName, '[]', 'utf-8');
        console.log('Arquivo JSON criado com sucesso.');
        await lerArquivoJSON(fileName)
    } catch (error) {
        console.error('Erro ao criar o arquivo JSON:', error);
    }
}

// Função para ler dados de um arquivo JSON
export async function lerArquivoJSON(fileName: any): Promise<any[]> {
    await delay();
    try {
        const dados = fs.readFileSync(fileName, 'utf-8');
        return JSON.parse(dados);
    } catch (error) {
        await criarArquivoJSONVazio(fileName)
    }
}

// Função para gravar dados em um arquivo JSON
export async function gravarArquivoJSON(data: any[], fileName: any) {
    await delay();
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(fileName, jsonData, 'utf-8');
        console.log('Arquivo JSON atualizado com sucesso.');
    } catch (error) {
        console.error('Erro ao gravar no arquivo JSON:', error);
    }
}