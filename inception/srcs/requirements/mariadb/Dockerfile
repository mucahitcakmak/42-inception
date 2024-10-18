FROM debian:buster

RUN apt-get update && apt-get install -y mariadb-server
RUN chown -R mysql:mysql /var/lib/mysql
RUN chmod -R 755 /var/lib/mysql

EXPOSE 3306

COPY ./conf/50-server.cnf /etc/mysql/mariadb.conf.d/
COPY ./tools /var/www/

RUN service mysql start && mysql < /var/www/initial_db.sql && rm -f /var/www/initial_db.sql;

CMD ["mysqld"]