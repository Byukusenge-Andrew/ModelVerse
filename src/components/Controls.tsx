import { Box, Maximize2, Minimize2, Octagon, Pause, Play, Circle, Square, ZoomIn, ZoomOut, BarChart, Activity } from 'lucide-react';
import { useVisualizationStore } from '../store/visualizationStore';
import { ModelUpload } from './ModelUpload';

interface ControlsProps {
  onFullscreen: () => void;
  isFullscreen: boolean;
}

export function Controls({ onFullscreen, isFullscreen }: ControlsProps) {
  const { 
    shape, 
    setShape, 
    color, 
    setColor, 
    wireframe, 
    toggleWireframe,
    autoRotate,
    toggleAutoRotate,
    rotationSpeed,
    setRotationSpeed,
    modelScale,
    setModelScale,
    customModel,
    showPerformance,
    togglePerformance,
    dataMode,
    toggleDataMode
  } = useVisualizationStore();

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setShape('cube')}
          className={`p-2 hover:bg-indigo-100 rounded-full transition-colors ${shape === 'cube' ? 'bg-indigo-100' : ''}`}
          title="Cube"
        >
          <Box className="w-5 h-5 text-indigo-600" />
        </button>
        <button 
          onClick={() => setShape('sphere')}
          className={`p-2 hover:bg-indigo-100 rounded-full transition-colors ${shape === 'sphere' ? 'bg-indigo-100' : ''}`}
          title="Sphere"
        >
          <Circle className="w-5 h-5 text-indigo-600" />
        </button>
        <button 
          onClick={() => setShape('octahedron')}
          className={`p-2 hover:bg-indigo-100 rounded-full transition-colors ${shape === 'octahedron' ? 'bg-indigo-100' : ''}`}
          title="Octahedron"
        >
          <Octagon className="w-5 h-5 text-indigo-600" />
        </button>
        <ModelUpload />
        <div className="w-px h-6 bg-gray-200" />
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 rounded-full cursor-pointer"
            title="Change Color"
          />
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={rotationSpeed}
            onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
            className="w-24 accent-indigo-600"
            title="Rotation Speed"
          />
        </div>
        {customModel && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setModelScale(modelScale / 1.2)}
              className="p-2 hover:bg-indigo-100 rounded-full transition-colors"
              title="Scale Down"
            >
              <ZoomOut className="w-5 h-5 text-indigo-600" />
            </button>
            <button
              onClick={() => setModelScale(modelScale * 1.2)}
              className="p-2 hover:bg-indigo-100 rounded-full transition-colors"
              title="Scale Up"
            >
              <ZoomIn className="w-5 h-5 text-indigo-600" />
            </button>
          </div>
        )}
        <button 
          onClick={toggleWireframe}
          className={`p-2 hover:bg-indigo-100 rounded-full transition-colors ${wireframe ? 'bg-indigo-100' : ''}`}
          title="Toggle Wireframe"
        >
          <Square className="w-5 h-5 text-indigo-600" />
        </button>
        <button 
          onClick={toggleAutoRotate}
          className={`p-2 hover:bg-indigo-100 rounded-full transition-colors ${autoRotate ? 'bg-indigo-100' : ''}`}
          title="Toggle Auto-rotation"
        >
          {autoRotate ? (
            <Pause className="w-5 h-5 text-indigo-600" />
          ) : (
            <Play className="w-5 h-5 text-indigo-600" />
          )}
        </button>
        <button
          onClick={toggleDataMode}
          className={`p-2 hover:bg-indigo-100 rounded-full transition-colors ${dataMode ? 'bg-indigo-100' : ''}`}
          title="Toggle Data Visualization"
        >
          <BarChart className="w-5 h-5 text-indigo-600" />
        </button>
        <button
          onClick={togglePerformance}
          className={`p-2 hover:bg-indigo-100 rounded-full transition-colors ${showPerformance ? 'bg-indigo-100' : ''}`}
          title="Toggle Performance Monitor"
        >
          <Activity className="w-5 h-5 text-indigo-600" />
        </button>
        <div className="w-px h-6 bg-gray-200" />
        <button
          onClick={onFullscreen}
          className="p-2 hover:bg-indigo-100 rounded-full transition-colors"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5 text-indigo-600" />
          ) : (
            <Maximize2 className="w-5 h-5 text-indigo-600" />
          )}
        </button>
      </div>
    </div>
  );
}