import '@jsxcad/api-v1-stl';

BoxFromCorners([0, 0, 0], [40, 4, 1])
  .with(
    BoxFromCorners([0, 1, 1], [40, 3, 2.5]),
    BoxFromCorners([0, 10, 0], [40, 14, 1]),
    BoxFromCorners([0, 10, 1], [40, 11, 2.5]),
    BoxFromCorners([0, 13, 1], [40, 14, 2.5])
  )
  .item()
  .Page()
  .view()
  .writeStl('interlock-proof-of-concept');
