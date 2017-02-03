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

```

###### References

* https://github.com/nodejs/docker-node
