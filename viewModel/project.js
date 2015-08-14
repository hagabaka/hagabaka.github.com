define(['text!model/projects.yaml', 'viewModel/keyword', 'yaml', 'markdown', 'knockout'],
function(file, Keyword, yaml, markdown, ko) {
  var projects = yaml.safeLoad(file);

  function Project(data) {
    this.isProject = true;
    var self = this;
    for(var field in data) {
      this[field] = data[field];
    }
    data.story = data.story || '';
    console.log(JSON.stringify(data.story));
    this.story = markdown.toHTML(data.story, 'Maruku');
    this.technologies = data.technologies.map(function(name) {
      return self.associatedKeyword(name, 'technology');
    });
    this.skills = data.skills.map(function(name) {
      return self.associatedKeyword(name, 'skill');
    });
    this.id = this.name.replace(/\s/g, '-');
    this.screenshot = 'screenshot/' + this.id + '.png';
  }
  Project.prototype.associatedKeyword = function(name, type) {
    var keyword = Keyword.byName(name);
    keyword.type = type;
    keyword.projects.push(this);
    return keyword;
  };
  Project.prototype.typeName = 'project';

  Project.list = projects.map(function(data) {
    return new Project(data);
  });

  return Project;
});
