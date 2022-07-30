FROM postgres:11-alpine

COPY database.sql /docker-entrypoint-initdb.d/