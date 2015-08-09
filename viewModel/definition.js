define(['text!model/definitions.yaml', 'yaml', 'markdown'], function(file, yaml, markdown) {
  var definitions = yaml.safeLoad(file);

  var missingDefinitions = {};

  return {
    ofKeyword: function(name) {
      if(name in definitions && definitions[name]) {
        return markdown.toHTML(definitions[name]);
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
