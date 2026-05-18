FROM node:alpine AS common
WORKDIR /app
RUN npm i -g pnpm
COPY package.json .
COPY pnpm-*.yaml .
RUN pnpm i
COPY src src
COPY tsconfig.json .
COPY config.ts .

FROM common AS client
COPY index.html .
COPY vite.config.ts .
RUN pnpm run build-client

FROM common AS server
COPY rollup.config.mjs .
RUN pnpm run build-server

FROM nginx:alpine AS final
WORKDIR /app
RUN apk add nodejs
COPY nginx.conf /etc/nginx
COPY --from=client /app/dist /data/www
COPY --from=server /app/build .
ENTRYPOINT nginx && \
  node ./index.js