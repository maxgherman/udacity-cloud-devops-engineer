#!/bin/bash

STACK_NAME="highly-available-website-networks"
ACTION=$1

case $ACTION in

  create)
    aws cloudformation create-stack \
    --stack-name $STACK_NAME \
    --template-body file://network.yaml \
    --parameters file://network-parameters.json \
    --region=ap-southeast-2
    ;;

  update)
    aws cloudformation update-stack \
    --stack-name $STACK_NAME \
    --template-body file://network.yaml \
    --parameters file://network-parameters.json
    ;;

  delete)
    aws cloudformation delete-stack \
    --stack-name $STACK_NAME
    ;;

  *)
    echo -n "unknown argument, expecting (create | update | delete)"
    ;;
esac
