# Build Stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build argument for API host (needed at build time for Vite)
ARG VITE_PLAN_REST_API_HOST
ENV VITE_PLAN_REST_API_HOST=$VITE_PLAN_REST_API_HOST

# Build the application
RUN npm run build

# Production Stage
FROM nginx:alpine as production

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
