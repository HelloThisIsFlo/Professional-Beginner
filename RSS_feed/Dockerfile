FROM node:lts

RUN mkdir /app
WORKDIR /app

RUN npm install -g yarn

ADD package.json .
RUN yarn install

ADD index.js .