FROM node:alpine AS common
WORKDIR /app
RUN npm i -g pnpm
COPY package.json .
COPY pnpm-*.yaml .
RUN pnpm i
COPY src/common src/common
COPY tsconfig.json .
COPY config.ts .

FROM common AS client
COPY src/client src/client
COPY index.html .
COPY vite.config.ts .
RUN pnpm run build-client

FROM common AS server
COPY src/server src/server
COPY rollup.config.mjs .
RUN pnpm run build-server

FROM nginx:alpine AS final
RUN apk add nodejs npm
RUN npm i -g concurrently
COPY nginx.conf /etc/nginx
COPY --from=client /app/dist /data/www
COPY --from=server /app/build .
ENV PRODUCTION_SERVER=true
ENTRYPOINT concurrently --names nginx,colyseus -c green,blue 'nginx -e stderr' 'node ./index.js'