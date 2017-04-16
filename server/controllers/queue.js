/**
 * Helper function to create job queue
 */

'use strict';

console.log(process.env.REDIS_URL);

var RedisSMQ = require('rsmq');
var rsmq = new RedisSMQ( {host: '127.0.0.1', port: 6379, ns: 'rsmq'} );
var RSMQWorker = require( 'rsmq-worker' );
var worker = new RSMQWorker( 'cmpe295test' );

console.log('testing connect to redis queue');

// rsmq.createQueue( {qname: 'cmpe295test'}, function (err, resp) {
//   console.log(resp);
//   console.log(err);
//   if (resp === 1) {
//     console.log('>>> Create queue cmpe295test <<<<');
//   }
// });


//function to create new queue
function createQueue(queuename, cb) {
  //Create queue
  console.log('>>> Creating Redis queuename: ' + queuename);
  // console.log(rsmq);
  rsmq.createQueue( {qname: queuename}, function (err, resp) {
    console.log(resp);
    console.log(err);
    if (resp === 1) {
      console.log('queue created');
      cb(queuename);
    } else {
      console.log('>>> Error create message queue <<<<');
    }
  });
}

//Send message
function sendMessage(queuename, data, cb) {
  rsmq.sendMessage({qname: queuename, message: data}, function (err, resp) {
    if (resp) {
      console.log("Message sent. ID:", resp);
      cb(resp);
    }
  });
}

//Receive message
function recevieMessage(queuename, cb) {
  rsmq.receiveMessage({qname: 'queuename'}, function (err, resp) {
    if (resp.id) {
      cb(resp);
    } else {
      console.log('No messages for me...');
    }
  });
}

module.exports = {
  createQueue: createQueue,
  sendMessage: sendMessage,
  recevieMessage: recevieMessage
}

