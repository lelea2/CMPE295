FROM node:4.6.2

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Super user
USER root

# Install dependencies
COPY package.json /usr/src/app
RUN npm install

COPY bower.json .bowerrc* /usr/src/app/
RUN npm i -g bower
RUN echo '{ "allow_root": true }' > .bowerrc
RUN bower install

# Bundle app source
COPY . /usr/src/app

ENV NODE_ENV production

EXPOSE 8000

CMD ["npm", "start"]
