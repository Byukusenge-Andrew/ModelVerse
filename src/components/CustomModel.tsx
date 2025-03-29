import { useGLTF, useAnimations } from '@react-three/drei';
import { useVisualizationStore } from '../store/visualizationStore';
import { useEffect, useRef, useState } from 'react';
import { Group, AnimationMixer,  Mesh, Object3D } from 'three';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Add this interface near the top of the file
interface MaterialWithColorAndWireframe {
  color: { set: (color: string) => void };
  wireframe: boolean;
}

export function CustomModel() {
  const { customModel, modelScale, color, wireframe } = useVisualizationStore();
  const { setAnimations } = useVisualizationStore();
  const { current, playing, speed } = useVisualizationStore((state) => state.animations);
  const groupRef = useRef<Group>(null);
  const [localMixer, setLocalMixer] = useState<AnimationMixer | null>(null);
  
  // Load the model
  const { scene, animations: modelClips } = useGLTF(customModel || '/default-model.glb');
  const { actions, mixer } = useAnimations(modelClips, groupRef);
  
  // Set available animations when model loads
  useEffect(() => {
    if (modelClips && modelClips.length > 0) {
      setAnimations(modelClips.map(clip => clip.name));
      console.log("Available animations:", modelClips.map(clip => clip.name));
      setLocalMixer(mixer);
    } else {
      console.log("No animations found in model");
      setAnimations([]);
    }
  }, [modelClips, setAnimations, mixer]);

  // Handle animation playback
  useEffect(() => {
    if (!current || !actions[current]) return;
    
    console.log(`Animation state changed: ${current}, playing: ${playing}, speed: ${speed}`);
    
    // Stop all other animations
    Object.entries(actions).forEach(([name, action]) => {
      if (name !== current && action) {
        action.stop();
      }
    });
    
    const action = actions[current];
    
    if (playing) {
      // Set up looping animation
      action.reset();
      action.setLoop(THREE.LoopRepeat, Infinity); // Make it loop infinitely
      action.clampWhenFinished = false; // Don't clamp at the end
      action.setEffectiveTimeScale(speed);
      action.setEffectiveWeight(1.0);
      action.play();
      console.log(`Started playing animation: ${current} (looping)`);
    } else {
      action.paused = true;
      console.log(`Paused animation: ${current}`);
    }
    
    return () => {
      if (action) {
        action.stop();
      }
    };
  }, [actions, current, playing, speed]);

  // Update animation in the render loop
  useFrame((_, delta) => {
    if (localMixer && playing) {
      localMixer.update(delta * speed);
    }
  });

  // Clone and prepare the scene
  const clonedScene = scene.clone();
  clonedScene.traverse((child: Object3D) => {
    if ('isMesh' in child && child.isMesh) {
      const mesh = child as Mesh;
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map(mat => {
            const clonedMat = mat.clone();
            // Check if material has color and wireframe properties
            if ('color' in clonedMat && 'wireframe' in clonedMat) {
              (clonedMat as unknown as MaterialWithColorAndWireframe).color.set(color);
              (clonedMat as unknown as MaterialWithColorAndWireframe).wireframe = wireframe;
            }
            return clonedMat;
          });
        } else {
          mesh.material = mesh.material.clone();
          (mesh.material as unknown as MaterialWithColorAndWireframe).color.set(color);
          (mesh.material as unknown as MaterialWithColorAndWireframe).wireframe = wireframe;
        }
      }
    }
  });

  if (!customModel) return null;

  return (
    <group ref={groupRef} scale={modelScale}>
      <primitive object={clonedScene} dispose={null} />
    </group>
  );
}