#!/bin/bash

ACTION=$1
STACK="capstone-project-eks-node-group"
TEMPLATE="eks-nodegroup.yaml"
PARAMS="parameters.json"

./run.sh $ACTION $STACK $TEMPLATE $PARAMS
