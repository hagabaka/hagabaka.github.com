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
      var options = {
        template: {require: 'text!./view/' + name + '.html'},
      };
      if(['project', 'keyword'].indexOf(name) < 0) {
        options.viewModel = {require: 'viewModel/' + name};
      }
      ko.components.register(name, options);
    });
  };

  return Components;
});

