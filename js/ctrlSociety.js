app.controller('societyCtrl', function($scope, $rootScope, $routeParams, $location, $http) {
  $rootScope.society = $rootScope.pageSet($scope, $routeParams.page, $rootScope.society, "Society", "#a0a0a0", 3, [
    { link: "society/wip",  title: "Work in Progress" },
  ]);
  if ($scope.contents.length > 0) return;
  var getContents;
  switch ($routeParams.page) {
    /*------------------------------
      games
    ------------------------------*/
    case undefined:
      getContents = function(db) {
        return db;
      };
      break;
    /*------------------------------
      wip
    ------------------------------*/
    case "wip":
      getContents = function(db) {
        return db;
      };
      break;
    default:
      $location.url("society");
      return;
  }
  $rootScope.contentsSet($scope, $http, $routeParams.page, $rootScope.society, 'json/society.json', getContents);
});
