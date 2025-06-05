#!/bin/bash

# Exit on error
set -e

echo "Starting development Docker Compose..."

docker-compose \
  -p dev_rentatrolley \
  -f docker-compose.yml \
  -f docker-compose.dev.yml \
  --env-file .env.dev \
  up --build -d

echo "Development containers are up!"
