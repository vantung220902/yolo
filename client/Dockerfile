FROM node:latest

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./


RUN yarn install --frozen-lockfile \
    && yarn cache clean


COPY . .

RUN yarn build 

ENV NODE_ENV production

EXPOSE 3000

CMD [ "npm", "start" ]