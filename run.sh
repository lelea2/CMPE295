#!/bin/bash
export PORT=8000;
if [ -z $NODE_ENV ]; then
  export NODE_ENV=development;
fi

nodemon index.js
