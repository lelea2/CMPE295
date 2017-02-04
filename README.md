### CMPE295 - Linked.Gov

##### Government social network and workflow defined

[![CircleCI](https://circleci.com/gh/lelea2/CMPE295.svg?style=svg)](https://circleci.com/gh/lelea2/CMPE295)

###### Demo

![alt tag](https://github.com/lelea2/CMPE295/blob/master/demo/swagger.png)


###### How to run application

```
//Install node from https://nodejs.org/en/download/

### set up application
npm install -g bower
bower i
npm i

### Run application
PORT=8000 nodemon index.js

### Bash
chmod +x run.sh
./run.sh

```


###### Create your .env file in the main folder for development

```
DATABASE_URL=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PW=

S3_BUCKET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
```

###### Technology

* MariaDB
* Neo4j (https://neo4j.com/developer/javascript/)
* Sequelize (http://docs.sequelizejs.com/en/v3/)
* ExpressJS
* Swagger (https://github.com/fliptoo/swagger-express)
* Angular
* HandleBar
* Twitter Bootstrap


###### Deployment

```
//Encrypted .env file
openssl aes-256-cbc -in .env -out secret-env-cipher


```

###### References for deployment set up

* https://github.com/nodejs/docker-node
* https://hub.docker.com/r/digitallyseamless/nodejs-bower-grunt/~/dockerfile/
* https://www.promptworks.com/blog/handling-environment-secrets-in-docker-on-the-aws-container-service
* https://blog.codeship.com/zero-downtime-deployment-with-aws-ecs-and-elb/
