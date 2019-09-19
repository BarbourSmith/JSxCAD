const EPS = 1e-5;

import { distance } from '@jsxcad/math-vec2';
import { direction, fromPoints as toLineFromPoints } from '@jsxcad/math-line2';

const interpolateBetween2DPointsForY = (point1, point2, y) => {
  let f1 = y - point1[1]
  let f2 = point2[1] - point1[1]
  if (f2 < 0) {
    f1 = -f1
    f2 = -f2
  }
  let t
  if (f1 <= 0) {
    t = 0.0
  } else if (f1 >= f2) {
    t = 1.0
  } else if (f2 < 1e-10) { // FIXME Should this be EPS?
    t = 0.5
  } else {
    t = f1 / f2
  }
  let result = point1[0] + t * (point2[0] - point1[0])
  return result
}

const fnNumberSort = (a, b) => {
  return a - b
}

const insertSorted = (array, element, comparefunc) => {
  let leftbound = 0
  let rightbound = array.length
  while (rightbound > leftbound) {
    let testindex = Math.floor((leftbound + rightbound) / 2)
    let testelement = array[testindex]
    let compareresult = comparefunc(element, testelement)
    if (compareresult > 0) // element > testelement
    {
      leftbound = testindex + 1
    } else {
      rightbound = testindex
    }
  }
  array.splice(leftbound, 0, element)
}

/**
 * Retesselation for a set of COPLANAR polygons.
 * @param {[poly3]} sourcepolygons - list of polygons
 * @returns {[poly3]} new set of polygons
 */
export const retessellate = (sourcepolygons) => {
  if (sourcepolygons.length < 2) return sourcepolygons

  const destpolygons = []
  const numpolygons = sourcepolygons.length
  const plane = sourcepolygons[0].plane
  // const orthobasis = new OrthoNormalBasis(plane)
  const polygonvertices2d = [] // array of array of Vector2D
  const polygontopvertexindexes = [] // array of indexes of topmost vertex per polygon
  const topy2polygonindexes = {}
  const ycoordinatetopolygonindexes = {}

  const ycoordinatebins = {}

  // convert all polygon vertices to 2D
  // Make a list of all encountered y coordinates
  // And build a map of all polygons that have a vertex at a certain y coordinate:
  const ycoordinateBinningFactor = 1.0 / EPS * 10
  for (let polygonindex = 0; polygonindex < numpolygons; polygonindex++) {
    const poly3d = sourcepolygons[polygonindex]
    let vertices2d = []
    let numvertices = poly3d.length
    let minindex = -1
    if (numvertices > 0) {
      let miny
      let maxy
      for (let i = 0; i < numvertices; i++) {
        let pos2d = poly3d[i];
        // perform binning of y coordinates: If we have multiple vertices very
        // close to each other, give them the same y coordinate:
        const ycoordinatebin = Math.floor(pos2d[1] * ycoordinateBinningFactor)
        let newy
        if (ycoordinatebin in ycoordinatebins) {
          newy = ycoordinatebins[ycoordinatebin]
        } else if (ycoordinatebin + 1 in ycoordinatebins) {
          newy = ycoordinatebins[ycoordinatebin + 1]
        } else if (ycoordinatebin - 1 in ycoordinatebins) {
          newy = ycoordinatebins[ycoordinatebin - 1]
        } else {
          newy = pos2d[1]
          ycoordinatebins[ycoordinatebin] = pos2d[1]
        }
        pos2d = [pos2d[0], newy];
        vertices2d.push(pos2d)
        const y = pos2d[1]
        if ((i === 0) || (y < miny)) {
          miny = y
          minindex = i
        }
        if ((i === 0) || (y > maxy)) {
          maxy = y
        }
        if (!(y in ycoordinatetopolygonindexes)) {
          ycoordinatetopolygonindexes[y] = {}
        }
        ycoordinatetopolygonindexes[y][polygonindex] = true
      }
      if (miny >= maxy) {
        // degenerate polygon, all vertices have same y coordinate. Just ignore it from now:
        vertices2d = []
        numvertices = 0
        minindex = -1
      } else {
        if (!(miny in topy2polygonindexes)) {
          topy2polygonindexes[miny] = []
        }
        topy2polygonindexes[miny].push(polygonindex)
      }
    } // if(numvertices > 0)
    // reverse the vertex order:
    vertices2d.reverse()
    minindex = numvertices - minindex - 1
    polygonvertices2d.push(vertices2d)
    polygontopvertexindexes.push(minindex)
  }
  const ycoordinates = []
  for (let ycoordinate in ycoordinatetopolygonindexes) ycoordinates.push(ycoordinate)
  ycoordinates.sort(fnNumberSort)

  // Now we will iterate over all y coordinates, from lowest to highest y coordinate
  // activepolygons: source polygons that are 'active', i.e. intersect with our y coordinate
  //   Is sorted so the polygons are in left to right order
  // Each element in activepolygons has these properties:
  //        polygonindex: the index of the source polygon (i.e. an index into the sourcepolygons
  //                      and polygonvertices2d arrays)
  //        leftvertexindex: the index of the vertex at the left side of the polygon (lowest x)
  //                         that is at or just above the current y coordinate
  //        rightvertexindex: dito at right hand side of polygon
  //        topleft, bottomleft: coordinates of the left side of the polygon crossing the current y coordinate
  //        topright, bottomright: coordinates of the right hand side of the polygon crossing the current y coordinate
  let activepolygons = []
  let prevoutpolygonrow = []
  for (let yindex = 0; yindex < ycoordinates.length; yindex++) {
    const newoutpolygonrow = []
    const ycoordinateasstring = ycoordinates[yindex]
    const ycoordinate = Number(ycoordinateasstring)

    // update activepolygons for this y coordinate:
    // - Remove any polygons that end at this y coordinate
    // - update leftvertexindex and rightvertexindex (which point to the current vertex index
    //   at the the left and right side of the polygon
    // Iterate over all polygons that have a corner at this y coordinate:
    const polygonindexeswithcorner = ycoordinatetopolygonindexes[ycoordinateasstring]
    for (let activepolygonindex = 0; activepolygonindex < activepolygons.length; ++activepolygonindex) {
      const activepolygon = activepolygons[activepolygonindex]
      const polygonindex = activepolygon.polygonindex
      if (polygonindexeswithcorner[polygonindex]) {
        // this active polygon has a corner at this y coordinate:
        const vertices2d = polygonvertices2d[polygonindex]
        const numvertices = vertices2d.length
        let newleftvertexindex = activepolygon.leftvertexindex
        let newrightvertexindex = activepolygon.rightvertexindex
        // See if we need to increase leftvertexindex or decrease rightvertexindex:
        while (true) {
          let nextleftvertexindex = newleftvertexindex + 1
          if (nextleftvertexindex >= numvertices) nextleftvertexindex = 0
          if (vertices2d[nextleftvertexindex][1] !== ycoordinate) break
          newleftvertexindex = nextleftvertexindex
        }
        let nextrightvertexindex = newrightvertexindex - 1
        if (nextrightvertexindex < 0) nextrightvertexindex = numvertices - 1
        if (vertices2d[nextrightvertexindex][1] === ycoordinate) {
          newrightvertexindex = nextrightvertexindex
        }
        if ((newleftvertexindex !== activepolygon.leftvertexindex) && (newleftvertexindex === newrightvertexindex)) {
          // We have increased leftvertexindex or decreased rightvertexindex, and now they point to the same vertex
          // This means that this is the bottom point of the polygon. We'll remove it:
          activepolygons.splice(activepolygonindex, 1)
          --activepolygonindex
        } else {
          activepolygon.leftvertexindex = newleftvertexindex
          activepolygon.rightvertexindex = newrightvertexindex
          activepolygon.topleft = vertices2d[newleftvertexindex]
          activepolygon.topright = vertices2d[newrightvertexindex]
          let nextleftvertexindex = newleftvertexindex + 1
          if (nextleftvertexindex >= numvertices) nextleftvertexindex = 0
          activepolygon.bottomleft = vertices2d[nextleftvertexindex]
          let nextrightvertexindex = newrightvertexindex - 1
          if (nextrightvertexindex < 0) nextrightvertexindex = numvertices - 1
          activepolygon.bottomright = vertices2d[nextrightvertexindex]
        }
      } // if polygon has corner here
    } // for activepolygonindex
    let nextycoordinate
    if (yindex >= ycoordinates.length - 1) {
      // last row, all polygons must be finished here:
      activepolygons = []
      nextycoordinate = null
    } else { // yindex < ycoordinates.length-1
      nextycoordinate = Number(ycoordinates[yindex + 1])
      const middleycoordinate = 0.5 * (ycoordinate + nextycoordinate)
      // update activepolygons by adding any polygons that start here:
      const startingpolygonindexes = topy2polygonindexes[ycoordinateasstring]
      for (let polygonindexKey in startingpolygonindexes) {
        const polygonindex = startingpolygonindexes[polygonindexKey]
        const vertices2d = polygonvertices2d[polygonindex]
        const numvertices = vertices2d.length
        const topvertexindex = polygontopvertexindexes[polygonindex]
        // the top of the polygon may be a horizontal line. In that case topvertexindex can point to any point on this line.
        // Find the left and right topmost vertices which have the current y coordinate:
        let topleftvertexindex = topvertexindex
        while (true) {
          let i = topleftvertexindex + 1
          if (i >= numvertices) i = 0
          if (vertices2d[i][1] !== ycoordinate) break
          if (i === topvertexindex) break // should not happen, but just to prevent endless loops
          topleftvertexindex = i
        }
        let toprightvertexindex = topvertexindex
        while (true) {
          let i = toprightvertexindex - 1
          if (i < 0) i = numvertices - 1
          if (vertices2d[i][1] !== ycoordinate) break
          if (i === topleftvertexindex) break // should not happen, but just to prevent endless loops
          toprightvertexindex = i
        }
        let nextleftvertexindex = topleftvertexindex + 1
        if (nextleftvertexindex >= numvertices) nextleftvertexindex = 0
        let nextrightvertexindex = toprightvertexindex - 1
        if (nextrightvertexindex < 0) nextrightvertexindex = numvertices - 1
        const newactivepolygon = {
          polygonindex: polygonindex,
          leftvertexindex: topleftvertexindex,
          rightvertexindex: toprightvertexindex,
          topleft: vertices2d[topleftvertexindex],
          topright: vertices2d[toprightvertexindex],
          bottomleft: vertices2d[nextleftvertexindex],
          bottomright: vertices2d[nextrightvertexindex]
        }
        insertSorted(activepolygons, newactivepolygon, (el1, el2) => {
          const x1 = interpolateBetween2DPointsForY(el1.topleft, el1.bottomleft, middleycoordinate)
          const x2 = interpolateBetween2DPointsForY(el2.topleft, el2.bottomleft, middleycoordinate)
          if (x1 > x2) return 1
          if (x1 < x2) return -1
          return 0
        })
      } // for(let polygonindex in startingpolygonindexes)
    } //  yindex < ycoordinates.length-1
    // if( (yindex === ycoordinates.length-1) || (nextycoordinate - ycoordinate > EPS) )
    // FIXME : what ???
    if (true) {
      // Now activepolygons is up to date
      // Build the output polygons for the next row in newoutpolygonrow:
      for (let activepolygonKey in activepolygons) {
        const activepolygon = activepolygons[activepolygonKey]

        let x = interpolateBetween2DPointsForY(activepolygon.topleft, activepolygon.bottomleft, ycoordinate)
        const topleft = [x, ycoordinate];
        x = interpolateBetween2DPointsForY(activepolygon.topright, activepolygon.bottomright, ycoordinate)
        const topright = [x, ycoordinate];
        x = interpolateBetween2DPointsForY(activepolygon.topleft, activepolygon.bottomleft, nextycoordinate)
        const bottomleft = [x, nextycoordinate];
        x = interpolateBetween2DPointsForY(activepolygon.topright, activepolygon.bottomright, nextycoordinate)
        const bottomright = [x, nextycoordinate];
        const outpolygon = {
          topleft: topleft,
          topright: topright,
          bottomleft: bottomleft,
          bottomright: bottomright,
          leftline: toLineFromPoints(topleft, bottomleft),
          rightline: toLineFromPoints(bottomright, topright)
        }
        if (newoutpolygonrow.length > 0) {
          const prevoutpolygon = newoutpolygonrow[newoutpolygonrow.length - 1]
          const d1 = distance(outpolygon.topleft, prevoutpolygon.topright)
          const d2 = distance(outpolygon.bottomleft, prevoutpolygon.bottomright)
          if ((d1 < EPS) && (d2 < EPS)) {
            // we can join this polygon with the one to the left:
            outpolygon.topleft = prevoutpolygon.topleft
            outpolygon.leftline = prevoutpolygon.leftline
            outpolygon.bottomleft = prevoutpolygon.bottomleft
            newoutpolygonrow.splice(newoutpolygonrow.length - 1, 1)
          }
        }
        newoutpolygonrow.push(outpolygon)
      } // for(activepolygon in activepolygons)
      if (yindex > 0) {
        // try to match the new polygons against the previous row:
        const prevcontinuedindexes = {}
        const matchedindexes = {}
        for (let i = 0; i < newoutpolygonrow.length; i++) {
          const thispolygon = newoutpolygonrow[i]
          for (let ii = 0; ii < prevoutpolygonrow.length; ii++) {
            if (!matchedindexes[ii]) { // not already processed?
              // We have a match if the sidelines are equal or if the top coordinates
              // are on the sidelines of the previous polygon
              const prevpolygon = prevoutpolygonrow[ii]
              if (distance(prevpolygon.bottomleft, thispolygon.topleft) < EPS) {
                if (distance(prevpolygon.bottomright, thispolygon.topright) < EPS) {
                  // Yes, the top of this polygon matches the bottom of the previous:
                  matchedindexes[ii] = true
                  // Now check if the joined polygon would remain convex:
                  const v1 = direction(thispolygon.leftline)
                  const v2 = direction(prevpolygon.leftline)
                  const d1 = v1[0] - v2[0]

                  const v3 = direction(thispolygon.rightline)
                  const v4 = direction(prevpolygon.rightline)
                  const d2 = v3[0] - v4[0]

                  const leftlinecontinues = Math.abs(d1) < EPS
                  const rightlinecontinues = Math.abs(d2) < EPS
                  const leftlineisconvex = leftlinecontinues || (d1 >= 0)
                  const rightlineisconvex = rightlinecontinues || (d2 >= 0)
                  if (leftlineisconvex && rightlineisconvex) {
                    // yes, both sides have convex corners:
                    // This polygon will continue the previous polygon
                    thispolygon.outpolygon = prevpolygon.outpolygon
                    thispolygon.leftlinecontinues = leftlinecontinues
                    thispolygon.rightlinecontinues = rightlinecontinues
                    prevcontinuedindexes[ii] = true
                  }
                  break
                }
              }
            } // if(!prevcontinuedindexes[ii])
          } // for ii
        } // for i
        for (let ii = 0; ii < prevoutpolygonrow.length; ii++) {
          if (!prevcontinuedindexes[ii]) {
            // polygon ends here
            // Finish the polygon with the last point(s):
            const prevpolygon = prevoutpolygonrow[ii]
            prevpolygon.outpolygon.rightpoints.push(prevpolygon.bottomright)
            if (distance(prevpolygon.bottomright, prevpolygon.bottomleft) > EPS) {
              // polygon ends with a horizontal line:
              prevpolygon.outpolygon.leftpoints.push(prevpolygon.bottomleft)
            }
            // reverse the left half so we get a counterclockwise circle:
            prevpolygon.outpolygon.leftpoints.reverse()
            const points2d = prevpolygon.outpolygon.rightpoints.concat(prevpolygon.outpolygon.leftpoints)
            destpolygons.push(points2d);
          }
        }
      } // if(yindex > 0)
      for (let i = 0; i < newoutpolygonrow.length; i++) {
        const thispolygon = newoutpolygonrow[i]
        if (!thispolygon.outpolygon) {
          // polygon starts here:
          thispolygon.outpolygon = {
            leftpoints: [],
            rightpoints: []
          }
          thispolygon.outpolygon.leftpoints.push(thispolygon.topleft)
          if (distance(thispolygon.topleft, thispolygon.topright) > EPS) {
            // we have a horizontal line at the top:
            thispolygon.outpolygon.rightpoints.push(thispolygon.topright)
          }
        } else {
          // continuation of a previous row
          if (!thispolygon.leftlinecontinues) {
            thispolygon.outpolygon.leftpoints.push(thispolygon.topleft)
          }
          if (!thispolygon.rightlinecontinues) {
            thispolygon.outpolygon.rightpoints.push(thispolygon.topright)
          }
        }
      }
      prevoutpolygonrow = newoutpolygonrow
    }
  } // for yindex
  return destpolygons.map(polygon => polygon.map(([x, y]) => [x, y, 0]));
}
