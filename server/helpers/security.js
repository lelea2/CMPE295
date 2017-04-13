'use strict';

var Cookies = require('cookies'),
    crypto = require('crypto'),
    scheme = 'aes-256-cbc',
    key = 'linkgovsecret',
    USER_COOKIE = 'userInfo',
    TTL = 15 * 24 * 3600 * 1000; //15 days

module.exports = (function() {

  function encrypt(text) {
    var cipher = crypto.createCipher(scheme, key);
    var crypted = cipher.update(text, 'utf-8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
  }

  function decrypt(data){
    var decipher = crypto.createDecipher(scheme, key);
    var decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
  }

  /**
   * Function setting user cookie
   * @method  setUserCookie
   */
  function setUserCookie(req, data) {
    console.log('set user cookie, userId=' + data.id);
    try {
      var cookies = new Cookies(req, req.res);
      cookies.set(USER_COOKIE, encrypt(JSON.stringify(data)), {
        httpOnly: true,
        path: '/',
        expires: new Date(Date.now() + TTL),
        overwrite: true
      });
    } catch(ex) {
      console.log(ex);
    }
  }

  function _rawData(req) {
    var data = {};
    try {
      var cookies = new Cookies(req, req.res);
      var userCookie = cookies.get(USER_COOKIE);
      var strdata = decrypt(userCookie);
      data = JSON.parse(strdata);
    } catch(ex) {
    }
    return data;
  }

  /**
   * Function get user cookie
   * @param Express request object
   * @return userId
   */
  function getUserId(req) {
    var data = _rawData(req);
    return data.id || '';
  }

  function getRole(req) {
    var data = _rawData(req);
    return data.role || '';
  }

  /**
   * Check if current user is system admin
   */
  function isAdmin(req) {
    var data = _rawData(req);
    return data.isAdmin || false;
  }

  /**
   * Function handle user logout
   * @method logout
   */
  function logout(req) {
    try {
      var cookies = new Cookies(req, req.res);
      cookies.set(USER_COOKIE, null, {
        httpOnly: true,
        path: '/',
        expires: 0,
        overwrite: true
      });
    } catch(ex) {}
  }

  function userAuthenticated() {
    return function (req, res, next) {
      var userId = getUserId(req);
      if (userId === '' || userId.length !== 36) {
        next();
      } else {
        if (isAdmin(req)) {
          console.log('>>> Log in as admin <<<<');
          res.redirect(302, '/dashboard');
        } else if (getRole(req) === 'agent') {
          console.log('>>> Log in as agent <<<<');
          res.redirect(302, '/report');
        } else { //customer
          console.log('>>> Log in as customer <<<<');
          res.redirect(302, '/block');
        }
      }
    };
  }

  function userRequiredLoggedIn() {
    return function (req, res, next) {
      var userId = getUserId(req);
      if (userId !== '') {
        next();
      } else {
        res.redirect(302, '/signin');
      }
    };
  }

  /** Interface for user class **/
  return {
    setUserCookie: setUserCookie,
    getUserId: getUserId,
    getRole: getRole,
    isAdmin: isAdmin,
    logout: logout,
    userAuthenticated: userAuthenticated,
    userRequiredLoggedIn: userRequiredLoggedIn
  };

}());
