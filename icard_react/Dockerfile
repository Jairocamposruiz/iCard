FROM node:16

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

RUN npm i -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]


