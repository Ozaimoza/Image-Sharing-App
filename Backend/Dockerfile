FROM node:alpine

ENV NODE_VERSION 21.6.2

WORKDIR /image-sharing/app

COPY  package*.json ./

RUN npm install 

COPY . ./

RUN npx prisma generate

EXPOSE 3000

CMD npm run start:docker