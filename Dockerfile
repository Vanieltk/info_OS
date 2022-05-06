FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json  node_modules ./
RUN cat package.json

RUN npm i

COPY . .

EXPOSE 3001
CMD ["npm", "start"]