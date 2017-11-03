app.controller('researchCtrl', function($scope) {
  pageSet($scope, "Research", "#2b8441", "space", [
    { link: "research/publications",  title: "Publications" },
    { link: "research/teaching",  title: "Teaching" },
  ]);
});
