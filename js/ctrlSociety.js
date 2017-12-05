app.controller('societyCtrl', function($scope, $rootScope, $routeParams, $location, $http, $sce) {
  /*------------------------------
    default values
  ------------------------------*/
  let def = {
    nphoto: 3,          // number of photos
    theme:  "society",  // resources theme and overall title
    color:  "#a0a0a0",  // theme color
  };
  let pages = [{
    /*------------------------------
      home page
    ------------------------------*/
    title:    "Home",
    painter:  function(db) {
                return db.contents;
              }
  }, {
    /*------------------------------
      topics page
    ------------------------------*/
    title:    "Work in Progress",
    painter:  function(db) {
                return db.contents;
              }
  }];
  $rootScope.pageSet($scope, $location, $http, $sce, $routeParams.page, def, pages);
});
