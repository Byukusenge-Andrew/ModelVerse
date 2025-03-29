import { Camera, X } from 'lucide-react';
import { useThree } from '@react-three/fiber';
import { useState } from 'react';

export function Screenshot() {
  const { gl, scene, camera } = useThree();
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

  const takeScreenshot = () => {
    // Render the scene
    gl.render(scene, camera);
    
    // Get the canvas data URL
    const dataUrl = gl.domElement.toDataURL('image/png');
    
    // Set the screenshot URL
    setScreenshotUrl(dataUrl);
  };

  const downloadScreenshot = () => {
    if (!screenshotUrl) return;
    
    const link = document.createElement('a');
    link.href = screenshotUrl;
    link.download = `modelverse-${new Date().toISOString().slice(0, 10)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeScreenshot = () => {
    setScreenshotUrl(null);
  };

  return (
    <>
      <button
        onClick={takeScreenshot}
        className="p-2 hover:bg-indigo-100 rounded-full transition-colors"
        title="Take Screenshot"
      >
        <Camera className="w-5 h-5 text-indigo-600" />
      </button>

      {screenshotUrl && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Screenshot Preview</h3>
              <button 
                onClick={closeScreenshot}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img 
              src={screenshotUrl} 
              alt="Screenshot" 
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={downloadScreenshot}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 