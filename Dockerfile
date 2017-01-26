FROM node:4.6.2

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY ./usr/src/app
RUN npm install
RUN bower install

EXPOSE 5000

CMD ["npm", "start"]
