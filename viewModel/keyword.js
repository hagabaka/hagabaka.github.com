define(['viewModel/definition', 'viewModel/order', 'knockout'],
function(Definition, order, ko) {
  function Keyword(name) {
    this.isKeyword = true;
    this.name = name;
    this.highlighted = ko.observable(false);
    this.definition = Definition.ofKeyword(this.name);
    this.id = name.replace(/\s/g, '-');
    this.projects = [];
    this.order = order.ofKeyword(this.name);
  }

  var keywordByName = {};
  Keyword.byName = function(name) {
    if(!(name in keywordByName)) {
      keywordByName[name] = new Keyword(name);
    }
    return keywordByName[name];
  };
  Keyword.list = function(type) {
    return Object.keys(keywordByName).map(function(name) {
      return keywordByName[name];
    }).filter(function(keyword) {
      return !type || type === keyword.type;
    }).sort(function(keyword1, keyword2) {
      return keyword1.order - keyword2.order;
    });
  };
  Keyword.prototype.typeName = 'keyword';

  return Keyword;
});
