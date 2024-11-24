import { useState } from 'react';
import { Scene } from './components/Scene';
import { Controls } from './components/Controls';
// import { ExportMenu } from './components/ExportMenu';

function App() {
   console.log('App component rendered');
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
  console.log('App component rendered');

  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Scene />
        {/* <ExportMenu /> */}
      
      <Controls onFullscreen={toggleFullscreen} isFullscreen={isFullscreen} />
    </div>
  );
}

export default App;