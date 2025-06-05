#!/bin/bash

# Exit on error
set -e

# Optional: print each command (useful for debugging)
# set -x

echo "Starting production Docker Compose..."

docker compose \
  -p prod_rentatrolley \
  -f docker-compose.yml \
  -f docker-compose.prod.yml \
  --env-file .env.prod \
  up --build -d

echo "Production containers are up!"
