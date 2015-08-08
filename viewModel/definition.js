define(['json!model/definitions.json'], function(definitions) {
  var missingDefinitions = {};

  return {
    ofKeyword: function(name) {
      if(name in definitions) {
        return definitions[name];
      } else {
        missingDefinitions[name] = '';
        return '';
      }
    },

    listMissing: function() {
      if(Object.keys(missingDefinitions).length > 0) {
        console.log('Missing definitions: ');
        console.log(JSON.stringify(missingDefinitions, null, 2));
      }
    }
  };
});
