FROM node:8-alpine

ENV NODE_ENV=production
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && npm install --global yarn

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN yarn install && yarn build

CMD ["sh", "-c", "yarn start:server -- -d dist -s ${TARGET_SHEET} -u ${GOOGLE_USER} '--key=\"${GOOGLE_KEY}\"'"]

EXPOSE 80