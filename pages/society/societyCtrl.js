app.controller('societyCtrl', function($scope) {
  var page = "Society";
  $scope.background = {'background-color': '#a0a0a0'};
  $scope.header = {
    title: page,
    link:  page.toLowerCase(),
    font:  "scala",
    pages: [
      { link: page.toLowerCase(), title: page },
      { link: "home",    title: "Work in Progress" },
    ]
  };
});
