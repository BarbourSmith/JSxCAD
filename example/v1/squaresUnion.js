await union(
  difference(Square(10), Square(9)).move(-2, -2),
  difference(Square(10), Square(9)).move(2, 2)
).writePdf('tmp/squaresUnion.pdf');
