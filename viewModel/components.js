define(['viewModel/pages', 'knockout'], function(pages, ko) {
  var componentNames = ['project', 'keyword', 'popup', 'pageSwitcher'].concat(pages.map(
  function(page) {
    return page.name;
  }));

  function Components(viewModel) {
    this.viewModel = viewModel;
  }

  Components.prototype.register = function() {
    var self = this;

    componentNames.forEach(function(name) {
      ko.components.register(name, {
        template: {require: 'text!./view/' + name + '.html'},
        viewModel: function(params) {
          return params || self.viewModel[name];
        },
        synchronous: true
      });
    });
  };

  return Components;
});

