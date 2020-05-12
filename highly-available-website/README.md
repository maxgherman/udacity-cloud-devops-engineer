## High availability web app using CloudFormation

This project deploys web servers for a highly available web app using CloudFormation.
It creates and deploys the infrastructure and application for an Instagram-like app
from the ground up. Deployment begins with the networking components, followed by servers,
security roles and software. The application code is deployed from the S3 bucket using appropriate role.

### Description
Create a Launch Configuration in order to deploy four servers, two located in each of
your private subnets. The launch configuration will be used by an auto-scaling group. You'll need two vCPUs and at least 4GB of RAM. The Operating System to be used is Ubuntu 18. So, choose an Instance size and Machine Image (AMI) that best fits this spec. Be sure to allocate at least 10GB of disk space so that you don't run into issues.

### Architecture
![Architecture](./infrastructure-diagram.png)

### Files included:

- network.yaml - CloudFormation network infrastructure stack description.
- network-parameters.json - Parameters file for the network infrastructure stack
- services.yaml - CloudFormation services infrastructure stack description
- services-parameters.json - Parameters file for the services infrastructure stack
- run-networks.sh - bash script for managing network infrastructure stack
- run-services.sh - bash script for managing services infrastructure stack
- infrastructure-diagram.png - infrastructure diagram
- ELB_and_AutoScaling_In_VPC.template - elastic load balancer auto scaling group example

### Running the project:

1. Execute network infrastructure stack.
  Usage: run-networks.sh create

2. Upon step 1 successful completion, execute services infrastructure stack
  Usage: services.yaml create

### Output
Services stack outputs the final website URL.
