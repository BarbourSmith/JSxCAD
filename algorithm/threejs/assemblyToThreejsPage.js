import { flip as flipPolygon, toPlane } from '@jsxcad/math-poly3';
import { toPolygons as solidToPolygons } from '@jsxcad/algorithm-solid';
import { makeConvex as makeConvexSurface } from '@jsxcad/algorithm-surface';
import { toSegments } from '@jsxcad/algorithm-path';
import { toTriangles as polygonsToTriangles } from '@jsxcad/algorithm-polygons';
import { trianglesToThreejsDatasets } from './trianglesToThreejsDatasets';

const pathsToThreejsSegments = (paths) => {
  const segments = [];

  for (const path of paths) {
    for (const [start, end] of toSegments({}, path)) {
      segments.push([start, end]);
    }
  }

  return { segments };
}

const renderSegments = ({ segments }) => `
        {
          const geometry = new THREE.Geometry();
          const segments = ${JSON.stringify(segments)};
          const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
          for (const [[aX, aY, aZ], [bX, bY, bZ]] of segments) {
            geometry.vertices.push(new THREE.Vector3(aX, aY, aZ), new THREE.Vector3(bX, bY, bZ));
          }
          scene.add(new THREE.LineSegments(geometry, material));
        }
`;

const solidsToThreejsSolids = (solids) => {
  const threejsSolids = [];
  for (const solid of solids) {
    const normals = [];
    const positions = [];
    for (const triangle of polygonsToTriangles({}, solidToPolygons({}, solid))) {
      for (const point of triangle) {
        const [x, y, z] = toPlane(triangle);
        normals.push(x, y, z);
        positions.push(...point);
      }
    }
    threejsSolids.push({ normals, positions});
  }
  return threejsSolids;
};

const renderSolid = ({ positions, normals }, nth) => `
        {
          const geometry = new THREE.BufferGeometry();
          const positions = ${JSON.stringify(positions)};
          const normals = ${JSON.stringify(normals)};
          geometry.addAttribute('position', new THREE.Float32BufferAttribute( positions, 3));
          geometry.addAttribute('normal', new THREE.Float32BufferAttribute( normals, 3));
          const material = new THREE.MeshNormalMaterial();
          scene.add(new THREE.Mesh( geometry, material));
        }
`;

const surfacesToThreejsSurfaces = (surfaces) => {
  const threejsSurfaces = [];
  for (const surface of surfaces) {
    const normals = [];
    const positions = [];

    const outputTriangle = (triangle) => {
      for (const point of triangle) {
        const [x, y, z] = toPlane(triangle);
        normals.push(x, y, z);
        positions.push(...point);
      }
    }

    for (const triangle of polygonsToTriangles({}, makeConvexSurface({}, surface))) {
      outputTriangle(triangle);
      outputTriangle(flipPolygon(triangle));
    }
    threejsSurfaces.push({ normals, positions});
  }
  return threejsSurfaces;
}

const renderSurface = ({ positions, normals }, nth) => `
        {
          const geometry = new THREE.BufferGeometry();
          const positions = ${JSON.stringify(positions)};
          const normals = ${JSON.stringify(normals)};
          geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
          geometry.addAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
          const material = new THREE.MeshNormalMaterial();
          scene.add(new THREE.Mesh( geometry, material));
        }
`;

const page = ({ cameraPosition, threejsSegments, threejsSolids, threejsSurfaces }) => `
<html lang="en">
  <head>
    <title>JSxCAD Viewer</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <style>
      body {
        color: #cccccc;
        font-family:Monospace;
        font-size:13px;
        text-align:center;
        background-color: #050505;
        margin: 0px;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div id="container"></div>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/three.js/87/three.min.js"></script>
    <script type="text/javascript" src="https://cdn.rawgit.com/mrdoob/stats.js/master/build/stats.min.js"></script>
    <script type="text/javascript" src="https://cdn.rawgit.com/mrdoob/three.js/master/examples/js/controls/TrackballControls.js"></script>
    <script type="text/javascript" src="https://cdn.rawgit.com/dataarts/dat.gui/master/build/dat.gui.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/ami.js//0.0.20/ami.min.js"></script>
    <script>
      var camera, controls, scene, renderer, stats;
      var mesh;
      init();
      animate();
      function init() {
        //
        camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 3500 );
        [camera.position.x, camera.position.y, camera.position.z] = ${JSON.stringify(cameraPosition)};
        //
        controls = new THREE.TrackballControls(camera);
        controls.rotateSpeed = 4.0;
        controls.zoomSpeed = 4.0;
        controls.panSpeed = 2.0;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.1;
        controls.keys = [65, 83, 68];
        controls.addEventListener('change', render);
        //
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x050505 );
        //
        var ambientLight = new THREE.AmbientLight( 0x222222 );
        scene.add( ambientLight );
        var light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
        light1.position.set( 1, 1, 1 );
        scene.add( light1 );
        var light2 = new THREE.DirectionalLight( 0xffffff, 1 );
        light2.position.set( 0, - 1, 0 );
        scene.add( light2 );
        ${renderSegments(threejsSegments)}
        ${threejsSolids.map(renderSolid).join('')}
        ${threejsSurfaces.map(renderSurface).join('')}
        //
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        //
        stats = new Stats();
        document.body.appendChild( stats.dom );
        //
        // var gui = new dat.GUI();
        // gui.add( material, 'wireframe' );
        //
        window.addEventListener( 'resize', onWindowResize, false );
      }
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        controls.handleResize();
        renderer.setSize( window.innerWidth, window.innerHeight );
      }
      function animate() {
        requestAnimationFrame( animate );
        render();
        controls.update();
        stats.update();
      }
      function render() {
        renderer.render( scene, camera );
      }
    </script>
  </body>
</html>
`;

export const assemblyToThreejsPage = ({ cameraPosition = [0, 0, 16], paths, solids, surfaces }) => {
  const threejsSegments = pathsToThreejsSegments(paths);
  const threejsSolids = solidsToThreejsSolids(solids);
  const threejsSurfaces = surfacesToThreejsSurfaces(surfaces);
  return page({ cameraPosition, threejsSegments, threejsSolids, threejsSurfaces });
};
