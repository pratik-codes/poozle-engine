FROM node:16.17.0-bullseye as builder

WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build:script

FROM node:16.17.0-bullseye-slim as runner
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/index.js /usr/src/app/
COPY --from=builder /usr/src/app/src/client/ /usr/src/app/client
COPY --from=builder /usr/src/app/package.json /usr/src/app/
COPY --from=builder /usr/src/app/src/envelopPlugins.ts /usr/src/app/src/
COPY --from=builder /usr/src/app/src/authPlugin.ts /usr/src/app/src/
COPY --from=builder /usr/src/app/src/utils.ts /usr/src/app/src/


WORKDIR /usr/src/app
RUN yarn install --production
EXPOSE 4000

CMD ["yarn", "run-script"]
