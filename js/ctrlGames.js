app.controller('gamesCtrl', function($scope, $rootScope, $routeParams, $location, $http, $sce) {
  $rootScope.games = $rootScope.pageSet($scope, $routeParams.page, $rootScope.games, "Games", "#ccbc14", 2, [
    { link: "games/wip",  title: "Work in Progress" },
  ]);
  var getContents;
  switch ($routeParams.page) {
    /*------------------------------
      games
    ------------------------------*/
    case undefined:
      getContents = function(db) {
        return db.contents;
      };
      break;
    /*------------------------------
      wip
    ------------------------------*/
    case "wip":
      getContents = function(db) {
        return db.contents;
      };
      break;
    default:
      $location.url("games");
      return;
  }
  $rootScope.contentsSet($scope, $http, $sce, $routeParams.page, $rootScope.games, 'json/games.json', getContents);
});
