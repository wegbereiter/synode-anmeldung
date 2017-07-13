FROM kkarczmarczyk/node-yarn

ENV NODE_ENV=production
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app

RUN yarn build

CMD ["sh", "-c", "yarn start:server -- -d dist -s ${TARGET_SHEET} -u ${GOOGLE_USER} '--key=\"${GOOGLE_KEY}\"'"]

EXPOSE 80