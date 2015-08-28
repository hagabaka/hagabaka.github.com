define(['text!model/projects.yaml', 'yaml', 'viewModel/project'],
function(file, yaml, Project) {
  var projects = yaml.safeLoad(file);
  var result = projects.map(function(data) {
    return new Project(data);
  });
  // Knockout component expects {instance: result}
  result.instance = result;
  return result;
});

