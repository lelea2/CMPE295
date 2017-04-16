(function() {
  var register = function(Handlebars) {

    /************* BEGIN HELPERS *************/
    var helpers = {
      json: function(obj) {
        return JSON.stringify(obj);
      },

      ifIn: function(elem, list, options) {
        if(list.indexOf(elem) > -1) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
      equal: function(lvalue, rvalue, options) {
        //console.log(lvalue);
        //console.log(rvalue);
        if (arguments.length < 3)
          throw new Error("Handlebars Helper equal needs 2 parameters");
        if( lvalue != rvalue ) {
          return options.inverse(this);
        } else {
          return options.fn(this);
        }
      },

      eq: function(val, val2, block) {
        if(val == val2){
          return block(this);
        }
      },

      'if_eq': function(a, b, opts) {
        if(a == b) {// Or === depending on your needs
          return opts.fn(this);
        } else {
          return opts.inverse(this);
        }
      },

      //This is in order to maintain angular syntax
      'raw-helper': function(options) {
        return options.fn();
      },

      'helperMissing': function(/* [args, ] options */) {
        var options = arguments[arguments.length - 1];
        console.log(options);
        // throw new Handlebars.Exception('Unknown field: ' + options.name);
      }
    };

    /************* END HELPERS *************/

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
      // register helpers
      for (var prop in helpers) {
        Handlebars.registerHelper(prop, helpers[prop]);
      }
    } else {
      // just return helpers object if we can't register helpers here
      return helpers;
    }
  };

  // client
  if (typeof window !== "undefined") {
    register(Handlebars);
  } else { // server
    module.exports.register = register;
    module.exports.helpers = register(null);
  }
})();
