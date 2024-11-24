import { Play, Pause, FastForward, RotateCcw } from 'lucide-react';
import { useVisualizationStore } from '../../store/visualizationStore';

export function AnimationControls() {
  const { animations, setCurrentAnimation, toggleAnimation, setAnimationSpeed } = useVisualizationStore();

  if (animations.clips.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic">
        No animations available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Animation</h3>
        <select
          value={animations.current || ''}
          onChange={(e) => setCurrentAnimation(e.target.value || null)}
          className="w-full rounded-md border-gray-300 shadow-sm text-sm"
        >
          <option value="">Select animation</option>
          {animations.clips.map((clip) => (
            <option key={clip} value={clip}>
              {clip}
            </option>
          ))}
        </select>
      </div>

      {animations.current && (
        <>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => toggleAnimation()}
              className="p-2 bg-indigo-100 hover:bg-indigo-200 rounded-lg text-indigo-600"
            >
              {animations.playing ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setCurrentAnimation(animations.current)}
              className="p-2 bg-indigo-100 hover:bg-indigo-200 rounded-lg text-indigo-600"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Speed</span>
              <span>{animations.speed}x</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={animations.speed}
              onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
        </>
      )}
    </div>
  );
} 