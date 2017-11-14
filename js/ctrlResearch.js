app.controller('researchCtrl', function($scope, $rootScope, $routeParams, $location, $http) {
  $rootScope.research = $rootScope.pageSet($scope, $routeParams.page, $rootScope.research, "Research", "#2b8441", 2, [
    { link: "research/publications",  title: "Publications" },
    { link: "research/teaching",  title: "Teaching" },
  ]);
  if ($scope.contents.length > 0) return;
  var getContents;
  switch ($routeParams.page) {
    /*------------------------------
      research
    ------------------------------*/
    case undefined:
      getContents = function(db) {
        return db;
      };
      break;
    /*------------------------------
      research/publications
    ------------------------------*/
    case "publications":
      getContents = function(db) {
        return db;
      };
      break;
    /*------------------------------
      research/teaching
    ------------------------------*/
    case "teaching":
      getContents = function(db) {
        return db;
      };
      break;
    default:
      $location.url("research");
      return;
  }
  $rootScope.contentsSet($scope, $http, $routeParams.page, $rootScope.research, 'json/research.json', getContents);
});
