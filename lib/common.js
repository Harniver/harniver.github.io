function addAlpha(hex, alpha) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c= hex.substring(1).split('');
    if (c.length== 3) {
      c= [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c= '0x'+c.join('');
    return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
  }
  throw new Error('Bad Hex');
}

function pageSet($scope, pg, col, fnt, links) {
  links.unshift({ link: pg.toLowerCase(), title: pg })
  $scope.background = {'background-color': col};
  $scope.bgalpha = {'background-color': addAlpha(col, 0.2)};
  $scope.header = {
    title: pg,
    link:  pg.toLowerCase(),
    font:  fnt,
    pages: links
  };
}
