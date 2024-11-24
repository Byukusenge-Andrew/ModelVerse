import { Html } from '@react-three/drei';

export function LoadingSpinner() {
  return (
    <Html center>
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600" />
    </Html>
  );
}