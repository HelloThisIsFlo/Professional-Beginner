FROM alpine:3.19 AS builder

# Install Hugo extended
RUN apk add --no-cache hugo

WORKDIR /site
COPY . .

RUN hugo --gc --minify

# Serve with nginx
FROM nginx:alpine

COPY --from=builder /site/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
