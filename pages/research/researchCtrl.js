app.controller('researchCtrl', function($scope) {
  var page = "Research";
  $scope.background = {'background-color': '#2b8441'};
  $scope.header = {
    title: page,
    link:  page.toLowerCase(),
    font:  "space",
    pages: [
      { link: page.toLowerCase(), title: page },
      { link: "home",     title: "Work in Progress" },
    ]
  };
});
