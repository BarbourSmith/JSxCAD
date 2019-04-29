import { canonicalize } from '@jsxcad/algorithm-assembly';
import { fromSvgPath } from './fromSvgPath';
import { test } from 'ava';

// TODO: Add colinear point simplification.

test('Parse an open triangle.', t => {
  const svgPath = 'M200 100 L170.71067810058594 170.71067810058594 L100 200 L29.289321899414062 170.71067810058594 ' +
                  'L0 100 L29.289321899414062 29.289321899414062 L100 0 L170.71067810058594 29.289321899414062';
  const paths = canonicalize(fromSvgPath({}, svgPath));
  t.deepEqual(paths,
              { paths: [[null, [200, -100, 0], [199.91598, -100.20284, 0], [199.27599, -101.74791, 0], [198.07825, -104.63953, 0], [196.40855, -108.67052, 0], [193.20682, -116.40018, 0], [188.08691, -128.76074, 0], [182.62377, -141.94994, 0], [177.50386, -154.3105, 0], [174.30212, -162.04016, 0], [172.63243, -166.07115, 0], [171.43469, -168.96276, 0], [170.7947, -170.50783, 0], [170.71068, -170.71068, 0], [170.50783, -170.7947, 0], [168.96276, -171.43469, 0], [166.07115, -172.63243, 0], [162.04016, -174.30212, 0], [154.3105, -177.50386, 0], [141.94994, -182.62377, 0], [128.76074, -188.08691, 0], [116.40018, -193.20682, 0], [108.67052, -196.40855, 0], [104.63953, -198.07825, 0], [101.74791, -199.27599, 0], [100.20284, -199.91598, 0], [100, -200, 0], [99.79716, -199.91598, 0], [98.25209, -199.27599, 0], [95.36047, -198.07825, 0], [91.32948, -196.40855, 0], [83.59982, -193.20682, 0], [71.23926, -188.08691, 0], [58.05006, -182.62377, 0], [45.6895, -177.50386, 0], [37.95984, -174.30212, 0], [33.92885, -172.63243, 0], [31.03724, -171.43469, 0], [29.49217, -170.7947, 0], [29.28932, -170.71068, 0], [29.2053, -170.50783, 0], [28.56531, -168.96276, 0], [27.36757, -166.07115, 0], [25.69788, -162.04016, 0], [22.49614, -154.3105, 0], [17.37623, -141.94994, 0], [11.91309, -128.76074, 0], [6.79318, -116.40018, 0], [3.59145, -108.67052, 0], [1.92175, -104.63953, 0], [0.72401, -101.74791, 0], [0.08402, -100.20284, 0], [0, -100, 0], [0.08402, -99.79716, 0], [0.72401, -98.25209, 0], [1.92175, -95.36047, 0], [3.59145, -91.32948, 0], [6.79318, -83.59982, 0], [11.91309, -71.23926, 0], [17.37623, -58.05006, 0], [22.49614, -45.6895, 0], [25.69788, -37.95984, 0], [27.36757, -33.92885, 0], [28.56531, -31.03724, 0], [29.2053, -29.49217, 0], [29.28932, -29.28932, 0], [29.49217, -29.2053, 0], [31.03724, -28.56531, 0], [33.92885, -27.36757, 0], [37.95984, -25.69788, 0], [45.6895, -22.49614, 0], [58.05006, -17.37623, 0], [71.23926, -11.91309, 0], [83.59982, -6.79318, 0], [91.32948, -3.59145, 0], [95.36047, -1.92175, 0], [98.25209, -0.72401, 0], [99.79716, -0.08402, 0], [100, 0, 0], [100.20284, -0.08402, 0], [101.74791, -0.72401, 0], [104.63953, -1.92175, 0], [108.67052, -3.59145, 0], [116.40018, -6.79318, 0], [128.76074, -11.91309, 0], [141.94994, -17.37623, 0], [154.3105, -22.49614, 0], [162.04016, -25.69788, 0], [166.07115, -27.36757, 0], [168.96276, -28.56531, 0], [170.50783, -29.2053, 0], [170.71068, -29.28932, 0]]] });
});

test('Parse a closed triangle.', t => {
  const svgPath = 'M200 100 L170.71067810058594 170.71067810058594 L100 200 L29.289321899414062 170.71067810058594 ' +
                  'L0 100 L29.289321899414062 29.289321899414062 L100 0 L170.71067810058594 29.289321899414062 Z';
  const paths = canonicalize(fromSvgPath({}, svgPath));
  t.deepEqual(paths,
              { paths: [[[200, -100, 0], [199.91598, -100.20284, 0], [199.27599, -101.74791, 0], [198.07825, -104.63953, 0], [196.40855, -108.67052, 0], [193.20682, -116.40018, 0], [188.08691, -128.76074, 0], [182.62377, -141.94994, 0], [177.50386, -154.3105, 0], [174.30212, -162.04016, 0], [172.63243, -166.07115, 0], [171.43469, -168.96276, 0], [170.7947, -170.50783, 0], [170.71068, -170.71068, 0], [170.50783, -170.7947, 0], [168.96276, -171.43469, 0], [166.07115, -172.63243, 0], [162.04016, -174.30212, 0], [154.3105, -177.50386, 0], [141.94994, -182.62377, 0], [128.76074, -188.08691, 0], [116.40018, -193.20682, 0], [108.67052, -196.40855, 0], [104.63953, -198.07825, 0], [101.74791, -199.27599, 0], [100.20284, -199.91598, 0], [100, -200, 0], [99.79716, -199.91598, 0], [98.25209, -199.27599, 0], [95.36047, -198.07825, 0], [91.32948, -196.40855, 0], [83.59982, -193.20682, 0], [71.23926, -188.08691, 0], [58.05006, -182.62377, 0], [45.6895, -177.50386, 0], [37.95984, -174.30212, 0], [33.92885, -172.63243, 0], [31.03724, -171.43469, 0], [29.49217, -170.7947, 0], [29.28932, -170.71068, 0], [29.2053, -170.50783, 0], [28.56531, -168.96276, 0], [27.36757, -166.07115, 0], [25.69788, -162.04016, 0], [22.49614, -154.3105, 0], [17.37623, -141.94994, 0], [11.91309, -128.76074, 0], [6.79318, -116.40018, 0], [3.59145, -108.67052, 0], [1.92175, -104.63953, 0], [0.72401, -101.74791, 0], [0.08402, -100.20284, 0], [0, -100, 0], [0.08402, -99.79716, 0], [0.72401, -98.25209, 0], [1.92175, -95.36047, 0], [3.59145, -91.32948, 0], [6.79318, -83.59982, 0], [11.91309, -71.23926, 0], [17.37623, -58.05006, 0], [22.49614, -45.6895, 0], [25.69788, -37.95984, 0], [27.36757, -33.92885, 0], [28.56531, -31.03724, 0], [29.2053, -29.49217, 0], [29.28932, -29.28932, 0], [29.49217, -29.2053, 0], [31.03724, -28.56531, 0], [33.92885, -27.36757, 0], [37.95984, -25.69788, 0], [45.6895, -22.49614, 0], [58.05006, -17.37623, 0], [71.23926, -11.91309, 0], [83.59982, -6.79318, 0], [91.32948, -3.59145, 0], [95.36047, -1.92175, 0], [98.25209, -0.72401, 0], [99.79716, -0.08402, 0], [100, 0, 0], [100.20284, -0.08402, 0], [101.74791, -0.72401, 0], [104.63953, -1.92175, 0], [108.67052, -3.59145, 0], [116.40018, -6.79318, 0], [128.76074, -11.91309, 0], [141.94994, -17.37623, 0], [154.3105, -22.49614, 0], [162.04016, -25.69788, 0], [166.07115, -27.36757, 0], [168.96276, -28.56531, 0], [170.50783, -29.2053, 0], [170.71068, -29.28932, 0], [170.7947, -29.49217, 0], [171.43469, -31.03724, 0], [172.63243, -33.92885, 0], [174.30212, -37.95984, 0], [177.50386, -45.6895, 0], [182.62377, -58.05006, 0], [188.08691, -71.23926, 0], [193.20682, -83.59982, 0], [196.40855, -91.32948, 0], [198.07825, -95.36047, 0], [199.27599, -98.25209, 0], [199.91598, -99.79716, 0]]] });
});

test('Parse a circle with a hole.', t => {
  const svgPath = 'M 950,81 A 107,107 0 0,1 950,295 A 107,107 0 0,1 950,81 z ' +
                  'M 950,139 A 49,49 0 0,0 950,237 A 49,49 0 0,0 950,139 z';
  const paths = canonicalize(fromSvgPath({}, svgPath));
  t.deepEqual(paths,
              { paths: [[[950, -81, 0], [955.50621, -81.13923, 0], [966.29504, -82.23288, 0], [976.74097, -84.36864, 0], [986.79019, -87.49273, 0], [996.38892, -91.55136, 0], [1005.48339, -96.49075, 0], [1014.01981, -102.25711, 0], [1021.94438, -108.79666, 0], [1029.20334, -116.05562, 0], [1035.74289, -123.98019, 0], [1041.50925, -132.51661, 0], [1046.44864, -141.61108, 0], [1050.50727, -151.20981, 0], [1053.63136, -161.25903, 0], [1055.76712, -171.70496, 0], [1056.86077, -182.49379, 0], [1057, -188, 0], [1056.86077, -193.50621, 0], [1055.76712, -204.29504, 0], [1053.63136, -214.74097, 0], [1050.50727, -224.79019, 0], [1046.44864, -234.38892, 0], [1041.50925, -243.48339, 0], [1035.74289, -252.01981, 0], [1029.20334, -259.94438, 0], [1021.94438, -267.20334, 0], [1014.01981, -273.74289, 0], [1005.48339, -279.50925, 0], [996.38892, -284.44864, 0], [986.79019, -288.50727, 0], [976.74097, -291.63136, 0], [966.29504, -293.76712, 0], [955.50621, -294.86077, 0], [950, -295, 0], [944.49379, -294.86077, 0], [933.70496, -293.76712, 0], [923.25903, -291.63136, 0], [913.20981, -288.50727, 0], [903.61108, -284.44864, 0], [894.51661, -279.50925, 0], [885.98019, -273.74289, 0], [878.05562, -267.20334, 0], [870.79666, -259.94438, 0], [864.25711, -252.01981, 0], [858.49075, -243.48339, 0], [853.55136, -234.38892, 0], [849.49273, -224.79019, 0], [846.36864, -214.74097, 0], [844.23288, -204.29504, 0], [843.13923, -193.50621, 0], [843, -188, 0], [843.13923, -182.49379, 0], [844.23288, -171.70496, 0], [846.36864, -161.25903, 0], [849.49273, -151.20981, 0], [853.55136, -141.61108, 0], [858.49075, -132.51661, 0], [864.25711, -123.98019, 0], [870.79666, -116.05562, 0], [878.05562, -108.79666, 0], [885.98019, -102.25711, 0], [894.51661, -96.49075, 0], [903.61108, -91.55136, 0], [913.20981, -87.49273, 0], [923.25903, -84.36864, 0], [933.70496, -82.23288, 0], [944.49379, -81.13923, 0]],
                        [[950, -139, 0], [947.47847, -139.06376, 0], [942.53778, -139.56459, 0], [937.75414, -140.54265, 0], [933.15216, -141.97331, 0], [928.75647, -143.83193, 0], [924.59172, -146.09389, 0], [920.68252, -148.73456, 0], [917.05351, -151.72931, 0], [913.72931, -155.05351, 0], [910.73456, -158.68252, 0], [908.09389, -162.59172, 0], [905.83193, -166.75647, 0], [903.97331, -171.15216, 0], [902.54265, -175.75414, 0], [901.56459, -180.53778, 0], [901.06376, -185.47847, 0], [901, -188, 0], [901.06376, -190.52153, 0], [901.56459, -195.46222, 0], [902.54265, -200.24586, 0], [903.97331, -204.84784, 0], [905.83193, -209.24353, 0], [908.09389, -213.40828, 0], [910.73456, -217.31748, 0], [913.72931, -220.94649, 0], [917.05351, -224.27069, 0], [920.68252, -227.26544, 0], [924.59172, -229.90611, 0], [928.75647, -232.16807, 0], [933.15216, -234.02669, 0], [937.75414, -235.45735, 0], [942.53778, -236.43541, 0], [947.47847, -236.93624, 0], [950, -237, 0], [952.52153, -236.93624, 0], [957.46222, -236.43541, 0], [962.24586, -235.45735, 0], [966.84784, -234.02669, 0], [971.24353, -232.16807, 0], [975.40828, -229.90611, 0], [979.31748, -227.26544, 0], [982.94649, -224.27069, 0], [986.27069, -220.94649, 0], [989.26544, -217.31748, 0], [991.90611, -213.40828, 0], [994.16807, -209.24353, 0], [996.02669, -204.84784, 0], [997.45735, -200.24586, 0], [998.43541, -195.46222, 0], [998.93624, -190.52153, 0], [999, -188, 0], [998.93624, -185.47847, 0], [998.43541, -180.53778, 0], [997.45735, -175.75414, 0], [996.02669, -171.15216, 0], [994.16807, -166.75647, 0], [991.90611, -162.59172, 0], [989.26544, -158.68252, 0], [986.27069, -155.05351, 0], [982.94649, -151.72931, 0], [979.31748, -148.73456, 0], [975.40828, -146.09389, 0], [971.24353, -143.83193, 0], [966.84784, -141.97331, 0], [962.24586, -140.54265, 0], [957.46222, -139.56459, 0], [952.52153, -139.06376, 0]]] });
});
