import { useGLTF } from '@react-three/drei';
import { useVisualizationStore } from '../store/visualizationStore';
import { useEffect } from 'react';

export function CustomModel() {
  const { customModel, modelScale, color, wireframe } = useVisualizationStore();
  
  if (!customModel) return null;
  
  const { scene } = useGLTF(customModel);

  useEffect(() => {
    return () => {
      if (customModel) {
        URL.revokeObjectURL(customModel);
      }
    };
  }, [customModel]);

  const clonedScene = scene.clone();
  clonedScene.traverse((child: any) => {
    if (child.iMesh) {
      child.material = child.material.clone();
      child.material.color.set(color);
      child.material.wireframe = wireframe;
    }
  });

  return (
    <primitive 
      object={clonedScene} 
      scale={modelScale} 
      dispose={null}
    />
  );
}