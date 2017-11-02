unitsize(1cm);
settings.tex = "pdflatex";

picture pic;
pen p = black+8+squarecap;

draw(pic, (-1.2, -1.1) -- (3.2, 1.1), invisible);
draw(pic, arc((0,0), 1, 80, 360), p);
draw(pic, (0,0) -- (2,0), p);
draw(pic, (1,1) -- (3,-1), p);

add(xscale(0.5)*pic);
