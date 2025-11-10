FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

EXPOSE 5000

# CMD npm start

CMD npx ts-node src/seeds/seedDatabase.ts && npm start
