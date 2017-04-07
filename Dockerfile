FROM node:4.6.2

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Super user
USER root

# Install bower globally
RUN npm install -g bower

# Install Bower Dependencies
COPY bower.json bower.json
COPY .bowerrc .bowerrc
RUN echo '{ "allow_root": true, "directory": "public/lib" }' > .bowerrc
RUN bower install

# Install NPM dependencies
COPY package.json /usr/src/app
RUN npm install

# Bundle app source
COPY . /usr/src/app

ENV NODE_ENV production
ENV PORT 8000

CMD ["sh", "-c", "echo ${DATABASE_URL}"]

CMD ["npm", "start"]
