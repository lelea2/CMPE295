FROM node:4.6.2

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Super user
USER root

# Install bower globally
RUN npm install -g bower

# Install dependencies
COPY package.json /usr/src/app
RUN npm install

# Install Bower Dependencies
COPY bower.json bower.json
COPY .bowerrc .bowerrc
RUN bower install --allow-root
#RUN echo '{ "allow_root": true }' > /root/.bowerrc
#RUN bower install

# Bundle app source
COPY . /usr/src/app

ENV NODE_ENV production
ENV PORT 8000

CMD ["sh", "-c", "echo ${DATABASE_URL}"]

CMD ["npm", "start"]
