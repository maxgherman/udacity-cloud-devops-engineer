#!/usr/bin/env bash
dockerpath="maxgherman/capstone"

echo "Docker ID and Image: $dockerpath"
docker login &&\
  docker image tag capstone $dockerpath

# Step 3:
# Push image to a docker repository
docker image push $dockerpath
