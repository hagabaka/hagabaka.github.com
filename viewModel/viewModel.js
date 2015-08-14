define(['viewModel/project', 'viewModel/keyword', 'viewModel/definition', 'viewModel/pages',
        'knockout'],
function(Project, Keyword, Definition, pages, ko) {
  return function ViewModel() {
    var self = this;

    this.projects = ko.pureComputed(function() {
      return Project.list;
    });
    this.technologies = Keyword.list().filter(function(keyword) {
      return keyword.type === 'technology';
    });
    this.skills = Keyword.list().filter(function(keyword) {
      return keyword.type === 'skill';
    });
    this.pages = this.pageSwitcher = pages;

    this.popup = {
      component: ko.observable(null),
      item: ko.observable(null),
      type: ko.observable(null),
      parentPage: ko.observable(null),
      close: function() {
        self.popup.component(null);
      },
      switchPage: function() {
        self.pages.current(self.popup.parentPage());
      }
    };

    function selectItem(event, component, type, page) {
      var target = event.target;
      var data = ko.dataFor(event.target);
      if(data.typeName === 'project' || data.typeName === 'keyword') {
        self.popup.close();
        self.popup.item(data);
        self.popup.type(type);
        self.popup.parentPage(page);
        self.popup.component(data.typeName);
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

