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
      _template:    "box",
      _color:       "#eee",
      _date:        p._date
    };
  };
  function formatOther(p) {
    return {
      title:      p.title,
      subtitle:   p.subtitle,
      text:       "",
      _template:  "box",
      _color:     p.type == "Role" ? "#e5c7b5" : "#f4f4cb",
      _date:      p._date
    };
  };
  function addByKeyword(content, data, formatter, getKeyword) {
    idx = new Map();
    for (i=0; i<content.length; ++i) idx[content[i].title] = i;
    for (d of data) {
      k = getKeyword(d);
      if (! (k in idx)) continue;
      x = formatter(d);
      content[idx[k]].items.push(x)
    }
    for (c of content) c.items.sort(function(a,b) {return a._date < b._date ? 1 : -1;});
  };
  var getContents;
  switch ($routeParams.page) {
    /*------------------------------
      research
    ------------------------------*/
    case undefined:
      $scope.data.expand = false;
      getContents = function(db) {
        years = ["2010"]
        for (i=2013; i<=2017; ++i) years.push(String(i));
        content = [];
        for (i=years.length-1; i>=0; --i)
          content.push({title: years[i], text: "", _template: "section", items: []});
        addByKeyword(content, db.publications, formatPublication, function(i) {return ["Journal Papers", "Books", "Book Chapters"].includes(i.type) ? String(i.year) : undefined;});
        addByKeyword(content, db.news, formatOther, function(i) {return "20" + i._date.substr(0,2);});
        return content;
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
        addByKeyword(content, db.publications, formatPublication, function(i) {return i.topic;});
        return content;
      };
      break;
    /*------------------------------
      research/publications
    ------------------------------*/
    case "publications":
      $scope.data.expand = false;
      getContents = function(db) {
        content = [];
        for (d of db.types)
          content.push({title: d, text: "", _template: "section", items: []});
        addByKeyword(content, db.publications, formatPublication, function(i) {return i.type;});
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
