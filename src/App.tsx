import { useState, useEffect } from 'react';
import { Scene } from './components/Scene';
import { Controls } from './components/Controls';
import { SidePanel } from './components/SidePanel';
import { TutorialOverlay } from './components/TutorialOverlay';
import { useTutorialStore } from './store/tutorialStore';

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { setIsActive } = useTutorialStore();

  // Add console log for debugging
  useEffect(() => {
    console.log('App component mounted');
    if (!localStorage.getItem('hasSeenTutorial')) {
      setIsActive(true);
    }
  }, [setIsActive]);

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
      <TutorialOverlay />
    </div>
  );
}

export default App;