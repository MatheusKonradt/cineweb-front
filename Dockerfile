FROM node:10 AS builder
ARG MODE
WORKDIR /srv/app
COPY . .
RUN npm install \
    && npm run build -- --mode ${MODE}

FROM nginx:alpine
COPY ./provision/httpd.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /srv/app/dist /srv/app/dist
