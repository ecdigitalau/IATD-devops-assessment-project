# Base image
FROM node:20.12-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy dependency files first (to leverage caching)
COPY package*.json ./

# Install system dependencies (Alpine version)
RUN apk add --no-cache perl util-linux

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy only production-relevant code
COPY src ./src
# Add any additional folders you need (e.g., config, views, etc.)

# Expose port (change if your app runs on a different one)
EXPOSE 3000

# Default command to run your app
CMD ["npm", "start"]
