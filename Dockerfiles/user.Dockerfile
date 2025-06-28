# Base image
FROM node:20.12-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy dependency files first (to leverage caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev  # Only install production dependencies

# Copy only production-relevant code
COPY src ./src
COPY public ./public
# Add any additional folders you need (e.g., config, views, etc.)

# Expose port (change if your app runs on a different one)
EXPOSE 3000

# Default command to run your app
CMD ["npm", "start"]
