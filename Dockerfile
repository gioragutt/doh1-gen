FROM node:8-alpine

ENV PORT=0

EXPOSE $PORT

RUN npm i -g http-serve

COPY dist dist

ENTRYPOINT [ "http-serve", "./dist", "-f",  "/"]

