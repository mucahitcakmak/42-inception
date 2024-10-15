#!/bin/bash

if [ ! -f /etc/ssl/certs/nginx.crt ]; then
echo "Nginx: setting up ssl ...";
openssl req -x509 -nodes -days 365 -newkey rsa:4096 -keyout /etc/ssl/private/nginx.key -out /etc/ssl/certs/nginx.crt -subj "/C=TR/ST=ISTANBUL/L=MASLAK/O=42Istanbul/CN=mucakmak.42.fr";
echo "Nginx: ssl is set up!";
fi

exec "$@"