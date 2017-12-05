app.controller('researchCtrl', function($scope, $rootScope, $routeParams, $location, $http, $sce) {
  /*------------------------------
    helper functions
  ------------------------------*/
  function boxHeight(text) {
    if (! (text instanceof Array)) return undefined;
    let w = $(window).width();
    if (w <= 767) w *= 12 / 9;
    return "dim" + Math.floor((200 * text.join().length / w + 19 * text.length + 18)/100 + 1);
  }
  function getMonth(x) {
    return ["", "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"][parseInt(x._date.substr(3,2))];
  }
  function getColor(x) {
    switch (x.type) {
      case "Event":
        return "#e5c7b5";
      case "Position":
        return "#fff";
      case "Prize":
        return "#f4f4cb";
      case "Project":
        return "#ff7fc9";
      default:
        return "#eee";
    }
  }
  function toLink(l) {
    if (l == "") return "";
    if (l.startsWith("http")) return l;
    if (l.startsWith("ISBN:")) return "";
    if (l.startsWith("arXiv:")) return l.replace("arXiv:", "https://arxiv.org/abs/");
    return "https://doi.org/" + l;
  };
  /*------------------------------
    formatting functions
  ------------------------------*/
  function formatPublication(p) {
    return {
      teaser:       $scope.data.teaser ? "new paper!" : "",
      pretitle:     p.authors + ". ",
      title:        p.title + ".",
      subtitle:     p.journal + ", " + p.year + ".",
      subsubtitle:  p.link,
      link:         toLink(p.link),
      text:         p.abstract,
      topic:        p.topic,
      type:         p.type,
      _dim:         boxHeight(p.abstract),
      _show:        false,
      _template:    "box",
      _color:       "#eee",
      _date:        p._date
    };
  };
  function formatOther(p) {
    return {
      teaser:     $scope.data.teaser ? (p.teaser ? p.teaser : "new "+p.type.toLowerCase()+"!") : "",
      title:      p.title + ".",
      subtitle:   p.subtitle + ".",
      text:       ("text" in p) ? p.text : [],
      _dim:       boxHeight(p.text),
      _show:      false,
      _template:  "box",
      _color:     getColor(p),
      _date:      p._date
    };
  };
  function addByKeyword(content, data, numbers, formatter, getKeyword) {
    let idx = new Map();
    for (let i=0; i<content.length; ++i) idx[content[i].title] = i;
    for (const d of data) {
      const k = getKeyword(d);
      if (! (k in idx)) continue;
      const x = formatter(d);
      content[idx[k]].items.push(x)
    }
    for (let c of content) {
      c.items.sort(function(a,b) {return a._date < b._date ? 1 : -1;});
      if (numbers) {
        const pfx = "[" + c.title.replace(/[^A-Z]/g, "");
        for (let i=0; i<c.items.length; ++i) c.items[i].num = pfx + (c.items.length - i) + "] ";
      }
    }
  };
  /*------------------------------
    default values
  ------------------------------*/
  let def = {
    nphoto: 2,          // number of photos
    theme:  "research", // resources theme and overall title
    color:  "#2b8441",  // theme color
    teaser: false,      // if box teasers are present
    maxlen: 1000        // how many sections initially
  };
  let pages = [{
    /*------------------------------
      home page
    ------------------------------*/
    title:    "Home",
    maxlen:   1,
    teaser:   true,
    painter:  function(db) {
                let years = ["2010"];
                for (let i=2012; i<=2017; ++i) years.push(String(i));
                let k = 0;
                let content = [];
                for (let i=years.length-1; i>=0; --i)
                  content.push({title: years[i], text: "", _template: "section", items: [], num:++k});
                addByKeyword(content, db.publications, false, formatPublication, function(i) {
                  return ["Journal Papers", "Books", "Book Chapters"].includes(i.type) ? String(i.year) : undefined;
                });
                addByKeyword(content, db.news, false, formatOther, function(i) {
                  return "20" + i._date.substr(0,2);
                });
                for (let c of content) if (c.items.length > 4) {
                  for (let i=0; i<c.items.length; ++i)
                    if (i==0 || getMonth(c.items[i]) != getMonth(c.items[i-1])) {
                      c.items.splice(i, 0, {title: getMonth(c.items[i]), _template: "subsection"});
                      i++;
                    }
                }
                return content;
              }
  }, {
    /*------------------------------
      topics page
    ------------------------------*/
    title:    "Topics",
    painter:  function(db) {
                let k = 0;
                let content = [];
                for (const d of db.topics)
                  content.push({title: d.title, text: d.abstract, _template: "section", items: [], num:++k});
                addByKeyword(content, db.publications, true, formatPublication, function(i) {
                  return i.topic;
                });
                return content;
              }
  }, {
    /*------------------------------
      publications page
    ------------------------------*/
    title:   "Publications",
    painter:  function(db) {
                let k = 0;
                let content = [];
                for (const d of db.types)
                  content.push({title: d, text: "", _template: "section", items: [], num:++k});
                addByKeyword(content, db.publications, true, formatPublication, function(i) {
                  return i.type;
                });
                return content;
              }
  }, {
    /*------------------------------
      events page
    ------------------------------*/
    title:    "Events",
    painter:  function(db) {
                let content = [];
                for (let d of db.news) if (d.type == "Event")
                  content.push(formatOther(d));
                return content;
              }
  }, {
    /*------------------------------
      teaching page
    ------------------------------*/
    title:   "Teaching",
    painter:  function(db) {
                for (let d of db.teaching) {
                  d._template = "box";
                  d._color = "#e5c7b5";
                  d._dim = boxHeight(d.text);
                  d._show = true;
                }
                return db.teaching;
              }
  }];
  $rootScope.pageSet($scope, $location, $http, $sce, $routeParams.page, def, pages);
});
