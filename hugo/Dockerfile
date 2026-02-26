# Stage 1: Download Hugo binary (Alpine has wget built-in, avoids apt-get)
FROM alpine:3 AS downloader

ARG HUGO_VERSION=0.142.0
RUN ARCH=$(uname -m | sed 's/x86_64/amd64/' | sed 's/aarch64/arm64/') && \
    wget -O hugo.tar.gz "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-${ARCH}.tar.gz" && \
    tar -xzf hugo.tar.gz hugo

# Stage 2: Build site (debian-slim provides glibc needed by Hugo Extended)
FROM debian:bookworm-slim AS builder

COPY --from=downloader /hugo /usr/local/bin/hugo

WORKDIR /site
COPY . .

RUN hugo --gc --minify

# Stage 3: Serve with nginx
FROM nginx:alpine

COPY --from=builder /site/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
