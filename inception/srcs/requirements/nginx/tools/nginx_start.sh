#!/bin/bash

# Eğer SSL sertifikası yoksa oluştur
if [ ! -f /etc/nginx/ssl/nginx.crt ]; then
  # DOMAIN_NAME tanımlı değilse varsayılan olarak localhost kullan
  DOMAIN_NAME=${DOMAIN_NAME:-localhost}
  
  openssl req -x509 -nodes -days 365 -newkey rsa:4096 \
    -keyout /etc/nginx/ssl/nginx.key \
    -out /etc/nginx/ssl/nginx.crt \
    -subj "/C=TR/ST=ISTANBUL/L=SARIYER/O=42Istanbul/CN=${DOMAIN_NAME}"
fi

exec "$@"
