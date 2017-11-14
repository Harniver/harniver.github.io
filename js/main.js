var app = angular.module("siteApp", ['ngRoute', 'duScroll']);
app.value('duScrollOffset', 60);

/* ------------------------------------------------------------------------------
	Router
-------------------------------------------------------------------------------*/

app.config(function($routeProvider) {
  $routeProvider
   .when("/home", {
     templateUrl : "html/home.html"
    })
   .when("/research/:page*?", {
     templateUrl : "html/main.html",
     controller : "researchCtrl"
    })
   .when("/music/:page*?", {
     templateUrl : "html/main.html",
     controller : "musicCtrl"
    })
   .when("/games/:page*?", {
     templateUrl : "html/main.html",
     controller : "gamesCtrl"
    })
   .when("/society/:page*?", {
     templateUrl : "html/main.html",
     controller : "societyCtrl"
    })
   .otherwise({
     redirectTo: "/home"
    })
});

app.run(function($rootScope) {
  $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
    window.scrollTo(0, 0);
  });

  /* ------------------------------------------------------------------------------
    Helpers
  -------------------------------------------------------------------------------*/

  function normalize(s) {
    return s.toLowerCase().replace(/\s/g, '-');
  };

  function addAlpha(hex, alpha, value) {
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      var c = hex.substring(1).split('');
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x'+c.join('');
      c = [(c>>16)&255, (c>>8)&255, c&255];
      if (value < 1)
        c = [Math.trunc(c[0]*value), Math.trunc(c[1]*value), Math.trunc(c[2]*value)]
      return 'rgba('+c.join(',')+','+alpha+')';
    }
    throw new Error('Bad Hex');
  };

  function addKeys(items) {
    k = ""
    for (i of items) {
      i.ref = normalize(i.title);
      i.key = i.title;
      if (i.text != undefined) i.key += " " + i.text;
      if (i.items != undefined) i.key += addKeys(i.items);
      k += " " + i.key;
    }
    return k;
  };

  /* ------------------------------------------------------------------------------
    Controllers
  -------------------------------------------------------------------------------*/

  $rootScope.pageSet = function($scope, page, cache, pagetitle, color, nphoto, links) {
    $scope.contents = [];
    if (cache != undefined) {
      if (cache.contents.has(page))
        $scope.contents = cache.contents.get(page);
      return $scope.data = cache;
    }
    console.log(pagetitle + ": computing header");
    var lowtitle = normalize(pagetitle);
    links.unshift({ link: lowtitle, title: pagetitle })
    $scope.data = {};
    $scope.data.background = {'background-color': color};
    $scope.data.bgalpha = {
      'background-color': color,
      'box-shadow': '0px 3px 13px 2px ' + addAlpha(color,0.2,0.4),
      'margin-bottom': '30px'
    };
    $scope.data.title = pagetitle;
    $scope.data.theme = lowtitle;
    $scope.data.pages = links;
    $scope.data.nphoto = nphoto;
    $scope.data.pi = 0;
    $scope.data.searchKey = "";
    $scope.data.contents = new Map();
    $scope.data.affix = function() {
      $('#scroller').affix({
        offset: {
          top: 899, //$('#scroller').offset().top
          bottom: 90 // footer height
        }
      });
    };
    return $scope.data;
  };

  $rootScope.contentsSet = function($scope, $http, page, cache, file, extractor) {
    if (cache.db != undefined) {
      console.log(file + ": extracting " + page);
      $scope.contents = extractor(cache.db);
      addKeys($scope.contents);
      cache.contents.set(page, $scope.contents);
      return;
    }
    console.log(file + ": downloading");
    $http.get(file).then(function (success) {
      cache.db = success.data;
      console.log(file + ": extracting " + page);
      $scope.contents = extractor(cache.db);
      addKeys($scope.contents);
      cache.contents.set(page, $scope.contents);
    }, function (error) {
      console.log(file + ": failed download\n" + JSON.stringify(error));
    });
  };
});
