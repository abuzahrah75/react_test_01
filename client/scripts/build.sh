#!/usr/bin/env bash

IMAGE_REGISTRY=registry.gitlab.com/ragibkl/scooter-viewer/client
TAG=${1:-latest}
echo $IMAGE_REGISTRY:$TAG

docker build -t $IMAGE_REGISTRY:$TAG .
docker push $IMAGE_REGISTRY:$TAG
