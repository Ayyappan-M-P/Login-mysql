FROM node:20

WORKDIR /practice/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]