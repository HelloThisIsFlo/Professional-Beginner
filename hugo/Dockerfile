# Multi-stage build: each FROM starts a fresh stage. Only the final
# stage (nginx) ends up in the shipped image. Earlier stages are
# throwaway workbenches — we just COPY specific files out of them.
#
# ┌─────────────────────────────────────────┐
# │ Stage 1: "downloader" (Alpine)          │
# │                                         │
# │  Downloads Hugo binary using Alpine's   │
# │  built-in wget. Alpine is used instead  │
# │  of Debian because Debian-slim doesn't  │
# │  ship wget and apt-get can be fragile.  │
# │                                         │
# │  ❌ Thrown away                         │
# │  ✅ We grab /hugo from it               │
# └──────────────┬──────────────────────────┘
#                │ COPY --from=downloader /hugo
#                ▼
# ┌─────────────────────────────────────────┐
# │ Stage 2: "builder" (Debian-slim)        │
# │                                         │
# │  Runs Hugo to build the site. Debian    │
# │  is needed because Hugo Extended        │
# │  requires glibc (for SCSS processing).  │
# │                                         │
# │  ❌ Thrown away too                     │
# │  ✅ We grab /site/public from it        │
# └──────────────┬──────────────────────────┘
#                │ COPY --from=builder /site/public
#                ▼
# ┌─────────────────────────────────────────┐
# │ Stage 3: final image (nginx:alpine)     │
# │                                         │
# │  Serves the static files. No Hugo,      │
# │  no Debian, no source code — just       │
# │  nginx + the built HTML/CSS/images.     │
# │                                         │
# │  ✅ THIS is the final Docker image      │
# └─────────────────────────────────────────┘

# Stage 1: Download Hugo binary
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
