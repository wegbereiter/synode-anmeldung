FROM node:8-alpine

ENV NODE_ENV=production
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && npm install --global yarn

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN NODE_ENV=development npm install && npm run build

CMD ["sh", "-c", "npm run start:server -- -d dist"]

EXPOSE 80