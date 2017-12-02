app.controller('researchCtrl', function($scope, $rootScope, $routeParams, $location, $http, $sce) {
  $rootScope.research = $rootScope.pageSet($scope, $routeParams.page, $rootScope.research, "Research", "#2b8441", 2, [
    { link: "research/topics",  title: "Topics" },
    { link: "research/publications",  title: "Publications" },
    { link: "research/teaching",  title: "Teaching" },
  ]);
  var getContents;
  switch ($routeParams.page) {
    /*------------------------------
      research
    ------------------------------*/
    case undefined:
      $scope.data.expand = false;
      getContents = function(db) {
        return db.teaching;
      };
      break;
    /*------------------------------
      research/topics
    ------------------------------*/
    case "topics":
      $scope.data.expand = false;
      getContents = function(db) {
        return db.teaching;
      };
      break;
    /*------------------------------
      research/publications
    ------------------------------*/
    case "publications":
      $scope.data.expand = true;
      getContents = function(db) {
        return db.teaching;
      };
      break;
    /*------------------------------
      research/teaching
    ------------------------------*/
    case "teaching":
      $scope.data.expand = true;
      getContents = function(db) {
        return db.teaching;
      };
      break;
    default:
      $location.url("research");
      return;
  }
  $rootScope.contentsSet($scope, $http, $sce, $routeParams.page, $rootScope.research, 'json/research.json', getContents);
});
