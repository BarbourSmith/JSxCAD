import '@jsxcad/api-v1-pdf';

const length = 30;
Square(length).Page().view().writePdf('square');
