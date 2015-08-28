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

    function selectItem(event, component, type, page) {
      var target = event.target;
      var data = ko.dataFor(event.target);
      if(data.typeName === 'project') {
        self.selectedProject.item(data);
        self.selectedProject.visible(true);
        self.selectedProject.bringToFront();
      } else if(data.typeName === 'keyword') {
        self.selectedKeyword.item(data);
        self.selectedKeyword.visible(true);
        self.selectedKeyword.bringToFront();
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

