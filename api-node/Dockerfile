# Definindo a imagem base
FROM node:18

# Definindo o diretório de trabalho no container
WORKDIR /app

# Copiando os arquivos do projeto para dentro do container
COPY package*.json ./

# Instalando dependências
RUN npm install

# Copiando o restante dos arquivos para o container
COPY . .

# Expondo a porta que a API vai rodar
EXPOSE 3000

# Comando para rodar o servidor
CMD ["node", "index.js"]
