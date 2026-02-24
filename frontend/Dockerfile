FROM node:lts

RUN mkdir /app
WORKDIR /app

RUN npm install -g gatsby-cli

ADD package.json .
ADD package-lock.json .
RUN npm install

ADD . .
RUN gatsby build
# ADD public public
