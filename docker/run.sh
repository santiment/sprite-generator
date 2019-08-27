#! /bin/sh

docker-compose -f ./development/docker-compose.yml build &&  \
docker-compose -f ./development/docker-compose.yml run sprite-generator
