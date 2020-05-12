#!/bin/bash

ACTION=$1
STACK="capstone-project-eks-network"
TEMPLATE="eks-cluster-network.yaml"
PARAMS="parameters.json"

./run.sh $ACTION $STACK $TEMPLATE $PARAMS
