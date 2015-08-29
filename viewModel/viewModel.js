define(['viewModel/projects', 'viewModel/keyword', 'viewModel/definition', 'viewModel/pages',
        'viewModel/popup', 'knockout'],
function(projects, Keyword, Definition, pages, Popup, ko) {
  return function ViewModel() {
    var self = this;

    this.pages = pages;
    this.selectedProject = new Popup({
      item: ko.observable(projects[0]),
      type: 'project',
      visible: ko.observable(false)
    });
    this.selectedKeyword = new Popup({
      item: ko.observable(Keyword.list()[0]),
      type: 'keyword',
      visible: ko.observable(false)
    });
    this.popupVisible = ko.pureComputed(function() {
      return self.selectedProject.visible() || self.selectedKeyword.visible();
    });

    function selectItem(event, popupViewModel) {
      var target = event.target;
      var data = ko.dataFor(event.target);
      console.log(popupViewModel);
      popupViewModel.item(data);
      popupViewModel.visible(true);
      popupViewModel.bringToFront();
      event.stopPropagation();
    }
    this.selectKeyword = function(_, event) {
      selectItem(event, self.selectedKeyword);
    };
    this.selectProject = function(_, event) {
      selectItem(event, self.selectedProject);
    };
    this.activate = function() {
      ko.applyBindings(this);
    };
    Definition.listMissing();
  };
});

