var pubSub = (function () {
  'use strict';
  var list = {};
  return {
    publish: function () {
      return {
        notify: function (topic) {
          var fn = list[topic];
          if (fn) {
            fn.forEach(
              function (f) {
                f();
              }
            );
          }
        }
      };
    },
    subscribe: function () {
      return {
        add: function (topic, cb) {
          var lst = list[topic] || [];

          lst.push(cb);

          list[topic] = lst;
        },
        get: function () {
          return list;
        }
      };
    }
  };
}());
