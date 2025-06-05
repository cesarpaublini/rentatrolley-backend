# Use official Node.js LTS image
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files (optional, will be overwritten by volume)
COPY . .

# Expose Nest port
EXPOSE 3000