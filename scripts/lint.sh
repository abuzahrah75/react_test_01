#!/bin/bash
source scripts/.env

docker-compose exec client yarn lint --fix
docker-compose exec server yarn lint --fix
