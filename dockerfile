# Use a imagem oficial do Node.js
FROM node:16

# Diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia os arquivos do seu código para dentro do contêiner
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do backend para o contêiner
COPY . .

# Expõe a porta 3000 para acesso ao backend
EXPOSE 3000

# Comando para rodar o servidor Express
CMD npm start

#  npx ts-node src/seeds/seedDatabase.ts && npm start
