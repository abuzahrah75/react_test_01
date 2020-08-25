#!/bin/bash
source scripts/.env

if [[ $# -eq 0 ]] ; then
    echo "
Description: opens a shell inside the specified container
Usage: ./scripts/ssh.sh <container_name>

Examples:
./scripts/ssh.sh server
./scripts/ssh.sh client
./scripts/ssh.sh db
"
    exit 0
fi

NAME=${1}
docker-compose exec $NAME bash
