import '@jsxcad/api-v1-pdf';

Square(30)
  .add(Square(30).move(15, 15))
  .outline()
  .Item()
  .Page()
  .view()
  .writePdf('squares');
