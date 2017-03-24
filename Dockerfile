FROM alpine
MAINTAINER oxoox22@gmail.com <Oxoox Soulmaneller>

RUN apk add --update nodejs
RUN npm i -g yarn
RUN npm i -g codeceptjs
RUN npm i -g webdriverio
RUN npm i -g supervisor

WORKDIR /codeceptjs
RUN yarn add --dev mocha mochawesome
RUN yarn add fs-extra lodash
ADD src/* /codeceptjs/
CMD codeceptjs run
