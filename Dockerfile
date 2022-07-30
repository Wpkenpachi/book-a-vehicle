FROM node:16 as base
WORKDIR /home/node/app
COPY package*.json ./
RUN yarn install
COPY . .
COPY swagger /usr/swagger
# FROM base as production
# ENV NODE_PATH=./dist
# RUN npm run build