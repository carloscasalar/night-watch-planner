#!/usr/bin/env sh
set -e

: "${PLAN_REST_API_HOST:=}"

# Generate config.js from template if present
if [ -f /usr/share/nginx/html/config.template.js ]; then
  sed "s|\${PLAN_REST_API_HOST}|${PLAN_REST_API_HOST}|g" \
    /usr/share/nginx/html/config.template.js \
    > /usr/share/nginx/html/config.js
fi

exec "$@"
