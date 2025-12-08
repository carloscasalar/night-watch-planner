# Build Stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application (no build-time env vars needed for k8s image)
RUN npm run build

# Production Stage
FROM nginx:alpine as production

WORKDIR /usr/share/nginx/html

# Copy built assets from build stage
COPY --from=build /app/dist ./

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script for runtime configuration
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Environment variable for runtime configuration
ENV PLAN_REST_API_HOST=""

# Expose port 80
EXPOSE 80

# Use entrypoint to generate config.js at runtime
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
