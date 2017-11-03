app.controller('gamesCtrl', function($scope) {
  var page = "Games";
  $scope.background = {'background-color': '#e2d114'};
  $scope.header = {
    title: page,
    link:  page.toLowerCase(),
    font:  "celestia",
    pages: [
      { link: page.toLowerCase(), title: page },
      { link: "home",  title: "Work in Progress" },
    ]
  };
});
