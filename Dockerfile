FROM alpine:3.14

ENV NODE_VERSION 14.15.3

# Create app directory, i.e, the working directory
WORKDIR /usr/src/app

COPY . .
RUN apk add --update nodejs npm
RUN npm install

CMD [ "node", "index.js" ]