#!/usr/bin/env bash

# set -e
# set -u

# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

configure_aws_cli(){
  aws --version
  aws configure set default.region us-west-2
  aws configure set default.output json
}

deploy_cluster() {

  host_port=80
  family="linkedgov-webapp"

  make_task_def
  register_definition

  echo "Revision: $revision"

  if $(aws ecs update-service --cluster linkgov-app-cluster --service linkgov-app-service --task-definition $revision | \
                   $JQ '.service.taskDefinition') != $revision; then
    echo "Error updating service."
    return 1
  fi

  # wait for older revisions to disappear
  # not really necessary, but nice for demos
  for attempt in {1..240}; do
    get_ecs_status
    echo "$(date "+%Y-%m-%d %H:%M:%S") Running : $CURRENT_RUNNING_TASK, Desired : $CURRENT_DESIRED_COUNT, Stale : $CURRENT_STALE_TASK"

    if stale=$(aws ecs describe-services --cluster linkgov-app-cluster --services linkgov-app-service | \
                  $JQ ".services[0].deployments | .[] | select(.taskDefinition != \"$revision\") | .taskDefinition"); then
      echo "Waiting for stale deployments:"
      echo "$stale"
      sleep 5
    else
      echo "Deployed!"
      return 0
    fi
  done
  echo "Service update took too long."
  return 1
}

make_task_def() {
  task_template='[
    {
      "name": "linkedgov-app",
      "image": "%s.dkr.ecr.us-west-2.amazonaws.com/linkedgov-app:%s",
      "essential": true,
      "memory": 1024,
      "cpu": 10,
      "portMappings": [
        {
          "containerPort": 8000,
          "hostPort": 80
        }
      ]
    }
  ]'

  task_def=$(printf "$task_template" $AWS_ACCOUNT_ID $CIRCLE_SHA1)
}

push_ecr_image() {
  echo ">>>> Push docker image <<<<"
  eval $(aws ecr get-login --region us-west-2)
  docker push $AWS_ACCOUNT_ID.dkr.ecr.us-west-2.amazonaws.com/linkedgov-app:$CIRCLE_SHA1
}

register_definition() {
  if revision=$(aws ecs register-task-definition --container-definitions "$task_def" --family $family | $JQ '.taskDefinition.taskDefinitionArn'); then
    echo ">>>>>>>> Successfully register task <<<<<<<<<"
    echo "Revision: $revision"
  else
    echo "Failed to register task definition"
    return 1
  fi
}

get_ecs_status() {
  DECRIBED_SERVICE=$(aws ecs describe-services --cluster linkgov-app-cluster \
                                               --services linkgov-app-service);
  CURRENT_DESIRED_COUNT=$(echo $DECRIBED_SERVICE | $JQ ".services[0].desiredCount")
  CURRENT_TASK_REVISION=$(echo $DECRIBED_SERVICE | $JQ ".services[0].taskDefinition")
  CURRENT_RUNNING_TASK=$(echo $DECRIBED_SERVICE | $JQ ".services[0].runningCount")
  CURRENT_STALE_TASK=$(echo $DECRIBED_SERVICE | $JQ ".services[0].deployments | .[] | select(.taskDefinition != \"$CURRENT_TASK_REVISION\") | .taskDefinition")
  if -z "$CURRENT_STALE_TASK"; then
    CURRENT_STALE_TASK=0
  fi
}

configure_aws_cli
push_ecr_image
deploy_cluster
