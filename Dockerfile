# Stage 1 – serve static assets with nginx
FROM nginx:1.27-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy portfolio files
COPY frontend/ /usr/share/nginx/html/

# Copy custom nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# nginx image already defines CMD ["nginx", "-g", "daemon off;"]
