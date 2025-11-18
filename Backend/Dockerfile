# Usar imagem oficial do Node.js LTS
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código fonte do backend
COPY . .

# Expor a porta que o servidor Express usa
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["node", "index.js"]