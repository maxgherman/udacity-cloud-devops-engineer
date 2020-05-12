#!/bin/bash

ACTION=$1
STACK="capstone-project-network"
TEMPLATE="network.yaml"
PARAMS="parameters.json"

./run.sh $ACTION $STACK $TEMPLATE $PARAMS
