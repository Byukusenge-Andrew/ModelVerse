import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import { useVisualizationStore } from '../store/visualizationStore';
import { CustomModel } from './CustomModel';

export function Visualization() {
  const meshRef = useRef<Mesh>(null);
  const { shape, color, wireframe, rotationSpeed } = useVisualizationStore();

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.01 * rotationSpeed;
    meshRef.current.rotation.y += 0.01 * rotationSpeed;
  });

  if (shape === 'custom') {
    return <CustomModel />;
  }

  const getGeometry = () => {
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

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      {getGeometry()}
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
  );
}