define(['viewModel/pages', 'knockout'], function(pages, ko) {
  var componentNames = ['pageSwitcher'].concat(pages.map(function(page) {
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
        viewModel: function() {return self.viewModel[name];},
        synchronous: true
      });
    });
  };

  return Components;
});

