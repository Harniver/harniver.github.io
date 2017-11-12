app.controller('researchCtrl', function($scope) {
  pageSet($scope, "Research", "#2b8441", 2, [
    { link: "research/publications",  title: "Publications" },
    { link: "research/teaching",  title: "Teaching" },
  ], [
    {title: "Web Design", text: "Here it is the web design.", template: "section", items: [
      {title: "Nice achievement", text: "So so nice."},
    ]},
    {title: "Web Development", text: "And now beware the web development.", template: "section", items: [
      {title: "Cool stuff.", text: "Supermega cool."},
    ]},
  ]);
});
