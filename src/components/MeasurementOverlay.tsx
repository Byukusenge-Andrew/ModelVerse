import { useCallback, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useVisualizationStore } from '../store/visualizationStore';
import { Raycaster, Vector2 } from 'three';

export function MeasurementOverlay() {
  const { camera, scene, gl } = useThree();
  const { measureMode, setMeasurementPoint, measurements } = useVisualizationStore();

  const handleClick = useCallback((event: MouseEvent) => {
    if (measureMode !== 'distance') return;

    const rect = gl.domElement.getBoundingClientRect();
    const mouse = new Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const point = intersects[0].point.toArray() as [number, number, number];
      if (!measurements.start) {
        setMeasurementPoint(point, 'start');
      } else if (!measurements.end) {
        setMeasurementPoint(point, 'end');
      }
    }
  }, [camera, scene, gl, measureMode, measurements.start, measurements.end, setMeasurementPoint]);

  useEffect(() => {
    if (measureMode === 'distance') {
      gl.domElement.addEventListener('click', handleClick);
      return () => gl.domElement.removeEventListener('click', handleClick);
    }
  }, [measureMode, handleClick, gl]);

  return null;
} 