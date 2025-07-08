# ===== Stage 1: Build React App =====
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Vite app
RUN npm run build

# ===== Stage 2: Serve with Nginx =====
FROM nginx:stable-alpine

# Copy built files to nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove default nginx config and add custom
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
