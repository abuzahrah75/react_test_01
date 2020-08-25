FROM node:12 as builder

WORKDIR /client

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn

COPY public/ public
COPY src/ src
RUN yarn build


FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder client/build/ /usr/share/nginx/html
