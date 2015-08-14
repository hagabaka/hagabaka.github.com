define(['viewModel/project', 'viewModel/keyword', 'viewModel/definition', 'viewModel/pages',
        'viewModel/popup', 'knockout'],
function(Project, Keyword, Definition, pages, Popup, ko) {
  return function ViewModel() {
    var self = this;

    this.pages = pages;
    this.selectedProject = {item: ko.observable()};
    this.selectedKeyword = {item: ko.observable()};
    this.popupVisible = ko.pureComputed(function() {
      return self.selectedProject.item() || self.selectedKeyword.item();
    });

    function selectItem(event, component, type, page) {
      var target = event.target;
      var data = ko.dataFor(event.target);
      if(data.typeName === 'project') {
        self.selectedProject.item(data);
      } else if(data.typeName === 'keyword') {
        self.selectedKeyword.item(data);
      }
      return false;
    }
    this.selectTechnology = function(_, event) {
      selectItem(event, 'keyword', 'technology', 'technologies');
    };
    this.selectSkill = function(_, event) {
      selectItem(event, 'keyword', 'skill', 'skills');
    };
    this.selectProject = function(_, event) {
      selectItem(event, 'project', 'project', 'projects');
      return true;
    };
    this.activate = function() {
      ko.applyBindings(this);
    };
    Definition.listMissing();
  };
});

