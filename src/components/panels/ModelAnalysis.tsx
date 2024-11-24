import { Box, Layers } from 'lucide-react';
import { useVisualizationStore } from '../../store/visualizationStore';
import { Vector3, BufferGeometry, SphereGeometry, BoxGeometry, OctahedronGeometry } from 'three';

export function ModelAnalysis() {
  const { sceneTools, shape } = useVisualizationStore();

  const getModelStats = () => {
    if (!sceneTools.scene) return { vertices: 0, faces: 0, size: new Vector3() };

    // For basic shapes, return predefined values
    if (shape !== 'custom') {
      switch (shape) {
        case 'sphere':
          return {
            vertices: 32 * 32, // segments * rings
            faces: 32 * 32 * 2, // (segments * rings * 2) triangles
            size: new Vector3(1.4, 1.4, 1.4)
          };
        case 'cube':
          return {
            vertices: 8, // 8 corners
            faces: 12, // 6 faces * 2 triangles per face
            size: new Vector3(1, 1, 1)
          };
        case 'octahedron':
          return {
            vertices: 6, // 6 vertices
            faces: 8, // 8 triangular faces
            size: new Vector3(1, 1, 1)
          };
      }
    }

    // For custom models
    let totalVertices = 0;
    let totalFaces = 0;
    const size = new Vector3();
    let hasGeometry = false;

    sceneTools.scene.traverse((object: any) => {
      if (object.isMesh && object.geometry instanceof BufferGeometry) {
        hasGeometry = true;
        const position = object.geometry.attributes.position;
        
        if (position) {
          if (object.geometry instanceof SphereGeometry) {
            const params = object.geometry.parameters;
            totalVertices = (params.widthSegments + 1) * (params.heightSegments + 1);
            totalFaces = params.widthSegments * params.heightSegments * 2;
          } else if (object.geometry instanceof BoxGeometry) {
            totalVertices = 8;
            totalFaces = 12;
          } else if (object.geometry instanceof OctahedronGeometry) {
            totalVertices = 6;
            totalFaces = 8;
          } else {
            totalVertices += position.count;
            totalFaces += object.geometry.index ? 
              object.geometry.index.count / 3 : 
              position.count / 3;
          }
        }

        object.geometry.computeBoundingBox();
        const meshSize = object.geometry.boundingBox.getSize(new Vector3());
        size.x = Math.max(size.x, meshSize.x * object.scale.x);
        size.y = Math.max(size.y, meshSize.y * object.scale.y);
        size.z = Math.max(size.z, meshSize.z * object.scale.z);
      }
    });

    return {
      vertices: hasGeometry ? Math.round(totalVertices) : 0,
      faces: hasGeometry ? Math.round(totalFaces) : 0,
      size: hasGeometry ? size : new Vector3()
    };
  };

  const stats = getModelStats();

  return (
    <div className="space-y-4">
      <div className="space-y-2 text-gray-700">
        <h3 className="font-medium">Model Statistics</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Layers className="w-4 h-4" />
              <span className="text-sm">Geometry</span>
            </div>
            <div className="space-y-1">
              <div className="text-sm">
                <span className="text-gray-500">Vertices:</span>
                <span className="ml-2 font-medium">{stats.vertices.toLocaleString()}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Faces:</span>
                <span className="ml-2 font-medium">{stats.faces.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Box className="w-4 h-4" />
              <span className="text-sm">Dimensions</span>
            </div>
            <div className="space-y-1 text-sm">
              <div>
                <span className="text-gray-500">W:</span>
                <span className="ml-2 font-medium">{stats.size.x.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-500">H:</span>
                <span className="ml-2 font-medium">{stats.size.y.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-500">D:</span>
                <span className="ml-2 font-medium">{stats.size.z.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 