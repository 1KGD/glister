FROM node:alpine AS common
WORKDIR /app
RUN apk add git
RUN npm i -g pnpm
COPY package.json .
COPY pnpm-workspace.yaml .
RUN pnpm i
COPY src/common src/common
COPY tsconfig.json .
COPY config.ts .

FROM common AS tesseract
COPY tesseract tesseract
WORKDIR /app/tesseract
RUN pnpm i .
WORKDIR /app

FROM tesseract AS client
COPY src/client src/client
COPY public public
COPY index.html .
COPY vite.config.ts .
RUN pnpm run build-client

FROM common AS server
COPY src/server src/server
COPY rollup.config.mjs .
RUN pnpm run build-server

FROM nginx:alpine AS final
WORKDIR /app
RUN apk add nodejs npm
RUN npm i -g concurrently
RUN npm i typeorm better-sqlite3
RUN apk del npm
COPY nginx.conf /etc/nginx
COPY --from=client /app/dist /data/www
COPY --from=server /app/build .
ENV PRODUCTION_SERVER=true
ENTRYPOINT concurrently --names nginx,colyseus -c green,blue 'nginx -e stderr' 'node ./index.js'