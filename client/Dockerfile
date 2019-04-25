FROM node:8

# Create app directory
WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package.json ./

RUN yarn

COPY . .

EXPOSE 3000
EXPOSE 4000
EXPOSE 35729

CMD yarn start
