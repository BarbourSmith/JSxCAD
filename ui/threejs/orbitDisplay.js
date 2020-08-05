/* global ResizeObserver */

import { GEOMETRY_LAYER, SKETCH_LAYER } from './layers.js';
import { buildScene, createResizer } from './scene.js';

import { Layers } from 'three';
import { buildMeshes } from './mesh.js';
import { buildTrackballControls } from './controls.js';
import { moveToFit } from './moveToFit.js';
import { toThreejsGeometry } from '@jsxcad/convert-threejs';

export const orbitDisplay = async (
  { view = {}, geometry, canvas } = {},
  page
) => {
  let datasets = [];
  const width = page.offsetWidth;
  const height = page.offsetHeight;

  const geometryLayers = new Layers();
  geometryLayers.set(GEOMETRY_LAYER);

  const planLayers = new Layers();
  planLayers.set(SKETCH_LAYER);

  const { camera, canvas: displayCanvas, renderer, scene } = buildScene({
    canvas,
    width,
    height,
    view,
    geometryLayers,
    planLayers,
    withAxes: false,
  });

  const render = () => {
    renderer.clear();
    camera.layers.set(GEOMETRY_LAYER);
    renderer.render(scene, camera);

    renderer.clearDepth();

    camera.layers.set(SKETCH_LAYER);
    renderer.render(scene, camera);
  };

  if (!canvas) {
    page.appendChild(displayCanvas);
  }

  const { trackball } = buildTrackballControls({
    camera,
    render,
    view,
    viewerElement: displayCanvas,
  });

  const { resize } = createResizer({
    camera,
    trackball,
    renderer,
    viewerElement: page,
  });

  new ResizeObserver(() => {
    resize();
    render();
  }).observe(page);

  const updateGeometry = async (geometry) => {
    // Delete any previous dataset in the window.
    for (const { mesh } of datasets) {
      scene.remove(mesh);
    }

    const threejsGeometry = toThreejsGeometry(geometry);

    // Build new datasets from the written data, and display them.
    datasets = [];

    await buildMeshes({ datasets, threejsGeometry, scene, render });

    moveToFit({ view, camera, controls: trackball, scene });

    render();
  };

  if (geometry) {
    await updateGeometry(geometry);
    render();
  }

  return { canvas: displayCanvas, render, updateGeometry, trackball };
};

export default orbitDisplay;
