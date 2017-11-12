app.controller('musicCtrl', function($scope) {
  pageSet($scope, "Music", "#992121", 3, [
    { link: "home",  title: "Work in Progress" },
  ], [
    {title: "Web Design", text: "Here it is the web design.", template: "section", items: [
      {title: "Nice achievement", text: "So so nice."},
    ]},
    {title: "Web Development", text: "And now beware the web development.", template: "section", items: [
      {title: "Cool stuff.", text: "Supermega cool."},
    ]},
  ]);
});
