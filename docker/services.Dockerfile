FROM node:16-alpine

ARG GH_PAT_TOKEN

ENV GH_PAT_TOKEN=${GH_PAT_TOKEN}

ARG SERVICE

WORKDIR /usr/app

COPY ./services/${SERVICE}/build ./build

CMD tail -f /dev/null
