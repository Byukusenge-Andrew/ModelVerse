import { useState, useEffect } from 'react';
import { Cube, Download, Trash2 } from 'lucide-react';
import { useVisualizationStore } from '../../store/visualizationStore';

interface ModelEntry {
  id: string;
  name: string;
  thumbnail: string;
  url: string;
  addedAt: number;
}

export function ModelLibrary() {
  const [models, setModels] = useState<ModelEntry[]>([]);
  const { setCustomModel, setIsLoading } = useVisualizationStore();

  useEffect(() => {
    // Load models from localStorage
    const savedModels = localStorage.getItem('modelverse-library');
    if (savedModels) {
      try {
        setModels(JSON.parse(savedModels));
      } catch (e) {
        console.error('Failed to parse model library:', e);
      }
    }
  }, []);

  const loadModel = (model: ModelEntry) => {
    setIsLoading(true);
    setCustomModel(model.url);
    setTimeout(() => setIsLoading(false), 1000); // Give time for model to load
  };

  const deleteModel = (id: string) => {
    const updatedModels = models.filter(model => model.id !== id);
    setModels(updatedModels);
    localStorage.setItem('modelverse-library', JSON.stringify(updatedModels));
  };

  // This would be called after a successful model upload
  const addModelToLibrary = (name: string, url: string, thumbnailUrl: string) => {
    const newModel: ModelEntry = {
      id: Date.now().toString(),
      name,
      thumbnail: thumbnailUrl,
      url,
      addedAt: Date.now()
    };
    
    const updatedModels = [...models, newModel];
    setModels(updatedModels);
    localStorage.setItem('modelverse-library', JSON.stringify(updatedModels));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Model Library</h3>
        
        {models.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {models.map(model => (
              <div key={model.id} className="bg-gray-50 rounded-lg overflow-hidden">
                <div 
                  className="h-24 bg-gray-200 flex items-center justify-center cursor-pointer"
                  onClick={() => loadModel(model)}
                >
                  {model.thumbnail ? (
                    <img 
                      src={model.thumbnail} 
                      alt={model.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Cube className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="p-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium truncate" title={model.name}>
                      {model.name}
                    </div>
                    <button
                      onClick={() => deleteModel(model.id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded-md"
                      title="Remove from library"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(model.addedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">
            Your model library is empty
          </div>
        )}
        
        <div className="mt-2">
          <button
            onClick={() => {
              // This would open a modal or trigger file upload
              // For demo purposes, we'll add a sample model
              addModelToLibrary(
                "Sample Cube", 
                "https://example.com/cube.gltf", 
                ""
              );
            }}
            className="w-full p-2 flex items-center justify-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 rounded-lg"
          >
            <Download className="w-4 h-4" />
            Add Model to Library
          </button>
        </div>
      </div>
    </div>
  );
} 