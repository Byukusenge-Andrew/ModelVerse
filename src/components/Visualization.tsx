import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import { useVisualizationStore } from '../store/visualizationStore';
import { CustomModel } from './CustomModel';

export function Visualization() {
  const meshRef = useRef<Mesh>(null);
  const { 
    shape, 
    color, 
    wireframe, 
    rotationSpeed,
    dataMode,
    materialProperties,
    animations: { playing, speed }
  } = useVisualizationStore();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    
    if (playing && shape !== 'custom') {
      // Default animation for basic shapes
      meshRef.current.rotation.y += delta * speed * 2;
      meshRef.current.rotation.x += delta * speed;
    } else {
      // Normal rotation when animation is off
      meshRef.current.rotation.x += 0.01 * rotationSpeed;
      meshRef.current.rotation.y += 0.01 * rotationSpeed;
    }
  });

  if (shape === 'custom') {
    return <CustomModel />;
  }

  const getGeometry = () => {
    if (dataMode) {
      // Data visualization mode - use bars
      return (
        <group>
          {Array.from({ length: 10 }, (_, i) => (
            <mesh
              key={i}
              position={[i - 4.5, Math.random() * 2, 0]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[0.8, Math.random() * 4 + 1, 0.8]} />
              <meshPhysicalMaterial
                color={color}
                metalness={0.6}
                roughness={0.2}
                wireframe={wireframe}
                clearcoat={0.5}
                clearcoatRoughness={0.1}
                reflectivity={1}
              />
            </mesh>
          ))}
        </group>
      );
    }

    switch (shape) {
      case 'cube':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.7, 32, 32]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      default:
        return <octahedronGeometry args={[1, 0]} />;
    }
  };

  return dataMode ? (
    getGeometry()
  ) : (
    <mesh ref={meshRef} castShadow receiveShadow>
      {getGeometry()}
      <meshPhysicalMaterial
        color={color}
        metalness={materialProperties.metalness}
        roughness={materialProperties.roughness}
        wireframe={wireframe}
        clearcoat={materialProperties.clearcoat}
        clearcoatRoughness={materialProperties.roughness * 0.5}
        reflectivity={materialProperties.reflectivity}
      />
    </mesh>
  );
}