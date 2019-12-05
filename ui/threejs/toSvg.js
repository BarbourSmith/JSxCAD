import {
  AmbientLight,
  BackSide,
  Box2,
  Box3,
  BufferGeometry,
  Camera,
  Color,
  DirectionalLight,
  DoubleSide,
  FaceColors,
  Float32BufferAttribute,
  FrontSide,
  Frustum,
  Geometry,
  GridHelper,
  Light,
  Line,
  LineBasicMaterial,
  LineSegments,
  Matrix3,
  Matrix4,
  Mesh,
  MeshNormalMaterial,
  Object3D,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  Sprite,
  Vector2,
  Vector3,
  Vector4,
  VertexColors
} from 'three';

import { DOMParser, XMLSerializer } from 'xmldom';
import { installProjector } from './Projector';
import { installSVGRenderer } from './SVGRenderer';
import { toKeptGeometry } from '@jsxcad/geometry-tagged';
import { toThreejsGeometry } from './toThreejsGeometry';

// Bootstrap start.
const { Projector, RenderableFace, RenderableLine, RenderableSprite } =
    installProjector({ BackSide,
                       Box3,
                       BufferGeometry,
                       Color,
                       DoubleSide,
                       FaceColors,
                       FrontSide,
                       Frustum,
                       Geometry,
                       Light,
                       Line,
                       LineSegments,
                       Matrix3,
                       Matrix4,
                       Mesh,
                       Points,
                       Sprite,
                       Vector2,
                       Vector3,
                       Vector4,
                       VertexColors });

const { SVGRenderer } =
    installSVGRenderer({ Box2,
                         Camera,
                         Color,
                         FaceColors,
                         Object3D,
                         Matrix3,
                         Matrix4,
                         Projector,
                         RenderableSprite,
                         RenderableLine,
                         RenderableFace,
                         Vector3,
                         VertexColors,
                         document: new DOMParser().parseFromString('<xml></xml>', 'text/xml') });
// Bootstrap done.

const build = ({ view = {}, pageSize = [100, 100], grid = false }, geometry) => {
  const { target = [0, 0, 0], position = [40, 40, 40], up = [0, 0, 1], near = 1, far = 3500 } = view;
  const [pageWidth, pageHeight] = pageSize;
  const camera = new PerspectiveCamera(27, pageWidth / pageHeight, near, far);
  [camera.position.x, camera.position.y, camera.position.z] = position;
  camera.up = new Vector3(...up);
  camera.lookAt(...target);
  const scene = new Scene();
  scene.background = new Color(0xffffff);
  scene.add(camera);
  if (grid) {
    const grid = new GridHelper(100, 10, 'green', 'blue');
    grid.material = new LineBasicMaterial({ color: 0x000000 });
    grid.rotation.x = -Math.PI / 2;
    grid.position.x = 0;
    grid.position.y = 0;
    grid.position.z = 0;
    scene.add(grid);
  }
  //
  var ambientLight = new AmbientLight(0x222222);
  scene.add(ambientLight);
  var light = new DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  camera.add(light);

  const walk = (geometry) => {
    if (geometry.assembly) {
      geometry.assembly.forEach(walk);
    } else if (geometry.disjointAssembly) {
      geometry.disjointAssembly.forEach(walk);
    } else if (geometry.threejsPoints) {
      const points = geometry.threejsPoints;
      const threejsGeometry = new Geometry();
      const material = new PointsMaterial({ color: 0x0000ff });
      for (const [x, y, z] of points) {
        threejsGeometry.vertices.push(new Vector3(x, y, z));
      }
      scene.add(new Points(threejsGeometry, material));
    } else if (geometry.threejsSegments) {
      const segments = geometry.threejsSegments;
      const threejsGeometry = new Geometry();
      const material = new LineBasicMaterial({ color: 0xff0000 });
      for (const [[aX, aY, aZ], [bX, bY, bZ]] of segments) {
        threejsGeometry.vertices.push(new Vector3(aX, aY, aZ), new Vector3(bX, bY, bZ));
      }
      scene.add(new LineSegments(threejsGeometry, material));
    } else if (geometry.threejsSolid) {
      const { positions, normals } = geometry.threejsSolid;
      const threejsGeometry = new BufferGeometry();
      threejsGeometry.addAttribute('position', new Float32BufferAttribute(positions, 3));
      threejsGeometry.addAttribute('normal', new Float32BufferAttribute(normals, 3));
      const material = new MeshNormalMaterial();
      scene.add(new Mesh(threejsGeometry, material));
    } else if (geometry.threejsSurface) {
      const { positions, normals } = geometry.threejsSurface;
      const threejsGeometry = new BufferGeometry();
      threejsGeometry.addAttribute('position', new Float32BufferAttribute(positions, 3));
      threejsGeometry.addAttribute('normal', new Float32BufferAttribute(normals, 3));
      const material = new MeshNormalMaterial();
      scene.add(new Mesh(threejsGeometry, material));
    }
  };
  const threejsGeometry = toThreejsGeometry(geometry);
  walk(toThreejsGeometry(threejsGeometry));

  return [scene, camera];
};

export const toSvg = async (options = {}, geometry) => toSvgSync(options, geometry);

const header =
`<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by jsxcad -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">
`;

export const toSvgSync = (options = {}, geometry) => {
  const keptGeometry = toKeptGeometry(geometry);
  const [scene, camera] = build(options, keptGeometry);
  const { includeXmlHeader = true, pageSize = [500, 500] } = options;
  const [pageWidth, pageHeight] = pageSize;

  const renderer = new SVGRenderer({});
  renderer.setSize(pageWidth, pageHeight);
  renderer.render(scene, camera);

  const serializer = new XMLSerializer();
  let svg = serializer.serializeToString(renderer.domElement) + '\n';
  if (includeXmlHeader) {
    svg = header + svg;
  }
  return svg;
};