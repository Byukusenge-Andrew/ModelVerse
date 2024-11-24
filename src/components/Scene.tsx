import { OrbitControls, PerspectiveCamera, AdaptiveDpr, AdaptiveEvents, BakeShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Visualization } from './Visualization';
import { LoadingSpinner } from './LoadingSpinner';
import { useVisualizationStore } from '../store/visualizationStore';
import { Perf } from 'r3f-perf';

export function Scene() {
  const autoRotate = useVisualizationStore((state) => state.autoRotate);
  const rotationSpeed = useVisualizationStore((state) => state.rotationSpeed);
  const showPerformance = useVisualizationStore((state) => state.showPerformance);

  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={['#111827']} />
        <fog attach="fog" args={['#111827', 5, 20]} />
        {showPerformance && <Perf position="top-left" />}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <BakeShadows />
        <Suspense fallback={<LoadingSpinner />}>
          <PerspectiveCamera makeDefault position={[5, 5, 5]} />
          <OrbitControls 
            enableDamping 
            dampingFactor={0.05} 
            autoRotate={autoRotate}
            autoRotateSpeed={2 * rotationSpeed}
            maxDistance={20}
            minDistance={2}
          />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
         
          <gridHelper args={[30, 30, '#4338ca', '#1e1b4b']} />
          <Visualization />
        </Suspense>
      </Canvas>
    </div>
  );
}