import { canonicalize } from '@jsxcad/geometry-tagged';
import { readFile } from '@jsxcad/sys';
import test from 'ava';
import { toFont } from './main';

test('Render a letter', async (t) => {
  const bytes = await readFile({ as: 'bytes' }, 'GreatVibes-Regular.ttf');
  const font = toFont({}, bytes);
  const letterA = font({}, 'ab');
  t.deepEqual(canonicalize(letterA),
              {"z0Surface":[[[0.51503,0.44151,0],[0.49972,0.4439,0],[0.4925,0.445,0],[0.4889,0.445,0],[0.48297,0.44472,0],[0.47119,0.44078,0],[0.45321,0.42595,0],[0.4406,0.4097,0],[0.41599,0.36989,0],[0.36117,0.26847,0],[0.30506,0.15936,0],[0.29575,0.14238,0],[0.2956,0.14228,0],[0.293,0.1382,0],[0.28547,0.12363,0],[0.27227,0.09957,0],[0.23885,0.04675,0],[0.21868,0.02525,0],[0.20605,0.01807,0],[0.2002,0.0173,0],[0.19695,0.01795,0],[0.19226,0.02319,0],[0.19036,0.0413,0],[0.193,0.0605,0],[0.19793,0.07827,0],[0.21427,0.1184,0],[0.24438,0.17387,0],[0.2599,0.1951,0],[0.25223,0.19457,0],[0.23692,0.19696,0],[0.2297,0.198,0],[0.22161,0.19766,0],[0.20824,0.19202,0],[0.19182,0.17208,0],[0.1807,0.1519,0],[0.16634,0.12552,0],[0.13462,0.07467,0],[0.1166,0.0511,0],[0.10376,0.03765,0],[0.0789,0.02146,0],[0.06342,0.0197,0],[0.05576,0.02395,0],[0.05094,0.03283,0],[0.04959,0.0466,0],[0.0504,0.0554,0],[0.05602,0.07691,0],[0.07349,0.11642,0],[0.0799,0.1282,0],[0.10124,0.15963,0],[0.13798,0.20181,0],[0.16334,0.22325,0],[0.1757,0.2311,0],[0.18564,0.23556,0],[0.20467,0.23877,0],[0.22108,0.23433,0],[0.23309,0.22213,0],[0.2369,0.2131,0],[0.24116,0.21295,0],[0.24742,0.21594,0],[0.24996,0.22209,0],[0.24786,0.22991,0],[0.2448,0.234,0],[0.23664,0.24154,0],[0.21787,0.25189,0],[0.1966,0.25638,0],[0.1738,0.25556,0],[0.15042,0.24999,0],[0.12742,0.2402,0],[0.10574,0.22675,0],[0.08634,0.21018,0],[0.0778,0.2009,0],[0.05928,0.17657,0],[0.03296,0.12938,0],[0.01959,0.08613,0],[0.01759,0.04917,0],[0.02536,0.02086,0],[0.04132,0.00354,0],[0.06387,-0.00043,0],[0.09144,0.01131,0],[0.1066,0.0238,0],[0.12185,0.04021,0],[0.14838,0.07577,0],[0.1584,0.0914,0],[0.15277,0.06565,0],[0.15238,0.03607,0],[0.15639,0.02177,0],[0.16686,0.00737,0],[0.18513,-0.00094,0],[0.1944,-0.0014,0],[0.2025,0.00021,0],[0.21862,0.00853,0],[0.23804,0.02711,0],[0.2405,0.0281,0],[0.25384,0.04509,0],[0.27552,0.08203,0],[0.28308,0.09356,0],[0.28863,0.10436,0],[0.29294,0.1117,0],[0.3168,0.1562,0],[0.30659,0.13453,0],[0.29048,0.09468,0],[0.2851,0.077,0],[0.28319,0.06741,0],[0.28245,0.04921,0],[0.2859,0.03286,0],[0.29365,0.019,0],[0.30581,0.00829,0],[0.32247,0.00138,0],[0.34373,-0.00108,0],[0.36971,0.00156,0],[0.3845,0.005,0],[0.39565,0.00858,0],[0.41669,0.01908,0],[0.4448,0.04185,0],[0.47497,0.08159,0],[0.49554,0.12686,0],[0.5018,0.1498,0],[0.50418,0.16704,0],[0.50158,0.20005,0],[0.49251,0.22159,0],[0.48276,0.23352,0],[0.46985,0.24294,0],[0.45362,0.24936,0],[0.4442,0.2513,0],[0.43358,0.25203,0],[0.4211,0.24836,0],[0.41933,0.24181,0],[0.4271,0.23709,0],[0.4342,0.2369,0],[0.44218,0.23713,0],[0.45514,0.23433,0],[0.46437,0.22766,0],[0.47016,0.21771,0],[0.47302,0.19786,0],[0.46755,0.16525,0],[0.4615,0.1476,0],[0.45076,0.12484,0],[0.42274,0.07824,0],[0.4075,0.0583,0],[0.38953,0.03865,0],[0.36584,0.02073,0],[0.35199,0.01679,0],[0.3456,0.0173,0],[0.33733,0.02024,0],[0.32599,0.03183,0],[0.32083,0.04988,0],[0.321,0.07297,0],[0.32934,0.114,0],[0.35095,0.17322,0],[0.3643,0.2016,0],[0.38391,0.23832,0],[0.42882,0.31257,0],[0.49382,0.40643,0],[0.5227,0.4421,0]]]});
});
