FROM debian:buster

EXPOSE 443

RUN apt-get update && apt-get -y install nginx openssl curl

COPY ./conf/default /etc/nginx/sites-enabled/default
COPY ./tools/nginx_start.sh /var/www/

RUN chmod +x /var/www/nginx_start.sh

ENTRYPOINT [ "/var/www/nginx_start.sh" ]

CMD ["nginx", "-g", "daemon off;"]