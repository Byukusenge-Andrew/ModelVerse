import { useGLTF, useAnimations } from '@react-three/drei';
import { useVisualizationStore } from '../store/visualizationStore';
import { useEffect } from 'react';

export function CustomModel() {
  const { customModel, modelScale, color, wireframe } = useVisualizationStore();
  const { setAnimations } = useVisualizationStore();
  const { current, playing, speed } = useVisualizationStore((state) => state.animations);
  
  if (!customModel) return null;
  
  const { scene, animations: modelClips } = useGLTF(customModel);
  const { actions, mixer } = useAnimations(modelClips, scene);

  useEffect(() => {
    setAnimations(modelClips.map(clip => clip.name));
  }, [modelClips, setAnimations]);

  useEffect(() => {
    if (current && actions[current]) {
      if (playing) {
        actions[current].reset().play();
        mixer.timeScale = speed;
      } else {
        actions[current].paused = true;
      }
    }
    return () => {
      if (current && actions[current]) {
        actions[current].stop();
      }
    };
  }, [actions, current, playing, speed, mixer]);

  const clonedScene = scene.clone();
  clonedScene.traverse((child: any) => {
    if (child.isMesh) {
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