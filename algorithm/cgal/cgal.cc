#include <emscripten/bind.h>

#include <array>

#include <CGAL/MP_Float.h>
#include <CGAL/Quotient.h>
#include <CGAL/Extended_cartesian.h>
#include <CGAL/Simple_cartesian.h>
#include <CGAL/Bounded_kernel.h>
#include <CGAL/Exact_predicates_exact_constructions_kernel.h>
#include <CGAL/Nef_nary_union_3.h>
#include <CGAL/Nef_polyhedron_3.h>

#include <CGAL/Advancing_front_surface_reconstruction.h>
#include <CGAL/Polygon_mesh_processing/corefinement.h>
#include <CGAL/Polygon_mesh_processing/detect_features.h>
#include <CGAL/Polygon_mesh_processing/extrude.h>
#include <CGAL/Polygon_mesh_processing/orientation.h>
#include <CGAL/Polygon_mesh_processing/polygon_mesh_to_polygon_soup.h>
#include <CGAL/Polygon_mesh_processing/polygon_soup_to_polygon_mesh.h>
#include <CGAL/Polygon_mesh_processing/remesh.h>
#include <CGAL/Polygon_mesh_processing/repair_polygon_soup.h>
#include <CGAL/Polygon_mesh_processing/smooth_mesh.h>
#include <CGAL/Polygon_mesh_processing/smooth_shape.h>
#include <CGAL/Polygon_mesh_processing/triangulate_faces.h>
#include <CGAL/Polyhedron_3.h>
#include <CGAL/Polyhedron_items_with_id_3.h>
#include <CGAL/Surface_mesh.h>
#include <CGAL/boost/graph/Named_function_parameters.h>
#include <CGAL/boost/graph/convert_nef_polyhedron_to_polygon_mesh.h>
#include <CGAL/Unique_hash_map.h>

#ifdef SURFACE_MESH_BOOLEANS
typedef CGAL::Extended_cartesian<CGAL::Gmpq> Kernel;
#else
typedef CGAL::Simple_cartesian<CGAL::Gmpq> Kernel;
// typedef CGAL::Exact_predicates_exact_constructions_kernel Kernel;
#endif

typedef CGAL::Nef_polyhedron_3<Kernel, CGAL::SNC_indexed_items> Nef_polyhedron;
typedef CGAL::Polyhedron_3<Kernel, CGAL::Polyhedron_items_with_id_3> Polyhedron;
typedef Kernel::Point_3 Point;
typedef Kernel::Plane_3 Plane;
typedef Kernel::Vector_3 Vector;
typedef std::vector<Point> Points;
typedef CGAL::Surface_mesh<Point> Surface_mesh;
typedef Surface_mesh::Halfedge_index Halfedge_index;
typedef Surface_mesh::Face_index Face_index;
typedef Surface_mesh::Vertex_index Vertex_index;

typedef std::array<Kernel::FT, 3> Triple;
typedef std::vector<Triple> Triples;

typedef std::vector<std::size_t> Polygon;

void Polygon__push_back(Polygon* polygon, std::size_t index) {
  polygon->push_back(index);
}

typedef std::vector<Polygon> Polygons;

struct Triple_array_traits
{
  struct Equal_3
  {
    bool operator()(const Triple& p, const Triple& q) const {
      return (p == q);
    }
  };
  struct Less_xyz_3
  {
    bool operator()(const Triple& p, const Triple& q) const {
      return std::lexicographical_compare(p.begin(), p.end(), q.begin(), q.end());
    }
  };
  Equal_3 equal_3_object() const { return Equal_3(); }
  Less_xyz_3 less_xyz_3_object() const { return Less_xyz_3(); }
};

Surface_mesh* FromPolygonSoupToSurfaceMesh(emscripten::val fill) {
  Triples triples;
  Polygons polygons;
  // Workaround for emscripten::val() bindings.
  Triples* triples_ptr = &triples;
  Polygons* polygons_ptr = &polygons;
  fill(triples_ptr, polygons_ptr);
  CGAL::Polygon_mesh_processing::repair_polygon_soup(triples, polygons, CGAL::parameters::geom_traits(Triple_array_traits()));
  Surface_mesh* mesh = new Surface_mesh();
  CGAL::Polygon_mesh_processing::orient_polygon_soup(triples, polygons);
  CGAL::Polygon_mesh_processing::polygon_soup_to_polygon_mesh(triples, polygons, *mesh);
  assert(CGAL::Polygon_mesh_processing::triangulate_faces(*mesh) == true);
  return mesh;
}

void FromSurfaceMeshToPolygonSoup(Surface_mesh* mesh, bool triangulate, emscripten::val emit_polygon, emscripten::val emit_point) {
  if (triangulate) {
    // Note: Destructive update.
    CGAL::Polygon_mesh_processing::triangulate_faces(mesh->faces(), *mesh);
  }
  Points points;
  Polygons polygons;
  CGAL::Polygon_mesh_processing::polygon_mesh_to_polygon_soup(*mesh, points, polygons);
  for (const auto& polygon : polygons) {
    emit_polygon();
    for (const auto& index : polygon) {
      const auto& p = points[index];
      emit_point(CGAL::to_double(p.x()), CGAL::to_double(p.y()), CGAL::to_double(p.z()));
    }
  }
}

Nef_polyhedron* FromPolygonSoupToNefPolyhedron(emscripten::val load) {
  Triples triples;
  Polygons polygons;
  // Workaround for emscripten::val() bindings.
  Triples* triples_ptr = &triples;
  Polygons* polygons_ptr = &polygons;
  load(triples_ptr, polygons_ptr);
  CGAL::Nef_nary_union_3<Nef_polyhedron> nary_union;
  for (const auto& polygon : polygons) {
    std::vector<Point> points;
    for (const auto& index : polygon) {
      const auto& triple = triples[index];
      points.emplace_back(Point{ triple[0], triple[1], triple[2] });
    }
    Nef_polyhedron nef_polygon(points.begin(), points.end());
    if (!nef_polygon.is_empty()) {
      nary_union.add_polyhedron(nef_polygon);
    }
  }
  Nef_polyhedron* nef = new Nef_polyhedron(nary_union.get_union());
  CGAL::Mark_bounded_volumes<Nef_polyhedron> mbv(true);
  nef->delegate(mbv);
  return nef;
}

Nef_polyhedron* FromSurfaceMeshToNefPolyhedron(const Surface_mesh* surface_mesh) {
  return new Nef_polyhedron(*surface_mesh);
}

void FromNefPolyhedronToPolygons(Nef_polyhedron* nef_polyhedron, bool triangulate, emscripten::val emit_point, emscripten::val emit_polygon) {
  Points points;
  Polygons polygons;
  convert_nef_polyhedron_to_polygon_soup(*nef_polyhedron, points, polygons, triangulate);
  for (const auto& polygon : polygons) {
    emit_polygon();
    for (const auto& index : polygon) {
      const auto& p = points[index];
      emit_point(CGAL::to_double(p.x()), CGAL::to_double(p.y()), CGAL::to_double(p.z()));
    }
  }
}

Surface_mesh* FromNefPolyhedronToSurfaceMesh(Nef_polyhedron* nef_polyhedron) {
  Surface_mesh* mesh = new Surface_mesh();
  CGAL::convert_nef_polyhedron_to_polygon_mesh(*nef_polyhedron, *mesh);
  assert(CGAL::Polygon_mesh_processing::triangulate_faces(*mesh) == true);
  return mesh;
}

struct TriangularSurfaceMeshBuilder {
  typedef std::array<std::size_t,3> Facet;

  Surface_mesh& mesh;

  template < typename PointIterator>
  TriangularSurfaceMeshBuilder(Surface_mesh& mesh, PointIterator b, PointIterator e) : mesh(mesh) {
    for(; b!=e; ++b) {
      boost::graph_traits<Surface_mesh>::vertex_descriptor v;
      v = add_vertex(mesh);
      mesh.point(v) = *b;
    }
  }

  TriangularSurfaceMeshBuilder& operator=(const Facet f) {
    typedef boost::graph_traits<Surface_mesh>::vertex_descriptor vertex_descriptor;
    typedef boost::graph_traits<Surface_mesh>::vertices_size_type size_type;
    mesh.add_face(vertex_descriptor(static_cast<size_type>(f[0])),
                  vertex_descriptor(static_cast<size_type>(f[1])),
                  vertex_descriptor(static_cast<size_type>(f[2])));
    return *this;
  }

  TriangularSurfaceMeshBuilder& operator*() { return *this; }
  TriangularSurfaceMeshBuilder& operator++() { return *this; }
  TriangularSurfaceMeshBuilder operator++(int) { return *this; }
};

Surface_mesh* FromPointsToSurfaceMesh(emscripten::val fill) {
  Surface_mesh* mesh = new Surface_mesh();
  std::vector<Triple> triples;
  std::vector<Triple>* triples_ptr = &triples;
  fill(triples_ptr);
  std::vector<Point> points;
  for (const auto& triple : triples) {
    points.emplace_back(Point{ triple[0], triple[1], triple[2] });
  }
  TriangularSurfaceMeshBuilder builder(*mesh, points.begin(), points.end());
  CGAL::advancing_front_surface_reconstruction(points.begin(),
                                               points.end(),
                                               builder);
  return mesh;
}

Surface_mesh* SmoothSurfaceMesh(Surface_mesh* input) {
  typedef boost::graph_traits<Surface_mesh>::edge_descriptor edge_descriptor;

  Surface_mesh* mesh = new Surface_mesh(*input);

  CGAL::Polygon_mesh_processing::isotropic_remeshing(
    mesh->faces(),
    0.1,
    *mesh,
    CGAL::Polygon_mesh_processing::parameters::number_of_iterations(5));

#if 0
  typedef boost::property_map<Surface_mesh, CGAL::edge_is_feature_t>::type EIFMap;
  EIFMap eif = get(CGAL::edge_is_feature, *mesh);
  // Constrain edges with a dihedral angle over the limit.
  CGAL::Polygon_mesh_processing::detect_sharp_edges(*mesh, 60, eif);

  int sharp_counter = 0;
  for (edge_descriptor e : edges(*mesh)) {
    if(get(eif, e)) {
      ++sharp_counter;
    }
  }
#endif

  const unsigned int nb_iterations = 1;

#if 0
  CGAL::Polygon_mesh_processing::smooth_shape(mesh->faces(), *mesh, 1e-4, CGAL::Polygon_mesh_processing::parameters::number_of_iterations(nb_iterations));
#else
  // Smooth with both angle and area criteria + Delaunay flips
  CGAL::Polygon_mesh_processing::smooth_mesh(
      *mesh,
      CGAL::Polygon_mesh_processing::parameters::number_of_iterations(nb_iterations)
          .use_safety_constraints(false) // authorize all moves
          // .edge_is_constrained_map(eif)
  );
#endif

  return mesh;
}

void Surface_mesh__EachFace(Surface_mesh* mesh, emscripten::val op) {
  for (const auto& face_index : mesh->faces()) {
    if (!mesh->is_removed(face_index)) {
      op(std::size_t(face_index));
    }
  }
}

void addTriple(Triples* triples, float x, float y, float z) {
  triples->emplace_back(Triple{ x, y, z });
}

std::size_t Surface_mesh__halfedge_to_target(Surface_mesh* mesh, std::size_t halfedge_index) {
  return std::size_t(mesh->target(Halfedge_index(halfedge_index)));
}

std::size_t Surface_mesh__halfedge_to_face(Surface_mesh* mesh, std::size_t halfedge_index) {
  return std::size_t(mesh->face(Halfedge_index(halfedge_index)));
}

std::size_t Surface_mesh__halfedge_to_next_halfedge(Surface_mesh* mesh, std::size_t halfedge_index) {
  return std::size_t(mesh->next(Halfedge_index(halfedge_index)));
}

std::size_t Surface_mesh__halfedge_to_prev_halfedge(Surface_mesh* mesh, std::size_t halfedge_index) {
  return std::size_t(mesh->prev(Halfedge_index(halfedge_index)));
}

std::size_t Surface_mesh__halfedge_to_opposite_halfedge(Surface_mesh* mesh, std::size_t halfedge_index) {
  return std::size_t(mesh->opposite(Halfedge_index(halfedge_index)));
}

std::size_t Surface_mesh__vertex_to_halfedge(Surface_mesh* mesh, std::size_t vertex_index) {
  return std::size_t(mesh->halfedge(Vertex_index(vertex_index)));
}

std::size_t Surface_mesh__face_to_halfedge(Surface_mesh* mesh, std::size_t face_index) {
  return std::size_t(mesh->halfedge(Face_index(face_index)));
}

const Point& Surface_mesh__vertex_to_point(Surface_mesh* mesh, std::size_t vertex_index) {
  return mesh->point(Vertex_index(vertex_index));
}

const std::size_t Surface_mesh__add_vertex(Surface_mesh* mesh, float x, float y, float z) {
  std::size_t index(mesh->add_vertex(Point{x, y, z}));
  assert(index == std::size_t(Vertex_index(index)));
  return index;
}

const std::size_t Surface_mesh__add_face(Surface_mesh* mesh) {
  std::size_t index(mesh->add_face());
  assert(index == std::size_t(Face_index(index)));
  return index;
}

const std::size_t Surface_mesh__add_face_vertices(Surface_mesh* mesh, emscripten::val next_vertex) {
  std::vector<Vertex_index> vertices;
  for (;;) {
    Vertex_index vertex(next_vertex().as<std::size_t>());
    if (!vertices.empty() && vertex == vertices[0]) {
      break;
    }
    vertices.push_back(vertex);
  }
  std::size_t index(mesh->add_face(vertices));
  return index;
}

const std::size_t Surface_mesh__add_edge(Surface_mesh* mesh) {
  std::size_t index(mesh->add_edge());
  assert(index == std::size_t(Halfedge_index(index)));
  return index;
}

void Surface_mesh__set_edge_target(Surface_mesh* mesh, std::size_t edge, std::size_t target) {
  mesh->set_target(Halfedge_index(edge), Vertex_index(target));
}

void Surface_mesh__set_edge_next(Surface_mesh* mesh, std::size_t edge, std::size_t next) {
  mesh->set_next(Halfedge_index(edge), Halfedge_index(next));
}

void Surface_mesh__set_edge_face(Surface_mesh* mesh, std::size_t edge, std::size_t face) {
  mesh->set_face(Halfedge_index(edge), Face_index(face));
}

void Surface_mesh__set_face_edge(Surface_mesh* mesh, std::size_t face, std::size_t edge) {
  mesh->set_halfedge(Face_index(face), Halfedge_index(edge));
}

void Surface_mesh__set_vertex_edge(Surface_mesh* mesh, std::size_t face, std::size_t edge) {
  mesh->set_halfedge(Vertex_index(face), Halfedge_index(edge));
}

void Surface_mesh__set_vertex_halfedge_to_border_halfedge(Surface_mesh* mesh, std::size_t edge) {
  return mesh->set_vertex_halfedge_to_border_halfedge(Halfedge_index(edge));
}

void Surface_mesh__collect_garbage(Surface_mesh* mesh) {
  mesh->collect_garbage();
}

template<typename MAP>
struct Project
{
  Project(MAP map, Vector vector): map(map), vector(vector) {}
  template<typename VD, typename T>
  void operator()(const T&,VD vd) const
  {
    put(map, vd, get(map, vd) + vector);
  }
  MAP map;
  Vector vector;
};

Surface_mesh* ExtrusionOfSurfaceMesh(Surface_mesh* mesh, double high_x, double high_y, double high_z, double low_x, double low_y, double low_z) {
  Surface_mesh* extruded_mesh = new Surface_mesh();

  typedef typename boost::property_map<Surface_mesh, CGAL::vertex_point_t>::type VPMap;
  Project<VPMap> bottom(get(CGAL::vertex_point, *extruded_mesh), Vector(high_x, high_y, high_z));
  Project<VPMap> top(get(CGAL::vertex_point, *extruded_mesh), Vector(low_x, low_y, low_z));

  CGAL::Polygon_mesh_processing::extrude_mesh(*mesh, *extruded_mesh, bottom, top);

  return extruded_mesh;
}

Nef_polyhedron* DifferenceOfNefPolyhedrons(Nef_polyhedron* a, Nef_polyhedron* b) {
  return new Nef_polyhedron(*a - *b);
}

Nef_polyhedron* IntersectionOfNefPolyhedrons(Nef_polyhedron* a, Nef_polyhedron* b) {
  return new Nef_polyhedron(*a * *b);
}

Nef_polyhedron* UnionOfNefPolyhedrons(Nef_polyhedron* a, Nef_polyhedron* b) {
  return new Nef_polyhedron(*a + *b);
}

Nef_polyhedron* SectionOfNefPolyhedron(Nef_polyhedron* a, double x, double y, double z, double w) {
  return new Nef_polyhedron(a->intersection(Plane(x, y, z, w), Nef_polyhedron::Intersection_mode::PLANE_ONLY));
}

#ifdef SURFACE_MESH_BOOLEANS
Surface_mesh* DifferenceOfSurfaceMeshes(Surface_mesh* a, Surface_mesh* b) {
  Surface_mesh* c = new Surface_mesh();
  CGAL::Polygon_mesh_processing::corefine_and_compute_difference(
      *a, *b, *c,
      CGAL::Polygon_mesh_processing::parameters::throw_on_self_intersection(true),
      CGAL::Polygon_mesh_processing::parameters::throw_on_self_intersection(true),
      CGAL::Polygon_mesh_processing::parameters::throw_on_self_intersection(true));
  return c;
}

Surface_mesh* IntersectionOfSurfaceMeshes(Surface_mesh* a, Surface_mesh* b) {
  Surface_mesh* c = new Surface_mesh();
  CGAL::Polygon_mesh_processing::corefine_and_compute_intersection(
      *a, *b, *c,
      CGAL::Polygon_mesh_processing::parameters::throw_on_self_intersection(true),
      CGAL::Polygon_mesh_processing::parameters::throw_on_self_intersection(true),
      CGAL::Polygon_mesh_processing::parameters::throw_on_self_intersection(true));
  return c;
}

Surface_mesh* UnionOfSurfaceMeshes(Surface_mesh* a, Surface_mesh* b) {
  Surface_mesh* c = new Surface_mesh();
  CGAL::Polygon_mesh_processing::corefine_and_compute_union(
      *a, *b, *c,
      CGAL::Polygon_mesh_processing::parameters::throw_on_self_intersection(true),
      CGAL::Polygon_mesh_processing::parameters::throw_on_self_intersection(true),
      CGAL::Polygon_mesh_processing::parameters::throw_on_self_intersection(true));
  return c;
}
#endif

double FT__to_double(const Kernel::FT& ft) {
  return CGAL::to_double(ft);
}

void Nef_polyhedron__EachHalfedge(Nef_polyhedron* nef, emscripten::val op) {
  for (auto it = nef->halfedges_begin(); it != nef->halfedges_end(); ++it) {
  }
}

typedef Nef_polyhedron::Vertex_const_handle Vertex_const_handle;
typedef Nef_polyhedron::Halfedge_const_handle Halfedge_const_handle;
typedef Nef_polyhedron::Halffacet_const_handle Halffacet_const_handle;
typedef Nef_polyhedron::Halffacet_cycle_const_iterator Halffacet_cycle_const_iterator;
typedef Nef_polyhedron::SHalfedge_handle SHalfedge_handle;
typedef Nef_polyhedron::SHalfedge_const_handle SHalfedge_const_handle;
typedef Nef_polyhedron::SHalfloop_const_handle SHalfloop_const_handle;
typedef Nef_polyhedron::SHalfedge_around_facet_const_circulator SHalfedge_around_facet_const_circulator;
typedef Nef_polyhedron::SHalfedge_around_sface_const_circulator SHalfedge_around_sface_const_circulator;
typedef Nef_polyhedron::SFace_const_handle SFace_const_handle;
typedef Nef_polyhedron::SFace_cycle_const_iterator SFace_cycle_const_iterator;
typedef Nef_polyhedron::SVertex_const_handle SVertex_const_handle;
typedef Nef_polyhedron::Volume_const_iterator Volume_const_iterator;
typedef Nef_polyhedron::Shell_entry_const_iterator Shell_entry_const_iterator;

class Facet_explorer {
public:
  Facet_explorer(emscripten::val& emit_halffacet, emscripten::val& emit_loop, emscripten::val& emit_shalfedge, emscripten::val& emit_svertex)
    : _emit_halffacet(emit_halffacet), _emit_loop(emit_loop),_emit_shalfedge(emit_shalfedge), _emit_svertex(emit_svertex) {}

  void Explore(Halffacet_const_handle h) {
    Halffacet_const_handle f = h->twin();

    const Plane& p = f->plane();

    _emit_halffacet(
        halffacet_id(f),
        CGAL::to_double(p.a()), 
        CGAL::to_double(p.b()), 
        CGAL::to_double(p.c()), 
        CGAL::to_double(p.d()));

    Halffacet_cycle_const_iterator fci;
    for (fci = f->facet_cycles_begin(); fci != f->facet_cycles_end(); ++fci) {
      if (fci.is_shalfedge()) {
        SHalfedge_const_handle loop = SHalfedge_const_handle(fci);
        _emit_loop(shalfedge_id(loop), sface_id(loop->incident_sface()));
        SHalfedge_around_facet_const_circulator sfc(fci);
        SHalfedge_around_facet_const_circulator send(sfc);
        CGAL_For_all(sfc, send) {
          SHalfedge_around_facet_const_circulator sfc_next = sfc;
          ++sfc_next;
          const Halfedge_const_handle& e = sfc->source();
          const Halfedge_const_handle& next = sfc_next->source();
          _emit_shalfedge(halfedge_id(e), vertex_id(e->source()), halfedge_id(next), halfedge_id(sfc->twin()->source()));
        }
      }
    }
  }

 private:
   std::size_t svertex_id(SVertex_const_handle h) {
     if (_svertex_ids.is_defined(h)) {
       return _svertex_ids[h];
     }
     size_t index = _svertex_count++;
     _svertex_ids[h] = index;
     const auto& p = h->point();
     _emit_svertex(index, CGAL::to_double(p.x()), CGAL::to_double(p.y()), CGAL::to_double(p.z()));
     return index;
   }

   std::size_t vertex_id(Vertex_const_handle h) {
     if (_vertex_ids.is_defined(h)) {
       return _vertex_ids[h];
     }
     std::size_t index = _vertex_count++;
     _vertex_ids[h] = index;
     const auto& p = h->point();
     _emit_svertex(index, CGAL::to_double(p.x()), CGAL::to_double(p.y()), CGAL::to_double(p.z()));
     return index;
   }

   std::size_t shalfedge_id(SHalfedge_const_handle h) {
     if (_shalfedge_ids.is_defined(h)) {
       return _shalfedge_ids[h];
     }
     std::size_t index = _shalfedge_count++;
     _shalfedge_ids[h] = index;
     return index;
   }

   std::size_t halfedge_id(Halfedge_const_handle h) {
     if (_halfedge_ids.is_defined(h)) {
       return _halfedge_ids[h];
     }
     std::size_t index = _halfedge_count++;
     _halfedge_ids[h] = index;
     return index;
   }

   std::size_t halffacet_id(Halffacet_const_handle h) {
     if (_halffacet_ids.is_defined(h)) {
       return _halffacet_ids[h];
     }
     std::size_t index = _halffacet_count++;
     _halffacet_ids[h] = index;
     return index;
   }

   std::size_t sface_id(SFace_const_handle h) {
     if (_sface_ids.is_defined(h)) {
       return _sface_ids[h];
     }
     std::size_t index = _sface_count++;
     _sface_ids[h] = index;
     return index;
   }

  emscripten::val& _emit_halffacet;
  emscripten::val& _emit_loop;
  emscripten::val& _emit_shalfedge;
  emscripten::val& _emit_svertex;

  std::size_t _svertex_count = 0;
  CGAL::Unique_hash_map<SVertex_const_handle, size_t> _svertex_ids;

  std::size_t _vertex_count = 0;
  CGAL::Unique_hash_map<Vertex_const_handle, size_t> _vertex_ids;

  std::size_t _shalfedge_count = 0;
  CGAL::Unique_hash_map<SHalfedge_const_handle, size_t> _shalfedge_ids;

  std::size_t _halfedge_count = 0;
  CGAL::Unique_hash_map<Halfedge_const_handle, size_t> _halfedge_ids;

  std::size_t _halffacet_count = 0;
  CGAL::Unique_hash_map<Halffacet_const_handle, size_t> _halffacet_ids;

  std::size_t _sface_count = 0;
  CGAL::Unique_hash_map<SFace_const_handle, size_t> _sface_ids;
};

class Shell_explorer {
public:
  Shell_explorer(emscripten::val& emit_halffacet, emscripten::val& emit_loop, emscripten::val& emit_shalfedge, emscripten::val& emit_svertex)
    // : _emit_halffacet(emit_halffacet), _emit_loop(emit_loop),_emit_shalfedge(emit_shalfedge), _emit_svertex(emit_svertex) {}
    : _facet_explorer(emit_halffacet, emit_loop, emit_shalfedge, emit_svertex) {}

  void visit(SHalfloop_const_handle) {}
  void visit(Vertex_const_handle) {}
  void visit(SHalfedge_const_handle) {}
  void visit(Halfedge_const_handle) {}
  void visit(SFace_const_handle sf) {}

  void visit(Halffacet_const_handle h) {
    _facet_explorer.Explore(h);
  }

  Facet_explorer _facet_explorer;
};

void Nef_polyhedron__explore_shells(const Nef_polyhedron* nef, emscripten::val emit_volume, emscripten::val emit_shell, emscripten::val emit_facet, emscripten::val emit_loop, emscripten::val emit_shalfedge, emscripten::val emit_svertex) {
  Volume_const_iterator vol_it = nef->volumes_begin();
  Volume_const_iterator vol_end = nef->volumes_end();
  Shell_explorer shell_explorer(emit_facet, emit_loop, emit_shalfedge, emit_svertex);
  ++vol_it; // Skip the unbounded volume.
  int volume_id = 0;
  while (vol_it != vol_end) {
    emit_volume(volume_id++);
    auto shell_it = vol_it->shells_begin();
    auto shell_end = vol_it->shells_end();
    while (shell_it != shell_end) {
      emit_shell();
      nef->visit_shell_objects(SFace_const_handle(shell_it), shell_explorer);
      ++shell_it;
    }
    ++vol_it;
  }
  // Terminate the final loop.
  emit_loop((std::size_t)-1, (std::size_t)-1);
}

void Nef_polyhedron__explore_facets(const Nef_polyhedron* nef, emscripten::val emit_facet, emscripten::val emit_loop, emscripten::val emit_shalfedge, emscripten::val emit_svertex) {
  Facet_explorer explorer(emit_facet, emit_loop, emit_shalfedge, emit_svertex);
  Halffacet_const_handle facet;
  CGAL_forall_halffacets(facet, *nef) {
    explorer.Explore(facet);
  }
  // Terminate the final loop.
  emit_loop((std::size_t)-1, (std::size_t)-1);
}

class Surface_mesh_explorer {
 public:
  Surface_mesh_explorer(emscripten::val& emit_face, emscripten::val& emit_point, emscripten::val& emit_edge)
    : _emit_face(emit_face),_emit_point(emit_point), _emit_edge(emit_edge) {}

  void Explore(const Surface_mesh& mesh) {
    for (const auto& face : mesh.faces()) {
      _emit_face((std::size_t)face);
      const auto& start = mesh.halfedge(face);
      Halfedge_index halfedge = start;
      do {
        const auto& target = mesh.target(halfedge);
        const auto& p = mesh.point(target);
        _emit_point((std::size_t)target, CGAL::to_double(p.x()), CGAL::to_double(p.y()), CGAL::to_double(p.z()));
        const auto& next = mesh.next(halfedge);
        const auto& opposite = mesh.opposite(halfedge);
        _emit_edge((std::size_t)target,
                   (std::size_t)halfedge, 
                   (std::size_t)next,
                   (std::size_t)opposite);
        halfedge = next;
      } while (halfedge != start);
    }
  }

 private:

  emscripten::val& _emit_face;
  emscripten::val& _emit_point;
  emscripten::val& _emit_edge;
};

void Surface_mesh__explore(const Surface_mesh* mesh, emscripten::val emit_face, emscripten::val emit_point, emscripten::val emit_edge) {
  Surface_mesh_explorer explorer(emit_face, emit_point, emit_edge);
  explorer.Explore(*mesh);
  // Indicate that the previous face has finished.
  // The number doesn't matter, but let's make it distinctive.
  emit_face((std::size_t)-1);
}

using emscripten::select_const;
using emscripten::select_overload;

EMSCRIPTEN_BINDINGS(module) {
  emscripten::class_<Kernel::FT>("FT").constructor<>();

  emscripten::function("addTriple", &addTriple, emscripten::allow_raw_pointers());

  emscripten::class_<Triples>("Triples")
    .constructor<>()
    .function("push_back", select_overload<void(const Triple&)>(&Triples::push_back))
    .function("size", select_overload<size_t()const>(&Triples::size));

  emscripten::class_<Points>("Points")
    .constructor<>()
    .function("push_back", select_overload<void(const Point&)>(&Points::push_back))
    .function("size", select_overload<size_t()const>(&Points::size));

  emscripten::class_<Polygon>("Polygon")
    .constructor<>()
    .function("size", select_overload<size_t()const>(&Polygon::size));

  emscripten::function("Polygon__push_back", &Polygon__push_back, emscripten::allow_raw_pointers());

  emscripten::class_<Polygons>("Polygons")
    .constructor<>()
    .function("push_back", select_overload<void(const Polygon&)>(&Polygons::push_back))
    .function("size", select_overload<size_t()const>(&Polygons::size));

  emscripten::class_<Nef_polyhedron>("Nef_polyhedron")
    .constructor<>()
    .function("number_of_vertices", &Nef_polyhedron::number_of_vertices)
    .function("number_of_halfedges", &Nef_polyhedron::number_of_halfedges)
    .function("number_of_edges", &Nef_polyhedron::number_of_edges)
    .function("number_of_halffacets", &Nef_polyhedron::number_of_halffacets)
    .function("number_of_facets", &Nef_polyhedron::number_of_facets)
    .function("number_of_volumes", select_overload<size_t()const>(&Nef_polyhedron::number_of_volumes))
    .function("is_valid", &Nef_polyhedron::is_valid)
    .function("is_empty", &Nef_polyhedron::is_empty);

  emscripten::class_<Face_index>("Face_index").constructor<std::size_t>();
  emscripten::class_<Halfedge_index>("Halfedge_index").constructor<std::size_t>();
  emscripten::class_<Vertex_index>("Vertex_index").constructor<std::size_t>();

  emscripten::class_<Surface_mesh>("Surface_mesh")
    .constructor<>()
    .function("add_vertex_1", (Vertex_index (Surface_mesh::*)(const Point&))&Surface_mesh::add_vertex)
    .function("add_edge_2", (Halfedge_index (Surface_mesh::*)(Vertex_index, Vertex_index))&Surface_mesh::add_edge)
    .function("add_face_3", (Face_index (Surface_mesh::*)(Vertex_index, Vertex_index, Vertex_index))&Surface_mesh::add_face)
    .function("add_face_4", (Face_index (Surface_mesh::*)(Vertex_index, Vertex_index, Vertex_index, Vertex_index))&Surface_mesh::add_face)
    .function("is_valid", select_overload<bool(bool)const>(&Surface_mesh::is_valid))
    .function("is_empty", &Surface_mesh::is_empty)
    .function("number_of_vertices", &Surface_mesh::number_of_vertices)
    .function("number_of_halfedges", &Surface_mesh::number_of_halfedges)
    .function("number_of_edges", &Surface_mesh::number_of_edges)
    .function("number_of_faces", &Surface_mesh::number_of_faces)
    .function("has_garbage", &Surface_mesh::has_garbage);

  emscripten::function("Surface_mesh__EachFace", &Surface_mesh__EachFace, emscripten::allow_raw_pointers());
  emscripten::function("ExtrusionOfSurfaceMesh", &ExtrusionOfSurfaceMesh, emscripten::allow_raw_pointers());

  emscripten::function("Surface_mesh__halfedge_to_target", &Surface_mesh__halfedge_to_target, emscripten::allow_raw_pointers());
  emscripten::function("Surface_mesh__halfedge_to_face", &Surface_mesh__halfedge_to_face, emscripten::allow_raw_pointers());
  emscripten::function("Surface_mesh__halfedge_to_next_halfedge", &Surface_mesh__halfedge_to_next_halfedge, emscripten::allow_raw_pointers());
  emscripten::function("Surface_mesh__halfedge_to_prev_halfedge", &Surface_mesh__halfedge_to_prev_halfedge, emscripten::allow_raw_pointers());
  emscripten::function("Surface_mesh__halfedge_to_opposite_halfedge", &Surface_mesh__halfedge_to_opposite_halfedge, emscripten::allow_raw_pointers());
  emscripten::function("Surface_mesh__vertex_to_halfedge", &Surface_mesh__vertex_to_halfedge, emscripten::allow_raw_pointers());
  emscripten::function("Surface_mesh__face_to_halfedge", &Surface_mesh__face_to_halfedge, emscripten::allow_raw_pointers());
  emscripten::function("Surface_mesh__vertex_to_point", &Surface_mesh__vertex_to_point, emscripten::allow_raw_pointers());
  emscripten::function("Surface_mesh__collect_garbage", &Surface_mesh__collect_garbage, emscripten::allow_raw_pointers());

  emscripten::function("Surface_mesh__add_vertex", &Surface_mesh__add_vertex, emscripten::allow_raw_pointers());
  emscripten::function("Surface_mesh__add_face", &Surface_mesh__add_face, emscripten::allow_raw_pointers());
  emscripten::function("Surface_mesh__add_face_vertices", &Surface_mesh__add_face_vertices, emscripten::allow_raw_pointers());
  emscripten::function("Surface_mesh__add_edge", &Surface_mesh__add_edge, emscripten::allow_raw_pointers());
  emscripten::function("Surface_mesh__set_edge_target", &Surface_mesh__set_edge_target, emscripten::allow_raw_pointers());
  emscripten::function("Surface_mesh__set_edge_next", &Surface_mesh__set_edge_next, emscripten::allow_raw_pointers());
  emscripten::function("Surface_mesh__set_edge_face", &Surface_mesh__set_edge_face, emscripten::allow_raw_pointers());
  emscripten::function("Surface_mesh__set_face_edge", &Surface_mesh__set_face_edge, emscripten::allow_raw_pointers());
  emscripten::function("Surface_mesh__set_vertex_edge", &Surface_mesh__set_vertex_edge, emscripten::allow_raw_pointers());
  emscripten::function("Surface_mesh__set_vertex_halfedge_to_border_halfedge", &Surface_mesh__set_vertex_halfedge_to_border_halfedge, emscripten::allow_raw_pointers());

  emscripten::class_<Polyhedron>("Polyhedron")
    .function("is_closed", &Polyhedron::is_closed)
    .function("is_valid", &Polyhedron::is_valid);

  emscripten::class_<Point>("Point")
    .constructor<float, float, float>()
    .function("hx", &Point::hx)
    .function("hy", &Point::hy)
    .function("hz", &Point::hz)
    .function("hw", &Point::hw)
    .function("x", &Point::x)
    .function("y", &Point::y)
    .function("z", &Point::z);

  emscripten::function("FromPolygonSoupToSurfaceMesh", &FromPolygonSoupToSurfaceMesh, emscripten::allow_raw_pointers());
  emscripten::function("FromPolygonSoupToNefPolyhedron", &FromPolygonSoupToNefPolyhedron, emscripten::allow_raw_pointers());
  emscripten::function("FromSurfaceMeshToNefPolyhedron", &FromSurfaceMeshToNefPolyhedron, emscripten::allow_raw_pointers());
  emscripten::function("FromNefPolyhedronToPolygons", &FromNefPolyhedronToPolygons, emscripten::allow_raw_pointers());
  emscripten::function("FromNefPolyhedronToSurfaceMesh", &FromNefPolyhedronToSurfaceMesh, emscripten::allow_raw_pointers());

  emscripten::function("DifferenceOfNefPolyhedrons", &DifferenceOfNefPolyhedrons, emscripten::allow_raw_pointers());
  emscripten::function("IntersectionOfNefPolyhedrons", &IntersectionOfNefPolyhedrons, emscripten::allow_raw_pointers());
  emscripten::function("UnionOfNefPolyhedrons", &UnionOfNefPolyhedrons, emscripten::allow_raw_pointers());
  emscripten::function("SectionOfNefPolyhedron", &SectionOfNefPolyhedron, emscripten::allow_raw_pointers());

#ifdef SURFACE_MESH_BOOLEANS
  emscripten::function("DifferenceOfSurfaceMeshes", &DifferenceOfSurfaceMeshes, emscripten::allow_raw_pointers());
  emscripten::function("IntersectionOfSurfaceMeshes", &IntersectionOfSurfaceMeshes, emscripten::allow_raw_pointers());
  emscripten::function("UnionOfSurfaceMeshes", &UnionOfSurfaceMeshes, emscripten::allow_raw_pointers());
#endif

  emscripten::function("FT__to_double", &FT__to_double, emscripten::allow_raw_pointers());

  emscripten::function("Nef_polyhedron__explore_shells", &Nef_polyhedron__explore_shells, emscripten::allow_raw_pointers());
  emscripten::function("Nef_polyhedron__explore_facets", &Nef_polyhedron__explore_facets, emscripten::allow_raw_pointers());
  emscripten::function("Surface_mesh__explore", &Surface_mesh__explore, emscripten::allow_raw_pointers());

  emscripten::function("FromPointsToSurfaceMesh", &FromPointsToSurfaceMesh, emscripten::allow_raw_pointers());
  emscripten::function("SmoothSurfaceMesh", &SmoothSurfaceMesh, emscripten::allow_raw_pointers());
  emscripten::function("FromSurfaceMeshToPolygonSoup", &FromSurfaceMeshToPolygonSoup, emscripten::allow_raw_pointers());
}
