define(['text!model/order.yaml', 'yaml'], function(file, yaml) {
  var order = yaml.safeLoad(file);
  var missing = [];
  return {
    ofKeyword: function(name) {
      var index = order.indexOf(name);
      if(index < 0) {
        missing.push(name);
      }
      return index;
    },
    missing: missing
  };
});

