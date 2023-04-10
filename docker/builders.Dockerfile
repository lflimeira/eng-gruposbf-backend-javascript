FROM node:16-alpine

ARG GH_PAT_TOKEN

ENV GH_PAT_TOKEN=${GH_PAT_TOKEN}

WORKDIR /usr/app

COPY . .
RUN rm -rf services

RUN yarn set version stable
RUN yarn

CMD tail -f /dev/null
