import { OrbitControls, PerspectiveCamera, AdaptiveDpr, AdaptiveEvents, BakeShadows } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { Visualization } from './Visualization';
import { LoadingSpinner } from './LoadingSpinner';
import { useVisualizationStore } from '../store/visualizationStore';
import { Perf } from 'r3f-perf';
import { MeasurementOverlay } from './MeasurementOverlay';
import { MeasurementMarkers } from './MeasurementMarkers';

function SceneContent() {
  const { gl, scene, camera } = useThree();
  const { setSceneTools } = useVisualizationStore();

  useEffect(() => {
    setSceneTools({ gl, scene, camera });
  }, [gl, scene, camera, setSceneTools]);

  return null;
}

export function Scene() {
  const autoRotate = useVisualizationStore((state) => state.autoRotate);
  const rotationSpeed = useVisualizationStore((state) => state.rotationSpeed);
  const showPerformance = useVisualizationStore((state) => state.showPerformance);
  const cameraPosition = useVisualizationStore((state) => state.cameraPosition);
  const lightIntensity = useVisualizationStore((state) => state.lightIntensity);
  const showGrid = useVisualizationStore((state) => state.showGrid);

  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]}>
        <SceneContent />
        <MeasurementOverlay />
        <color attach="background" args={['#111827']} />
        <fog attach="fog" args={['#111827', 5, 20]} />
        {showPerformance && <Perf position="top-left" />}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <BakeShadows />
        <Suspense fallback={<LoadingSpinner />}>
          <PerspectiveCamera makeDefault position={cameraPosition} />
          <OrbitControls 
            enableDamping 
            dampingFactor={0.05} 
            autoRotate={autoRotate}
            autoRotateSpeed={2 * rotationSpeed}
            maxDistance={20}
            minDistance={2}
          />
          <ambientLight intensity={0.5 * lightIntensity} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={lightIntensity}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, -10, -5]} intensity={0.5 * lightIntensity} />
          {showGrid && <gridHelper args={[30, 30, '#4338ca', '#1e1b4b']} />}
          <Visualization />
          <MeasurementMarkers />
        </Suspense>
      </Canvas>
    </div>
  );
}