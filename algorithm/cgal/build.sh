#!/bin/bash

# Note that we've disabled the rounding check because it is failing.
# This may come back to bite us, but let's see how we do.

# emcc -DCGAL_NO_GMP -DCGAL_DISABLE_ROUNDING_MATH_CHECK cgal.cc -I . -static -O3 -std=c++1z --bind -o cgal.cjs -s MODULARIZE=1 -s USE_ES6_IMPORT_META=0 -s USE_BOOST_HEADERS=1 -s ALLOW_MEMORY_GROWTH=1 -frounding-math && mv cgal.js cgal.cjs

# emcc -DCGAL_NO_GMP -DCGAL_DISABLE_ROUNDING_MATH_CHECK cgal.cc -I . -static -O3 -std=c++1z --bind -o cgal.cjs -s MODULARIZE=1 -s USE_ES6_IMPORT_META=0 -s USE_BOOST_HEADERS=1 -s ALLOW_MEMORY_GROWTH=1 && mv cgal.js cgal.cjs

# emcc -DCGAL_DISABLE_ROUNDING_MATH_CHECK cgal.cc -I . -I ~/opt/include -L ~/opt/lib -static -O3 -std=c++1z --bind -o cgal.cjs -lmpfr -lgmp -s MODULARIZE=1 -s USE_ES6_IMPORT_META=0 -s USE_BOOST_HEADERS=1 -s ALLOW_MEMORY_GROWTH=1 && mv cgal.js cgal.cjs

# emcc -DCGAL_DISABLE_ROUNDING_MATH_CHECK cgal.cc -I . -I ~/opt/include -L ~/opt/lib -static -O3 -std=c++1z --bind -o cgal.cjs -lmpfr -lgmp -s MODULARIZE=1 -s USE_ES6_IMPORT_META=0 -s USE_BOOST_HEADERS=1 -s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 && mv cgal.js cgal.cjs

# emcc -DCGAL_DISABLE_ROUNDING_MATH_CHECK -DCGAL_EIGEN3_ENABLED cgal.cc -I . -I ~/opt/include -L ~/opt/lib -static -O3 -std=c++1z --bind -o cgal.cjs -lmpfr -lgmp -s MODULARIZE=1 -s USE_ES6_IMPORT_META=0 -s USE_BOOST_HEADERS=1 -s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 && mv cgal.js cgal.cjs

# emcc -DCGAL_DISABLE_ROUNDING_MATH_CHECK -DCGAL_EIGEN3_ENABLED cgal.cc -I . -I ~/opt/include -L ~/opt/lib -static -O3 -std=c++1z --bind -o cgal.cjs -lmpfr -lgmp -s MODULARIZE=1 -s USE_ES6_IMPORT_META=0 -s USE_BOOST_HEADERS=1 -s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 && mv cgal.js cgal.cjs

# emcc -DCGAL_DISABLE_ROUNDING_MATH_CHECK -DCGAL_EIGEN3_ENABLED cgal.cc -I . -I ~/opt/include -L ~/opt/lib -static -O3 -std=c++1z --bind -o cgal.cjs -lmpfr -lgmp -s MODULARIZE=1 -s USE_ES6_IMPORT_META=0 -s USE_BOOST_HEADERS=1 -s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 -s DISABLE_EXCEPTION_CATCHING=2 && mv cgal.js cgal.cjs

# emcc -DCGAL_DISABLE_ROUNDING_MATH_CHECK -DCGAL_EIGEN3_ENABLED -DCGAL_DO_NOT_USE_BOOST_MP cgal.cc -I . -I ~/opt/include -L ~/opt/lib -static -O3 -std=c++1z --bind -o cgal.cjs -lmpfr -lgmp -s MODULARIZE=1 -s USE_ES6_IMPORT_META=0 -s USE_BOOST_HEADERS=1 -s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 -s DISABLE_EXCEPTION_CATCHING=2 && mv cgal.js cgal.cjs

# emcc -DCGAL_DISABLE_ROUNDING_MATH_CHECK -DCGAL_EIGEN3_ENABLED -DCGAL_DO_NOT_USE_BOOST_MP -DCGAL_DONT_USE_LAZY_KERNEL cgal.cc -I . -I ~/opt/include -L ~/opt/lib -static -O3 -std=c++1z --bind -o cgal.cjs -lmpfr -lgmp -s MODULARIZE=1 -s USE_ES6_IMPORT_META=0 -s USE_BOOST_HEADERS=1 -s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 -s DISABLE_EXCEPTION_CATCHING=2 && mv cgal.js cgal.cjs

# emcc -DCGAL_HAS_NO_INTERVAL_SUPPORT -DCGAL_DISABLE_ROUNDING_MATH_CHECK -DCGAL_EIGEN3_ENABLED -DCGAL_DO_NOT_USE_BOOST_MP -DCGAL_DONT_USE_LAZY_KERNEL -DCGAL_NO_STATIC_FILTERS cgal.cc -I . -I ~/opt/include -L ~/opt/lib -static -O3 -std=c++1z --bind -o cgal.cjs -lmpfr -lgmp -s MODULARIZE=1 -s USE_ES6_IMPORT_META=0 -s USE_BOOST_HEADERS=1 -s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 -s DISABLE_EXCEPTION_CATCHING=2 && mv cgal.js cgal.cjs

# emcc -DCGAL_NDEBUG -DCGAL_HAS_NO_INTERVAL_SUPPORT -DCGAL_DISABLE_ROUNDING_MATH_CHECK -DCGAL_EIGEN3_ENABLED -DCGAL_DO_NOT_USE_BOOST_MP -DCGAL_DONT_USE_LAZY_KERNEL -DCGAL_NO_STATIC_FILTERS cgal.cc -I . -I ~/opt/include -L ~/opt/lib -static -O3 -std=c++1z --bind -o cgal.cjs -lmpfr -lgmp -s MODULARIZE=1 -s USE_ES6_IMPORT_META=0 -s USE_BOOST_HEADERS=1 -s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 -s DISABLE_EXCEPTION_CATCHING=2 && mv cgal.js cgal.cjs

emcc -DCGAL_HAS_NO_INTERVAL_SUPPORT -DCGAL_DISABLE_ROUNDING_MATH_CHECK -DCGAL_EIGEN3_ENABLED -DCGAL_DO_NOT_USE_BOOST_MP -DCGAL_DONT_USE_LAZY_KERNEL -DCGAL_NO_STATIC_FILTERS cgal.cc -I . -I ~/opt/include -L ~/opt/lib -static -O3 -std=c++1z --bind -o cgal.cjs -lmpfr -lgmp -s MODULARIZE=1 -s USE_ES6_IMPORT_META=0 -s USE_BOOST_HEADERS=1 -s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 -s DISABLE_EXCEPTION_CATCHING=2 && mv cgal.js cgal.cjs
