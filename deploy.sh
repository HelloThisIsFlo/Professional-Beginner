#!/bin/bash
set -euo pipefail
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

docker compose -f docker-compose.prod.yml up --build -d --pull always

cd - >/dev/null
