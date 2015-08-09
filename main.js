requirejs.config({
  baseUrl: location.href.replace(/[^\/]*$/, ''),
  paths: {
    jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery',
    knockout: 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-debug',
    text: 'lib/text',
    json: 'lib/json',
    domReady: 'lib/domReady',
    yaml: 'lib/js-yaml',
    markdown: 'lib/markdown'
  },
});

requirejs(['viewModel/components', 'viewModel/viewModel'], function(Components, ViewModel) {
  var viewModel = new ViewModel();
  var components = new Components(viewModel);
  components.register();

  require(['jquery', 'domReady!'], function() {
    viewModel.activate();
    window.viewModel = viewModel;
  });
});

