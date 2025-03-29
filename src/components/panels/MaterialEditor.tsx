import { Droplet, Disc, Sun } from 'lucide-react';
import { useVisualizationStore } from '../../store/visualizationStore';

export function MaterialEditor() {
  const { 
    color, 
    setColor,
    materialProperties,
    setMaterialProperty
  } = useVisualizationStore();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Material Properties</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color }}></div>
              Color
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded-full cursor-pointer"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <Droplet className="w-4 h-4" />
                Metalness
              </label>
              <span className="text-xs text-gray-500">{materialProperties.metalness.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={materialProperties.metalness}
              onChange={(e) => setMaterialProperty('metalness', parseFloat(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <Disc className="w-4 h-4" />
                Roughness
              </label>
              <span className="text-xs text-gray-500">{materialProperties.roughness.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={materialProperties.roughness}
              onChange={(e) => setMaterialProperty('roughness', parseFloat(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <Sun className="w-4 h-4" />
                Clearcoat
              </label>
              <span className="text-xs text-gray-500">{materialProperties.clearcoat.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={materialProperties.clearcoat}
              onChange={(e) => setMaterialProperty('clearcoat', parseFloat(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 