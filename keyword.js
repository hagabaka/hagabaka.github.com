define(['definition', 'knockout'], function(Definition, ko) {
  function Keyword(name) {
    this.name = name;
    this.highlighted = ko.observable(false);
    this.definition = Definition.ofKeyword(this.name);
    this.id = name.replace(/\s/g, '-');
    this.projects = [];
  }

  var keywordByName = {};
  Keyword.byName = function(name) {
    if(!(name in keywordByName)) {
      keywordByName[name] = new Keyword(name);
    }
    return keywordByName[name];
  };
  Keyword.list = function() {
    return Object.keys(keywordByName).map(function(name) {
      return keywordByName[name];
    });
  };

  return Keyword;
});
