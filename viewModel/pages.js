define(['knockout'], function(ko) {
  var pages = [
    {
      name: 'about',
      label: 'Me',
    },
    {
      name: 'projects',
      label: 'Projects'
    },
    {
      name: 'skills',
      label: 'Skills',
    },
    {
      name: 'technologies',
      label: 'Technologies',
    },
  ];
  pages.current = ko.observable('projects');

  return pages;
});

