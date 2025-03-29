import { Play, Pause, RotateCcw, AlertCircle } from 'lucide-react';
import { useVisualizationStore } from '../../store/visualizationStore';
import { useEffect, useState } from 'react';

export function AnimationControls() {
  const { animations, setCurrentAnimation, toggleAnimation, setAnimationSpeed } = useVisualizationStore();
  const [animationStatus, setAnimationStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Provide feedback on animation status
  useEffect(() => {
    if (!animations.current) {
      setAnimationStatus(null);
      return;
    }
    
    if (animations.playing) {
      setAnimationStatus(`Playing: ${animations.current}`);
      setError(null);
    } else {
      setAnimationStatus(`Paused: ${animations.current}`);
    }
  }, [animations.current, animations.playing]);

  const handleAnimationSelect = (animationName: string) => {
    if (!animationName) {
      setCurrentAnimation(null);
      return;
    }
    
    setError(null);
    setCurrentAnimation(animationName);
    
    // Auto-play when selecting a new animation
    if (!animations.playing) {
      setTimeout(() => toggleAnimation(), 100);
    }
  };

  const handlePlayPause = () => {
    if (!animations.current) {
      setError("Please select an animation first");
      return;
    }
    
    toggleAnimation();
  };

  const handleReset = () => {
    if (!animations.current) {
      setError("Please select an animation first");
      return;
    }
    
    // Reset by reselecting the current animation
    const current = animations.current;
    setCurrentAnimation(null);
    setTimeout(() => {
      setCurrentAnimation(current);
      if (!animations.playing) {
        toggleAnimation();
      }
    }, 100);
  };

  if (animations.clips.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic">
        No animations available in this model
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Animation</h3>
        <select
          value={animations.current || ''}
          onChange={(e) => handleAnimationSelect(e.target.value)}
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

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded-md flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <div className="flex justify-center gap-2">
        <button
          onClick={handlePlayPause}
          className="p-2 bg-indigo-100 hover:bg-indigo-200 rounded-lg text-indigo-600"
          disabled={!animations.current}
        >
          {animations.playing ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-indigo-100 hover:bg-indigo-200 rounded-lg text-indigo-600"
          disabled={!animations.current}
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {animationStatus && (
        <div className="text-sm text-indigo-600 bg-indigo-50 p-2 rounded-md text-center">
          {animationStatus}
        </div>
      )}

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
    </div>
  );
} 