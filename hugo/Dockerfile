FROM debian:bookworm-slim AS builder

# Download Hugo Extended (required for SCSS)
ARG HUGO_VERSION=0.142.0
RUN apt-get update && \
    apt-get install -y --no-install-recommends wget ca-certificates && \
    ARCH=$(dpkg --print-architecture) && \
    wget -O hugo.tar.gz "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-${ARCH}.tar.gz" && \
    tar -xzf hugo.tar.gz -C /usr/local/bin/ hugo && \
    rm hugo.tar.gz && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /site
COPY . .

RUN hugo --gc --minify

# Serve with nginx
FROM nginx:alpine

COPY --from=builder /site/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
