import { Image } from 'lucide-react';
import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export function ExportMenu() {
  const { gl, scene, camera } = useThree();

  const exportScene = () => {
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);
    
    const exportImage = () => {
      gl.render(scene, camera);
      link.href = gl.domElement.toDataURL('image/png');
      link.download = 'visualization.png';
      link.click();
    };

    exportImage();
    document.body.removeChild(link);
  };

  return (
    <Html position={[0, 0, 0]}>
      <button
        onClick={exportScene}
        className="p-2 hover:bg-indigo-100 rounded-full transition-colors"
        title="Export as Image"
      >
        <Image className="w-5 h-5 text-indigo-600" />
      </button>
    </Html>
  );
}