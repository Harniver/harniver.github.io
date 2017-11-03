app.controller('musicCtrl', function($scope) {
  var page = "Music";
  $scope.background = {'background-color': '#992121'};
  $scope.header = {
    title: page,
    link:  page.toLowerCase(),
    font:  "note",
    pages: [
      { link: page.toLowerCase(), title: page },
      { link: "home",  title: "Work in Progress" },
    ]
  };
});
