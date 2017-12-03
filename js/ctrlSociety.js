app.controller('societyCtrl', function($scope, $rootScope, $routeParams, $location, $http, $sce) {
  $rootScope.society = $rootScope.pageSet($scope, $routeParams.page, $rootScope.society, "Society", "#a0a0a0", 3, [
    { link: "society/wip",  title: "Work in Progress" },
  ]);
  let getContents;
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
      $location.url("society");
      return;
  }
  $rootScope.contentsSet($scope, $http, $sce, $routeParams.page, $rootScope.society, 'json/society.json', getContents);
});
