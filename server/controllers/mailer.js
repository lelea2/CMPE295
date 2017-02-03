/**
 * Handle email sending through sendgrid
 */

'use strict';

var helper = require('sendgrid').mail;

var from_email = new helper.Email("no-reply@gmail.com");
var to_email = new helper.Email("daomaikhanh1988@yahoo.com");
var subject = "Sending with SendGrid is Fun";
var content = new helper.Content("text/plain", "and easy to do anywhere, even with Node.js");
var mail = new helper.Mail(from_email, subject, to_email, content);

var sg = require('sendgrid')('process.env.SENDGRID_API_KEY');
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON()
});

sg.API(request, function(error, response) {
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
});

module.exports = {

};
