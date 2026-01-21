#!/bin/bash
# Run Jekyll in Docker - visit http://localhost:4000
docker run --rm \
  --platform=linux/amd64 \
  -p 4000:4000 \
  -v "$PWD:/srv/jekyll" \
  -v "$PWD/.bundle-cache:/usr/local/bundle" \
  jekyll/jekyll:latest \
  jekyll serve --watch --force_polling --host 0.0.0.0
