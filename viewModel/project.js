define(['viewModel/keyword', 'markdown'],
function(Keyword, markdown) {
  function Project(data) {
    var self = this;
    for(var field in data) {
      this[field] = data[field];
    }
    data.story = data.story || '';
    this.story = markdown.toHTML(data.story, 'Maruku');
    this.technologies = data.technologies.map(function(name) {
      return self.associatedKeyword(name, 'technology');
    });
    this.skills = data.skills.map(function(name) {
      return self.associatedKeyword(name, 'skill');
    });
    this.id = this.name.replace(/\s/g, '-');
    this.screenshot = 'image/' + this.id + '.png';
  }
  Project.prototype.associatedKeyword = function(name, type) {
    var keyword = Keyword.byName(name);
    keyword.type = type;
    keyword.projects.push(this);
    return keyword;
  };
  Project.prototype.typeName = 'project';

  return Project;
});
