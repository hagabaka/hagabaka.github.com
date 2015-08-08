define(['knockout'], function(ko) {
  var pages = [
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
  pages.current = ko.observable(pages[0].name);

  return pages;
});

