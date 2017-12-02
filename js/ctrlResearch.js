app.controller('researchCtrl', function($scope, $rootScope, $routeParams, $location, $http, $sce) {
  $rootScope.research = $rootScope.pageSet($scope, $routeParams.page, $rootScope.research, "Research", "#2b8441", 2, [
    { link: "research/topics",  title: "Topics" },
    { link: "research/publications",  title: "Publications" },
    { link: "research/teaching",  title: "Teaching" },
  ]);
  /*------------------------------
    helper functions
  ------------------------------*/
  function toLink(l) {
    if (l == "") return "";
    if (l.startsWith("arXiv:")) return l.replace("arXiv:", "https://arxiv.org/abs/");
    if (l.startsWith("ISBN:")) return "";
    return "https://doi.org/" + l;
  };
  function formatPublication(p) {
    return {
      pretitle:     p.authors + ". ",
      title:        p.title + ".",
      subtitle:     p.journal + ", " + p.year + ".",
      subsubtitle:  p.link,
      link:         toLink(p.link),
      text:         p.abstract,
      _template:    "box"
    }
  }
  function addByKeyword(content, data, color, getKeyword) {
    idx = new Map();
    for (i=0; i<content.length; ++i) idx[content[i].title] = i;
    for (d of data) {
      k = getKeyword(d);
      x = formatPublication(d);
      x._color = color;
      content[idx[k]].items.push(x)
    }
  };
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
        content = [];
        for (d of db.topics)
          content.push({title: d.title, text: d.abstract, _template: "section", items: []});
        addByKeyword(content, db.publications, "#eee", function(i) {return i.topic;});
        return content;
      };
      break;
    /*------------------------------
      research/publications
    ------------------------------*/
    case "publications":
      $scope.data.expand = true;
      getContents = function(db) {
        content = [];
        for (d of db.types)
          content.push({title: d, text: "", _template: "section", items: []});
        addByKeyword(content, db.publications, "#eee", function(i) {return i.type;});
        return content;
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
