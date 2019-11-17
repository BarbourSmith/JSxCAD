import { distance, negate } from '@jsxcad/math-vec3';
import { drop, rotateY, rotateZ, toTransformedGeometry, translate } from '@jsxcad/geometry-tagged';

import Plan from './Plan';
import Shape from './Shape';
import assemble from './assemble';
import { shapeToConnect } from './Connector';

/**
 *
 * # Connect
 *
 * Connects two connectors.
 *
 * ::: illustration { "view": { "position": [60, -60, 0], "target": [0, 0, 0] } }
 * ```
 * Cube(10).Connector('top').moveZ(5)
 *         .connect(Sphere(10).Connector('bottom').flip().moveZ(-9))
 * ```
 * :::
 **/

const X = 0;
const Y = 1;
const Z = 2;

const sign = (value) => {
  const indicator = 1 / value;
  if (indicator < 0) {
    return -1;
  } else {
    return 1;
  }
};

// Find the angle between the passed vector and the x-axis (in the given reference frame)
const angleX = (cord1, cord2) => {
  // Compute the angle from the given cordinates to 100, 0 (the x axis) (in the passed reference plane)

  // Distance from origin to point B in the xy plane
  const l1 = distance([0, 0, 0], [cord1, cord2, 0]);

  // Distance from origin to X vector in xy plane
  const l2 = distance([0, 0, 0], [100, 0, 0]);

  const l3 = distance([cord1, cord2, 0], [100, 0, 0]);

  // The below seems incorrect -- if l1 or l2 is zero then it will fail equivalently.

  const v1 = l1 * l1 + l2 * l2 - l3 * l3;

  if (v1 === 0) {
    return Math.acos(0) * 180 / Math.PI * sign(cord2);
  }

  const v2 = 2 * l1 * l2;

  if (v2 === 0) {
    return Math.acos(sign(v1)) * 180 / Math.PI * sign(cord2);
  }

  const v3 = Math.max(-1, Math.min(1, v1 / v2));

  const result = Math.acos(v3) * (180 / Math.PI) * sign(cord2);
  if (isNaN(result)) {
    throw Error('die');
  }
  return result;
};

// Move the target shape to the origin and align with axis
const moveToOrigin = (connectorShape) => {
  let connector = toTransformedGeometry(connectorShape.toGeometry());
  const [origin] = connector.marks;

  // Move both shapes so point A is a the origin,
  // then correct each angle.

  connector = toTransformedGeometry(translate(negate(origin), connector));
  const z = (([, B]) => angleX(B[X], B[Y]))(connector.marks);

  connector = toTransformedGeometry(rotateZ(-z, connector));
  const y = (([, B]) => angleX(B[X], B[Z]))(connector.marks);

  connector = toTransformedGeometry(rotateY(y, connector));
  const x = (([, , C]) => angleX(C[Y], C[Z]))(connector.marks);

  return [origin, x, y, z];
};

export const dropConnector = (shape, connector) =>
  Shape.fromGeometry(drop([`connector/${connector}`], shape.toGeometry()));

// Connect two shapes at the specified connector.
export const connect = (aConnector, bConnector, { doAssemble = true, label } = {}) => {
  const [aOrigin, aX, aY, aZ] = moveToOrigin(aConnector);
  const [bOrigin, bX, bY, bZ] = moveToOrigin(bConnector.flip());
  // TODO: use a symbol.
  const aShape = aConnector.getContext(shapeToConnect);
  const bShape = bConnector.getContext(shapeToConnect);
  const bMoved = bShape.move(...negate(bOrigin))
      .rotateZ(-bZ)
      .rotateY(bY)
      .rotateX(-bX)
      .rotateX(-aX)
      .rotateY(aY)
      .rotateZ(-aZ)
      .move(...aOrigin);
  let result;
  if (doAssemble) {
    result = assemble(dropConnector(aShape, aConnector),
                      dropConnector(bMoved, bConnector));
  } else {
    result = bMoved;
  }
  if (label !== undefined) {
    result = result.with(Plan.Label(label).move(...aOrigin));
  }
  return result;
};

export default connect;
