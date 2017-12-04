var app = angular.module("siteApp", ['ngRoute', 'duScroll', 'ngAnimate']);
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

app.directive("mathjaxBind", function() {
  return {
    restrict: "A",
    controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
      $scope.$watch($attrs.mathjaxBind, function(texExpression) {
        $element.html(texExpression);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, $element[0]]);
      });
    }]
  };
});

app.run(function($rootScope) {
  $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
    window.scrollTo(0, 0);
  });

  /* ------------------------------------------------------------------------------
    Helpers
  -------------------------------------------------------------------------------*/
  
  function deepCopy(o) {
    return JSON.parse(JSON.stringify(o));
  };

  function normalize(s) {
    return s.toLowerCase().replace(/\s/g, '-');
  };

  function addAlpha(hex, alpha, value) {
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      let c = hex.substring(1).split('');
      if (c.length == 3)
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      c = '0x'+c.join('');
      c = [(c>>16)&255, (c>>8)&255, c&255];
      if (value < 1)
        c = [Math.trunc(c[0]*value), Math.trunc(c[1]*value), Math.trunc(c[2]*value)]
      return 'rgba('+c.join(',')+','+alpha+')';
    }
    throw new Error('Bad Hex');
  };

  function addKeys(items) {
    let k = ""
    for (const i of items) {
      i._ref = normalize(i.title);
      if ("_key" in i) {
        k += " " + i._key;
        continue;
      }
      i._key = "";
      for (const p in i) {
        if (p[0] == "_") continue;
        if (i[p] instanceof Array && i[p][0] instanceof Object) i._key += addKeys(i[p]);
        else i._key += " " + i[p];
      }
      k += i._key;
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
    const lowtitle = normalize(pagetitle);
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

  $rootScope.contentsSet = function($scope, $http, $sce, page, cache, file, extractor) {
    if ($scope.contents.length > 0) return;
    if (cache.db != undefined) {
      console.log(file + ": extracting " + page);
      $scope.contents = extractor(deepCopy(cache.db));
      addKeys($scope.contents);
      cache.contents.set(page, $scope.contents);
      return;
    }
    console.log(file + ": downloading");
    $http.get(file).then(function (success) {
      cache.db = success.data;
      console.log(file + ": extracting " + page);
      $scope.data.address = cache.db.address.map($sce.trustAsHtml);
      $scope.contents = extractor(deepCopy(cache.db));
      addKeys($scope.contents);
      cache.contents.set(page, $scope.contents);
    }, function (error) {
      console.log(file + ": failed download\n" + JSON.stringify(error));
    });
  };
});
