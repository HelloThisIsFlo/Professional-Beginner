FROM node:lts

RUN mkdir /app
WORKDIR /app

RUN npm install -g yarn
RUN npm install -g gatsby-cli

ADD package.json .
RUN yarn install

ADD . .
RUN gatsby build
# ADD public public
