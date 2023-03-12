FROM node:latest

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

ENV NODE_ENV production

USER node

EXPOSE 4000

CMD [ "node", "dist/index.js" ]
