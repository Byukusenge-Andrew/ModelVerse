import {  RotateCcw } from 'lucide-react';
import { useVisualizationStore } from '../../store/visualizationStore';

export function CameraControls() {
  const { setCameraPosition } = useVisualizationStore();

  const setView = (position: [number, number, number]) => {
    setCameraPosition(position);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Camera Position</h3>
        <div className="grid grid-cols-2 gap-2 text-gray-700">
          <button
            onClick={() => setView([0, 0, 5])}
            className="p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Front View
          </button>
          <button
            onClick={() => setView([5, 0, 0])}
            className="p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Side View
          </button>
          <button
            onClick={() => setView([0, 5, 0])}
            className="p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Top View
          </button>
          <button
            onClick={() => setView([5, 5, 5])}
            className="p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            <RotateCcw className="w-4 h-4 inline mr-2" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
} 