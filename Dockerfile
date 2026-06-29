FROM nginx:1.27-alpine

# Copie le portfolio
COPY src/ /usr/share/nginx/html/

# Config nginx légère — gzip + cache statique
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget -qO- http://localhost/ || exit 1
