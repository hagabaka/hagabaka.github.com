define(['text!model/projects.yaml', 'viewModel/keyword', 'yaml', 'markdown', 'knockout'],
function(file, Keyword, yaml, markdown, ko) {
  var projects = yaml.safeLoad(file);

  function Project(data) {
    var self = this;
    for(var field in data) {
      this[field] = data[field];
    }
    this.description = markdown.toHTML(data.description);
    this.technologies = data.technologies.map(function(name) {
      return self.associatedKeyword(name, 'technology');
    });
    this.skills = data.skills.map(function(name) {
      return self.associatedKeyword(name, 'skill');
    });
    this.id = this.name.replace(/\s/g, '-');
  }
  Project.prototype.associatedKeyword = function(name, type) {
    var keyword = Keyword.byName(name);
    keyword.type = type;
    keyword.projects.push(this);
    return keyword;
  };

  Project.list = projects.map(function(data) {
    return new Project(data);
  });

  return Project;
});
