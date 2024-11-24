import { useVisualizationStore } from '../store/visualizationStore';
import { Html, Line } from '@react-three/drei';

export function MeasurementMarkers() {
  const { measurements } = useVisualizationStore();

  return (
    <group>
      {measurements.start && (
        <group position={measurements.start}>
          <mesh>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#4338ca" />
          </mesh>
          <Html
            position={[0.1, 0.1, 0]}
            style={{
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          >
            <div className="px-2 py-1 text-xs bg-indigo-600 text-white rounded-md whitespace-nowrap">
              Point 1
            </div>
          </Html>
        </group>
      )}
      {measurements.end && (
        <group position={measurements.end}>
          <mesh>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#4338ca" />
          </mesh>
          <Html
            position={[0.1, 0.1, 0]}
            style={{
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          >
            <div className="px-2 py-1 text-xs bg-indigo-600 text-white rounded-md whitespace-nowrap">
              Point 2
            </div>
          </Html>
        </group>
      )}
      {measurements.start && measurements.end && (
        <Line
          points={[measurements.start, measurements.end]}
          color="#4338ca"
          lineWidth={2}
        />
      )}
    </group>
  );
} 