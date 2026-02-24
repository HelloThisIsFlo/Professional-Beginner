FROM node:18.12.1

RUN mkdir /app
WORKDIR /app

RUN npm install -g gatsby-cli

ADD package.json .
ADD package-lock.json .
RUN npm install --legacy-peer-deps

ADD . .
RUN gatsby build
# ADD public public
