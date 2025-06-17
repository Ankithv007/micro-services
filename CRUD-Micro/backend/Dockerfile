# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Expose backend port
EXPOSE 5000

# Run app
CMD ["node", "index.js"]
