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
}

function pageSet($scope, pg, col, fnt, links) {
  links.unshift({ link: pg.toLowerCase(), title: pg })
  $scope.background = {'background-color': col};
  $scope.bgalpha = {
    'background-color': col,
    'box-shadow': '0px 3px 13px 2px '+addAlpha(col,0.2,0.4)
  };
  $scope.header = {
    title: pg,
    link:  pg.toLowerCase(),
    font:  fnt,
    pages: links
  };
}
