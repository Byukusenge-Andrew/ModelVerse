import { useState } from 'react';
import { Scene } from './components/Scene';
import { Controls } from './components/Controls';
import { SidePanel } from './components/SidePanel';

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Scene />
      <SidePanel />
      <Controls onFullscreen={toggleFullscreen} isFullscreen={isFullscreen} />
    </div>
  );
}

export default App;