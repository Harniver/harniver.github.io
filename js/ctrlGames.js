app.controller('gamesCtrl', function($scope, $rootScope, $routeParams, $location, $http) {
  $rootScope.games = $rootScope.pageSet($scope, $routeParams.page, $rootScope.games, "Games", "#ccbc14", 2, [
    { link: "games/wip",  title: "Work in Progress" },
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
      $location.url("games");
      return;
  }
  $rootScope.contentsSet($scope, $http, $routeParams.page, $rootScope.games, 'json/games.json', getContents);
});
