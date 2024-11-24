import { Sun, Grid, Camera } from 'lucide-react';
import { useVisualizationStore } from '../../store/visualizationStore';

export function EnvironmentSettings() {
  const { 
    cameraPosition,
    setCameraPosition,
    setLightIntensity,
    lightIntensity,
    showGrid,
    toggleGrid
  } = useVisualizationStore();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Environment</h3>
        <div className="space-y-3">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Sun className="w-4 h-4" />
              <span className="text-sm">Lighting</span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={lightIntensity}
              onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <Grid className="w-4 h-4" />
                <span className="text-sm">Show Grid</span>
              </div>
              <button
                onClick={toggleGrid}
                className={`w-8 h-5 rounded-full transition-colors ${
                  showGrid ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-3 h-3 bg-white rounded-full transition-transform ${
                    showGrid ? 'translate-x-4' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Camera className="w-4 h-4" />
              <span className="text-sm">Save Camera Position</span>
            </div>
            <button
              onClick={() => {
                localStorage.setItem('savedCamera', JSON.stringify(cameraPosition));
              }}
              className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-lg hover:bg-indigo-200"
            >
              Save Current View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 