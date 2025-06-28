# Use a Node.js base image
FROM node:20.12-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy only the necessary files
COPY package*.json ./
COPY src ./src
COPY tests ./tests

# Install dependencies
RUN npm ci

# Run tests (optional: you can define CMD or ENTRYPOINT if this image is used to test directly)
CMD ["npm", "test"]
