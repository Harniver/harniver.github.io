app.controller('musicCtrl', function($scope, $rootScope, $routeParams, $location, $http, $sce) {
  $rootScope.music = $rootScope.pageSet($scope, $routeParams.page, $rootScope.music, "Music", "#992121", 3, [
    { link: "music/wip",  title: "Work in Progress" },
  ]);
  var getContents;
  switch ($routeParams.page) {
    /*------------------------------
      music
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
      $location.url("music");
      return;
  }
  $rootScope.contentsSet($scope, $http, $sce, $routeParams.page, $rootScope.music, 'json/music.json', getContents);
});
