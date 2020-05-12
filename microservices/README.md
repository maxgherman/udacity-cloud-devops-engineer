# Operationalize Machine Learning Microservice API.

[![<ORG_NAME>](https://circleci.com/gh/maxgherman/udacity-microservices.svg?style=svg)](https://circleci.com/gh/maxgherman/udacity-microservices)

Deploying an elastic and fault-tolerant Machine Learning inference API using Kubernetes. Configure this
microservice to be highly available by using Kubernetes best practices. Validate the design by load testing the service and verifying the application architecture performs as designed.

## Project Overview

You are given a pre-trained, `sklearn` model that has been trained to predict housing prices in Boston according to several features, such as average rooms in a home and data about highway access, teacher-to-pupil ratios, and so on. You can read more about the data, which was initially taken from Kaggle, on [the data source site](https://www.kaggle.com/c/boston-housing). This project tests your ability to operationalize a Python flask app—in a provided file, `app.py`—that serves out predictions (inference) about housing prices through API calls. This project could be extended to any pre-trained machine learning model, such as those for image recognition and data labeling.

### Project Tasks

Project goal is to operationalize working machine learning microservice using [kubernetes](https://kubernetes.io/), which is an open-source system for automating the management of containerized applications.

### Project Steps

* Test the project code using linting
* Complete a Dockerfile to containerize the application
* Deploy  containerized application using Docker and make a prediction
* Improve the log statements in the source code for this application
* Configure Kubernetes and create a Kubernetes cluster (minikube)
* Deploy a container using Kubernetes and make a prediction
* Upload a complete Github repo with CircleCI to indicate that the code has been tested

---

## Setup the Environment

* Create a virtualenv and activate it

```sh
python3 -m venv ~/.devops
source ~/.devops/bin/activate
```

* Run `make install` to install the necessary dependencies

### Running `app.py`

1. Standalone:  `python app.py`
2. Run in Docker:  `./run_docker.sh`
3. Run in Kubernetes:  `./run_kubernetes.sh`
4. Make predictions: `./make_prediction.sh`

### Docker

1. Publish docker image: `./upload_docker.sh`

### Kubernetes Steps

* Setup and Configure Docker locally
* Setup and Configure Kubernetes locally
* Create Flask app in Container
* Run via kubectl

### Files included:

* `.circleci` - circleci config scripts
* `model_data` - ML model related data (model, csv data)
* `output_txt_files` - project output files (docker, kubernetes)
    * `docker_out.txt` - run_docker.sh output
    * `docker_prediction_out.txt` - make_prediction.sh output while running docker
    * `kubernetes_container_logs.txt` - kubectl logs output for the pod
    * `kubernetes_out.txt` - run_kubernetes.sh output
    * `kubernetes_prediction_out.txt` - make_prediction.sh output while running k8s pod
* `app.py` - python web application entry point file
* `Dickerfile` - docker image config
* `make_prediction.sh` - make prediction HTTP call script
* `Makefile` - make file (install, test, lint steps)
* `requirements.txt` - web application dependencies (python, libraries)
* `run_docker.sh` - run docker container script
* `run_kubernetes.sh` - run kubernetes pod for the web app script
*  `upload_docker.sh` - upload docker image to dicker hub script
