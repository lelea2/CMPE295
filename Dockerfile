FROM node:4.6.2

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Super user
USER root

# Install dependencies
COPY package.json /usr/src/app
RUN npm install
RUN npm i -g bower

RUN echo '{ "allow_root": true }' > /root/.bowerrc

RUN bower install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8000

CMD ["npm", "start"]
