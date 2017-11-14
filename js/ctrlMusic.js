app.controller('musicCtrl', function($scope, $rootScope, $routeParams, $location, $http) {
  $rootScope.music = $rootScope.pageSet($scope, $routeParams.page, $rootScope.music, "Music", "#992121", 3, [
    { link: "music/wip",  title: "Work in Progress" },
  ]);
  if ($scope.contents.length > 0) return;
  var getContents;
  switch ($routeParams.page) {
    /*------------------------------
      music
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
      $location.url("music");
      return;
  }
  $rootScope.contentsSet($scope, $http, $routeParams.page, $rootScope.music, 'json/music.json', getContents);
});
