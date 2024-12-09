FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN npm install -g serve

WORKDIR /app/dist

CMD ["serve", "-s", ".", "-l", "80"]
