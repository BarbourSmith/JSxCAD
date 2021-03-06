import { orbitDisplay } from './orbitDisplay.js';
import { staticDisplay } from './staticDisplay.js';

/*
export const toCanvasFromWebglCanvas = (canvas, webglCanvas) => {
  const { width, height } = webglCanvas;
  outCanvas.width = width;
  outCanvas.height = height;
  const outContext = outCanvas.getContext('2d');
  outContext.drawImage(webglCanvas, 0, 0, width, height);
  return outCanvas;
};
*/

const UP = [0, 0.0001, 1];

export const staticView = async (
  shape,
  {
    target = [0, 0, 0],
    position = [0, 0, 0],
    up = UP,
    width = 256,
    height = 128,
    withAxes = false,
    withGrid = false,
    definitions,
    canvas,
  } = {}
) => {
  const { canvas: rendererCanvas } = await staticDisplay(
    {
      view: { target, position, up },
      canvas,
      geometry: shape.toDisplayGeometry(),
      withAxes,
      withGrid,
      definitions,
    },
    { offsetWidth: width, offsetHeight: height }
  );
  // const canvas = toCanvasFromWebglContext(renderer.getContext());
  // canvas.style = `width: ${width}px; height: ${height}px`;
  // const canvas = renderer.domElement;
  // renderer.forceContextLoss();
  return rendererCanvas;
};

export const dataUrl = async (shape, options) => {
  const dataUrl = (await staticView(shape, options)).toDataURL('png');
  return dataUrl;
};

export const image = async (shape, options) => {
  const image = document.createElement('img');
  const dataUrl = (await staticView(shape, options)).toDataURL('png');
  image.src = dataUrl;
  return image;
};

export const orbitView = async (
  shape,
  { target, position, up = UP, width = 256, height = 128, definitions } = {}
) => {
  const container = document.createElement('div');
  container.style = `width: ${width}px; height: ${height}px`;

  const geometry = shape.toKeptGeometry();
  const view = { target, position, up };

  await orbitDisplay({ geometry, view, definitions }, container);
  return container;
};
