define(['project', 'keyword', 'definition', 'pages', 'knockout'],
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

    function selectItem(event, className, switchToPage) {
      var target = event.target;
      if(target.classList.contains(className)) {
        var data = ko.dataFor(event.target);
        self.pages.current(switchToPage);
        setTimeout(function() {
          location.hash = data.id;
        }, 0);
      }
      return false;
    }
    this.selectTechnology = function(_, event) {
      selectItem(event, 'name', 'technologies');
    };
    this.selectSkill = function(_, event) {
      selectItem(event, 'name', 'skills');
    };
    this.selectProject = function(_, event) {
      selectItem(event, 'project', 'projects');
    };
    this.activate = function() {
      ko.applyBindings(this);
    };
    Definition.listMissing();
  };
});

