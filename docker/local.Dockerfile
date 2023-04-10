FROM node:16-alpine

WORKDIR /usr/app

COPY . .
RUN rm -rf services

RUN yarn set version stable
RUN yarn

CMD tail -f /dev/null