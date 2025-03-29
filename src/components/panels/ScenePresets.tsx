import { Save, FolderOpen, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useVisualizationStore } from '../../store/visualizationStore';

interface Preset {
  id: string;
  name: string;
  timestamp: number;
  state: {
    shape: string;
    color: string;
    cameraPosition: [number, number, number];
    materialProperties: any;
    lightIntensity: number;
    showGrid: boolean;
  };
}

export function ScenePresets() {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [presetName, setPresetName] = useState('');
  const store = useVisualizationStore();

  useEffect(() => {
    // Load presets from localStorage
    const savedPresets = localStorage.getItem('modelverse-presets');
    if (savedPresets) {
      try {
        setPresets(JSON.parse(savedPresets));
      } catch (e) {
        console.error('Failed to parse presets:', e);
      }
    }
  }, []);

  const savePreset = () => {
    if (!presetName.trim()) return;
    
    const newPreset: Preset = {
      id: Date.now().toString(),
      name: presetName,
      timestamp: Date.now(),
      state: {
        shape: store.shape,
        color: store.color,
        cameraPosition: store.cameraPosition,
        materialProperties: store.materialProperties,
        lightIntensity: store.lightIntensity,
        showGrid: store.showGrid
      }
    };
    
    const updatedPresets = [...presets, newPreset];
    setPresets(updatedPresets);
    localStorage.setItem('modelverse-presets', JSON.stringify(updatedPresets));
    setPresetName('');
  };

  const loadPreset = (preset: Preset) => {
    store.setShape(preset.state.shape as any);
    store.setColor(preset.state.color);
    store.setCameraPosition(preset.state.cameraPosition);
    
    // Update material properties
    Object.entries(preset.state.materialProperties).forEach(([key, value]) => {
      store.setMaterialProperty(key as any, value as number);
    });
    
    store.setLightIntensity(preset.state.lightIntensity);
    if (store.showGrid !== preset.state.showGrid) {
      store.toggleGrid();
    }
  };

  const deletePreset = (id: string) => {
    const updatedPresets = presets.filter(preset => preset.id !== id);
    setPresets(updatedPresets);
    localStorage.setItem('modelverse-presets', JSON.stringify(updatedPresets));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Scene Presets</h3>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            placeholder="Preset name"
            className="flex-1 rounded-md border-gray-300 shadow-sm text-sm"
          />
          <button
            onClick={savePreset}
            disabled={!presetName.trim()}
            className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
          </button>
        </div>
        
        {presets.length > 0 ? (
          <div className="space-y-2 mt-3">
            {presets.map(preset => (
              <div key={preset.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm">{preset.name}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(preset.timestamp).toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => loadPreset(preset)}
                    className="p-1.5 text-indigo-600 hover:bg-indigo-100 rounded-md"
                    title="Load preset"
                  >
                    <FolderOpen className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deletePreset(preset.id)}
                    className="p-1.5 text-red-600 hover:bg-red-100 rounded-md"
                    title="Delete preset"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic mt-2">
            No saved presets
          </div>
        )}
      </div>
    </div>
  );
} 