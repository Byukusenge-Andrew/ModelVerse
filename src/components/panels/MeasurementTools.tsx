import { Ruler, Maximize2 } from 'lucide-react';
import { useVisualizationStore } from '../../store/visualizationStore';
import { Vector3 } from 'three';

export function MeasurementTools() {
  const { 
    sceneTools, 
    measureMode, 
    setMeasureMode, 
    measurements,
    setMeasurementPoint 
  } = useVisualizationStore();

  const getMeshSize = () => {
    if (!sceneTools.scene) return new Vector3();

    const box = new Vector3();
    sceneTools.scene.traverse((object: any) => {
      if (object.isMesh && object.geometry) {
        object.geometry.computeBoundingBox();
        const size = object.geometry.boundingBox.getSize(new Vector3());
        box.x = Math.max(box.x, size.x);
        box.y = Math.max(box.y, size.y);
        box.z = Math.max(box.z, size.z);
      }
    });
    return box;
  };

  const getDistance = () => {
    if (!measurements.start || !measurements.end) return null;
    const start = new Vector3(...measurements.start);
    const end = new Vector3(...measurements.end);
    return start.distanceTo(end).toFixed(2);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Measurement Tools</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setMeasureMode(measureMode === 'distance' ? null : 'distance')}
            className={`p-2 flex items-center justify-center gap-2 rounded-lg ${
              measureMode === 'distance' 
                ? 'bg-indigo-100 text-indigo-600' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            <Ruler className="w-4 h-4" />
            Distance
          </button>
          <button
            onClick={() => setMeasureMode(measureMode === 'size' ? null : 'size')}
            className={`p-2 flex items-center justify-center gap-2 rounded-lg ${
              measureMode === 'size' 
                ? 'bg-indigo-100 text-indigo-600' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            <Maximize2 className="w-4 h-4" />
            Size
          </button>
        </div>
      </div>

      {measureMode === 'size' && (
        <div className="space-y-2 text-gray-700">
          <h3 className="font-medium text-gray-700">Model Dimensions</h3>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Width</span>
                <div className="font-medium">{getMeshSize().x.toFixed(2)}</div>
              </div>
              <div>
                <span className="text-gray-500">Height</span>
                <div className="font-medium">{getMeshSize().y.toFixed(2)}</div>
              </div>
              <div>
                <span className="text-gray-500">Depth</span>
                <div className="font-medium">{getMeshSize().z.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {measureMode === 'distance' && (
        <div className="space-y-2">
          <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            {!measurements.start ? (
              'Click first point to start measuring'
            ) : !measurements.end ? (
              'Click second point to complete measurement'
            ) : (
              <div className='text-gray-700'>
                <div className="font-medium">Distance:</div>
                <div className="text-lg text-indigo-600">{getDistance()} units</div>
                <button
                  onClick={() => {
                    setMeasurementPoint(null, 'start');
                    setMeasurementPoint(null, 'end');
                  }}
                  className="mt-2 text-xs text-indigo-600 hover:text-indigo-700"
                >
                  Reset Measurement
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 