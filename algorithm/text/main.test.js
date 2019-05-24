import { canonicalize } from '@jsxcad/geometry-eager';
import { readFile } from '@jsxcad/sys';
import { test } from 'ava';
import { toFont } from './main';

test('Render a letter', async (t) => {
  const bytes = await readFile({ as: 'bytes' }, 'GreatVibes-Regular.ttf');
  const font = toFont({}, bytes);
  const letterA = font({}, 'ab');
  t.deepEqual(canonicalize(letterA),
              { z0Surface: [[[0.02375, 0.08627, 0], [0.02398, 0.07407, 0], [0.02507, 0.06261, 0], [0.02699, 0.05191, 0], [0.02971, 0.04205, 0], [0.03319, 0.03306, 0], [0.03739, 0.025, 0], [0.04229, 0.01793, 0], [0.04785, 0.01188, 0], [0.05404, 0.00692, 0], [0.06081, 0.00309, 0], [0.06814, 0.00044, 0], [0.07599, -0.00097, 0], [0.08432, -0.00109, 0], [0.09311, 0.00012, 0], [0.10232, 0.00273, 0], [0.11191, 0.00677, 0], [0.12185, 0.0123, 0], [0.1321, 0.01938, 0], [0.14264, 0.02805, 0], [0.148, 0.033, 0], [0.15341, 0.03838, 0], [0.16404, 0.04984, 0], [0.17433, 0.06197, 0], [0.18416, 0.07446, 0], [0.19783, 0.09321, 0], [0.2135, 0.11664, 0], [0.22, 0.127, 0], [0.21741, 0.11739, 0], [0.21352, 0.09951, 0], [0.21123, 0.08337, 0], [0.21041, 0.0689, 0], [0.21094, 0.05602, 0], [0.21266, 0.04465, 0], [0.21546, 0.03473, 0], [0.2192, 0.02617, 0], [0.22374, 0.0189, 0], [0.22895, 0.01285, 0], [0.2347, 0.00793, 0], [0.24086, 0.00409, 0], [0.24729, 0.00124, 0], [0.25385, -0.00069, 0], [0.26042, -0.00178, 0], [0.26687, -0.0021, 0], [0.27, -0.002, 0], [0.27281, -0.00168, 0], [0.27844, -0.00056, 0], [0.28407, 0.00119, 0], [0.28968, 0.00354, 0], [0.29528, 0.00645, 0], [0.30086, 0.00989, 0], [0.30918, 0.01597, 0], [0.32015, 0.02564, 0], [0.33093, 0.03686, 0], [0.33146, 0.03748, 0], [0.33253, 0.03789, 0], [0.334, 0.039, 0], [0.33593, 0.04094, 0], [0.34014, 0.04571, 0], [0.34727, 0.05503, 0], [0.35818, 0.07118, 0], [0.36856, 0.08795, 0], [0.37123, 0.09211, 0], [0.38477, 0.11484, 0], [0.40107, 0.14461, 0], [0.40168, 0.14582, 0], [0.42306, 0.18515, 0], [0.44, 0.217, 0], [0.4327, 0.20177, 0], [0.4194, 0.17235, 0], [0.41076, 0.15137, 0], [0.40572, 0.13799, 0], [0.40132, 0.12515, 0], [0.39759, 0.11289, 0], [0.396, 0.107, 0], [0.39449, 0.10029, 0], [0.39253, 0.08716, 0], [0.392, 0.0745, 0], [0.39256, 0.06538, 0], [0.39339, 0.05951, 0], [0.39458, 0.05382, 0], [0.39615, 0.04833, 0], [0.39809, 0.04304, 0], [0.4004, 0.03799, 0], [0.40309, 0.03317, 0], [0.40616, 0.0286, 0], [0.40961, 0.0243, 0], [0.41344, 0.02028, 0], [0.41766, 0.01655, 0], [0.42226, 0.01313, 0], [0.42726, 0.01004, 0], [0.43265, 0.00728, 0], [0.43843, 0.00487, 0], [0.44461, 0.00283, 0], [0.45119, 0.00117, 0], [0.45817, -0.0001, 0], [0.46555, -0.00096, 0], [0.47334, -0.0014, 0], [0.48154, -0.0014, 0], [0.49014, -0.00095, 0], [0.49916, -0.00004, 0], [0.50859, 0.00135, 0], [0.51844, 0.00323, 0], [0.52871, 0.00561, 0], [0.534, 0.007, 0], [0.53792, 0.00808, 0], [0.54566, 0.01057, 0], [0.55326, 0.01345, 0], [0.56071, 0.01673, 0], [0.56802, 0.02038, 0], [0.57517, 0.02439, 0], [0.58561, 0.03104, 0], [0.59897, 0.04102, 0], [0.61166, 0.05215, 0], [0.62365, 0.06432, 0], [0.6349, 0.07741, 0], [0.6454, 0.09128, 0], [0.65511, 0.10581, 0], [0.66401, 0.12089, 0], [0.67205, 0.13638, 0], [0.67922, 0.15218, 0], [0.68549, 0.16814, 0], [0.69082, 0.18415, 0], [0.69519, 0.2001, 0], [0.697, 0.208, 0], [0.69812, 0.214, 0], [0.69977, 0.22601, 0], [0.7006, 0.23793, 0], [0.70058, 0.24969, 0], [0.69969, 0.26121, 0], [0.6979, 0.27239, 0], [0.69516, 0.28317, 0], [0.69147, 0.29345, 0], [0.68678, 0.30315, 0], [0.68107, 0.31218, 0], [0.67431, 0.32047, 0], [0.66646, 0.32794, 0], [0.65751, 0.33448, 0], [0.64741, 0.34003, 0], [0.63615, 0.3445, 0], [0.62369, 0.34781, 0], [0.617, 0.349, 0], [0.61292, 0.34955, 0], [0.60554, 0.35005, 0], [0.59921, 0.34984, 0], [0.59389, 0.34901, 0], [0.58957, 0.34768, 0], [0.58621, 0.34595, 0], [0.58379, 0.34391, 0], [0.58229, 0.34166, 0], [0.58168, 0.33932, 0], [0.58194, 0.33699, 0], [0.58303, 0.33476, 0], [0.58495, 0.33274, 0], [0.58765, 0.33104, 0], [0.59113, 0.32974, 0], [0.59534, 0.32897, 0], [0.60027, 0.32881, 0], [0.603, 0.329, 0], [0.60591, 0.32923, 0], [0.61145, 0.32939, 0], [0.61665, 0.32916, 0], [0.62149, 0.32855, 0], [0.626, 0.32757, 0], [0.63017, 0.32624, 0], [0.63401, 0.32456, 0], [0.63753, 0.32256, 0], [0.64074, 0.32024, 0], [0.64363, 0.31761, 0], [0.64623, 0.3147, 0], [0.64852, 0.3115, 0], [0.65143, 0.30621, 0], [0.65433, 0.2983, 0], [0.65616, 0.28949, 0], [0.65697, 0.27989, 0], [0.65682, 0.26959, 0], [0.65575, 0.2587, 0], [0.65382, 0.24731, 0], [0.65108, 0.23553, 0], [0.64757, 0.22345, 0], [0.64336, 0.21118, 0], [0.641, 0.205, 0], [0.63766, 0.19738, 0], [0.63017, 0.18153, 0], [0.62171, 0.16516, 0], [0.61248, 0.14861, 0], [0.60264, 0.13222, 0], [0.59238, 0.11633, 0], [0.58186, 0.10127, 0], [0.57127, 0.08739, 0], [0.566, 0.081, 0], [0.55952, 0.07338, 0], [0.54704, 0.05972, 0], [0.53518, 0.04816, 0], [0.52391, 0.03876, 0], [0.51585, 0.03314, 0], [0.51064, 0.03008, 0], [0.50557, 0.02758, 0], [0.50064, 0.02565, 0], [0.49583, 0.02428, 0], [0.49116, 0.02348, 0], [0.4866, 0.02325, 0], [0.48217, 0.0236, 0], [0.48, 0.024, 0], [0.47689, 0.02475, 0], [0.47116, 0.02679, 0], [0.46605, 0.02953, 0], [0.46154, 0.03293, 0], [0.45761, 0.03698, 0], [0.45425, 0.04163, 0], [0.45144, 0.04685, 0], [0.44915, 0.05262, 0], [0.44738, 0.05891, 0], [0.44609, 0.06568, 0], [0.44528, 0.0729, 0], [0.44491, 0.08055, 0], [0.44498, 0.08859, 0], [0.44547, 0.09699, 0], [0.44694, 0.1102, 0], [0.45016, 0.1288, 0], [0.45471, 0.1483, 0], [0.46043, 0.16845, 0], [0.46716, 0.189, 0], [0.47476, 0.20972, 0], [0.48307, 0.23036, 0], [0.49195, 0.25068, 0], [0.50125, 0.27042, 0], [0.506, 0.28, 0], [0.51242, 0.29255, 0], [0.52605, 0.31807, 0], [0.54057, 0.34395, 0], [0.55578, 0.36997, 0], [0.57148, 0.39589, 0], [0.5875, 0.4215, 0], [0.61168, 0.45881, 0], [0.64321, 0.50533, 0], [0.67252, 0.54648, 0], [0.69807, 0.58046, 0], [0.71385, 0.60014, 0], [0.72239, 0.61008, 0], [0.726, 0.614, 0], [0.72336, 0.61354, 0], [0.71804, 0.61317, 0], [0.70999, 0.61368, 0], [0.69931, 0.6155, 0], [0.68896, 0.61742, 0], [0.684, 0.618, 0], [0.679, 0.618, 0], [0.67694, 0.61805, 0], [0.67284, 0.61786, 0], [0.66875, 0.61728, 0], [0.66466, 0.61632, 0], [0.65855, 0.61413, 0], [0.65036, 0.60979, 0], [0.64211, 0.60379, 0], [0.63374, 0.59608, 0], [0.62521, 0.5866, 0], [0.61647, 0.57533, 0], [0.612, 0.569, 0], [0.60381, 0.55651, 0], [0.58669, 0.5288, 0], [0.56874, 0.49793, 0], [0.55011, 0.46443, 0], [0.52126, 0.4105, 0], [0.48192, 0.33463, 0], [0.44279, 0.25832, 0], [0.41434, 0.20347, 0], [0.4121, 0.19924, 0], [0.41154, 0.19872, 0], [0.40875, 0.1951, 0], [0.407, 0.192, 0], [0.40255, 0.18301, 0], [0.3909, 0.16036, 0], [0.37623, 0.13358, 0], [0.36375, 0.11228, 0], [0.35491, 0.0981, 0], [0.34578, 0.08428, 0], [0.33644, 0.07115, 0], [0.32702, 0.05902, 0], [0.3176, 0.04819, 0], [0.30829, 0.03898, 0], [0.30143, 0.03332, 0], [0.29695, 0.03022, 0], [0.29255, 0.02769, 0], [0.28825, 0.02579, 0], [0.28406, 0.02455, 0], [0.27999, 0.024, 0], [0.278, 0.024, 0], [0.2768, 0.02406, 0], [0.27456, 0.0245, 0], [0.27251, 0.0254, 0], [0.27067, 0.02676, 0], [0.26904, 0.02858, 0], [0.26763, 0.03086, 0], [0.26595, 0.03516, 0], [0.26455, 0.04257, 0], [0.26416, 0.05192, 0], [0.26484, 0.06324, 0], [0.26665, 0.07657, 0], [0.268, 0.084, 0], [0.26935, 0.08984, 0], [0.2728, 0.10221, 0], [0.27714, 0.11533, 0], [0.28226, 0.12901, 0], [0.28802, 0.14306, 0], [0.2943, 0.1573, 0], [0.30444, 0.17861, 0], [0.31865, 0.20592, 0], [0.33274, 0.23061, 0], [0.34573, 0.25117, 0], [0.35416, 0.26298, 0], [0.35892, 0.26879, 0], [0.361, 0.271, 0], [0.35836, 0.27054, 0], [0.35304, 0.27017, 0], [0.34499, 0.27068, 0], [0.33431, 0.2725, 0], [0.32396, 0.27442, 0], [0.319, 0.275, 0], [0.31605, 0.27511, 0], [0.31045, 0.27488, 0], [0.30522, 0.27406, 0], [0.30031, 0.27266, 0], [0.29569, 0.2707, 0], [0.29132, 0.26817, 0], [0.28717, 0.2651, 0], [0.28319, 0.2615, 0], [0.27934, 0.25737, 0], [0.27559, 0.25274, 0], [0.27007, 0.24486, 0], [0.2627, 0.23267, 0], [0.25504, 0.21866, 0], [0.251, 0.211, 0], [0.24115, 0.19264, 0], [0.22589, 0.16528, 0], [0.21531, 0.14727, 0], [0.20434, 0.12956, 0], [0.19291, 0.11221, 0], [0.18098, 0.09532, 0], [0.16848, 0.07896, 0], [0.162, 0.071, 0], [0.15757, 0.06589, 0], [0.14863, 0.05654, 0], [0.13966, 0.04838, 0], [0.13077, 0.04145, 0], [0.12207, 0.03581, 0], [0.11366, 0.03148, 0], [0.10565, 0.02853, 0], [0.09815, 0.02698, 0], [0.09292, 0.02677, 0], [0.08965, 0.0271, 0], [0.08657, 0.0278, 0], [0.08368, 0.02889, 0], [0.08101, 0.03036, 0], [0.07857, 0.03223, 0], [0.07637, 0.03449, 0], [0.07442, 0.03717, 0], [0.07274, 0.04025, 0], [0.07134, 0.04375, 0], [0.07023, 0.04767, 0], [0.06943, 0.05201, 0], [0.06884, 0.05934, 0], [0.06925, 0.07067, 0], [0.07, 0.077, 0], [0.07062, 0.08059, 0], [0.07221, 0.08794, 0], [0.07533, 0.09923, 0], [0.08056, 0.11444, 0], [0.08658, 0.12934, 0], [0.09294, 0.14338, 0], [0.09915, 0.15602, 0], [0.10719, 0.1712, 0], [0.111, 0.178, 0], [0.11793, 0.18905, 0], [0.13279, 0.21096, 0], [0.14874, 0.23227, 0], [0.16551, 0.25259, 0], [0.18284, 0.27151, 0], [0.19605, 0.28455, 0], [0.20488, 0.29259, 0], [0.2137, 0.30007, 0], [0.22248, 0.30692, 0], [0.23118, 0.3131, 0], [0.23976, 0.31856, 0], [0.244, 0.321, 0], [0.24747, 0.32279, 0], [0.25438, 0.32589, 0], [0.26124, 0.32832, 0], [0.26801, 0.3301, 0], [0.27464, 0.33121, 0], [0.2811, 0.33166, 0], [0.28735, 0.33144, 0], [0.29335, 0.33056, 0], [0.29907, 0.32902, 0], [0.30446, 0.3268, 0], [0.3095, 0.32392, 0], [0.31413, 0.32036, 0], [0.31832, 0.31613, 0], [0.32204, 0.31122, 0], [0.32524, 0.30564, 0], [0.32789, 0.29938, 0], [0.329, 0.296, 0], [0.33057, 0.29578, 0], [0.33353, 0.29567, 0], [0.33626, 0.29597, 0], [0.33873, 0.29667, 0], [0.34092, 0.29773, 0], [0.34281, 0.2991, 0], [0.34439, 0.30077, 0], [0.34563, 0.3027, 0], [0.34652, 0.30485, 0], [0.34704, 0.3072, 0], [0.34717, 0.30972, 0], [0.34688, 0.31236, 0], [0.34617, 0.3151, 0], [0.345, 0.31791, 0], [0.34337, 0.32075, 0], [0.34125, 0.32359, 0], [0.34, 0.325, 0], [0.33729, 0.32783, 0], [0.33161, 0.33307, 0], [0.32563, 0.33775, 0], [0.31936, 0.34188, 0], [0.31283, 0.34546, 0], [0.30604, 0.34853, 0], [0.29903, 0.35107, 0], [0.29182, 0.35312, 0], [0.28442, 0.35467, 0], [0.27686, 0.35574, 0], [0.26915, 0.35635, 0], [0.26132, 0.3565, 0], [0.25339, 0.35621, 0], [0.24538, 0.35549, 0], [0.2373, 0.35435, 0], [0.22919, 0.3528, 0], [0.21699, 0.34974, 0], [0.20078, 0.34434, 0], [0.18478, 0.33753, 0], [0.16916, 0.32939, 0], [0.15409, 0.32003, 0], [0.13972, 0.30954, 0], [0.12623, 0.29802, 0], [0.11378, 0.28555, 0], [0.108, 0.279, 0], [0.10109, 0.27052, 0], [0.08824, 0.25362, 0], [0.07668, 0.23682, 0], [0.06635, 0.22019, 0], [0.05724, 0.20377, 0], [0.0493, 0.18762, 0], [0.04251, 0.17178, 0], [0.03682, 0.15632, 0], [0.0322, 0.14126, 0], [0.02862, 0.12668, 0], [0.02604, 0.11262, 0], [0.02443, 0.09913, 0]]] });
});
