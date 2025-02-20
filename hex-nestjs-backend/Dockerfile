FROM node:20-bullseye

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

RUN yarn global add nodemon

COPY . .

EXPOSE 3000

CMD ["yarn", "start:dev"]
