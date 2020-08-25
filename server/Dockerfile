FROM node:12 as builder

WORKDIR /server

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn

COPY src/ src
COPY .babelrc.js .babelrc.js
RUN yarn build

FROM node:12

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production

WORKDIR /node_app
COPY --from=builder /server/build/ .

CMD NODE_ENV=production node index.js
