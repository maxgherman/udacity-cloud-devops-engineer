# Jenkins pipeline on AWS
##  Deploy static website using Jenkins pipeline

This project consist of the manual infrastructure setup for the S3 static web site deployment using Jenkins pipeline.

Create a pipeline that spins up three servers and uses Ansible to deploy an application on the servers. Create another pipeline to confirm that servers were configured as expected. Use the “Blue/Green” deployment strategy to deploy additional features to those servers.

### Steps outline:

- AWS Steps
  - Set up S3 Bucket
  - Setup static S3 bucket HTTP hosting
  - Deploy EC2 instance for the Jenkins server
- Set up GitHub repository
- Install Jenkins On Ubuntu (EC2 instance)
- Set Up Jenkins
  - Install required Jenkins plugins (BlueOcean, AWS)
  - Set up AWS credentials for Jenkins
  - Set up pipeline for AWS
  - Add another stage in pipeline
    - HTML lint stage
    - AWS S3 deployment stage

### Files included:

- index.html - static website main page
- Jenkins - jenkins pipeline specification files
