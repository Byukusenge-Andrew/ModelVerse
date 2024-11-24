import { Image as ImageIcon } from 'lucide-react';
import { useVisualizationStore } from '../../store/visualizationStore';

export function ExportControls() {
  const { sceneTools } = useVisualizationStore();

  const exportImage = () => {
    if (!sceneTools.gl || !sceneTools.scene || !sceneTools.camera) return;
    
    sceneTools.gl.render(sceneTools.scene, sceneTools.camera);
    const link = document.createElement('a');
    link.download = 'modelverse-export.png';
    link.href = sceneTools.gl.domElement.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Export Options</h3>
        <button
          onClick={exportImage}
          className="w-full p-2 flex items-center justify-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 rounded-lg"
        >
          <ImageIcon className="w-4 h-4" />
          Save as Image
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Image Settings</h3>
        <div className="space-y-2">
          <label className="block text-sm text-gray-600">
            Background
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              <option value="transparent">Transparent</option>
              <option value="current">Current Color</option>
              <option value="white">White</option>
              <option value="black">Black</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
} 