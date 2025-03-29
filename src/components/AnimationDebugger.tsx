import { useVisualizationStore } from '../store/visualizationStore';
import { useState, useEffect } from 'react';

export function AnimationDebugger() {
  const { animations } = useVisualizationStore();
  const [isVisible, setIsVisible] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Add a log entry when animation state changes
    const log = `Animation state: ${animations.current || 'none'}, playing: ${animations.playing}, speed: ${animations.speed}, clips: ${animations.clips.length}`;
    setLogs(prev => [log, ...prev.slice(0, 9)]);
  }, [animations]);

  if (!isVisible) {
    return (
      <button 
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 bg-gray-800 text-white px-3 py-1 rounded-md text-xs"
      >
        Debug
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-gray-800 text-white p-3 rounded-md text-xs w-80 z-50">
      <div className="flex justify-between mb-2">
        <h3>Animation Debugger</h3>
        <button onClick={() => setIsVisible(false)}>×</button>
      </div>
      <div className="space-y-1 max-h-40 overflow-y-auto">
        {logs.map((log, i) => (
          <div key={i} className="border-t border-gray-700 pt-1">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
} 