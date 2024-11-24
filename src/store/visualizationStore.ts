import { create } from 'zustand';

type ShapeType = 'cube' | 'sphere' | 'octahedron' | 'custom';

interface VisualizationState {
  shape: ShapeType;
  color: string;
  wireframe: boolean;
  autoRotate: boolean;
  rotationSpeed: number;
  customModel: string | null;
  modelScale: number;
  showPerformance: boolean;
  dataMode: boolean;
  isLoading: boolean;
  setShape: (shape: ShapeType) => void;
  setColor: (color: string) => void;
  toggleWireframe: () => void;
  toggleAutoRotate: () => void;
  setRotationSpeed: (speed: number) => void;
  setCustomModel: (url: string | null) => void;
  setModelScale: (scale: number) => void;
  togglePerformance: () => void;
  toggleDataMode: () => void;
  setIsLoading: (loading: boolean) => void;
}

export const useVisualizationStore = create<VisualizationState>((set) => ({
  shape: 'octahedron',
  color: '#4338ca',
  wireframe: false,
  autoRotate: true,
  rotationSpeed: 1,
  customModel: null,
  modelScale: 1,
  showPerformance: false,
  dataMode: false,
  isLoading: false,
  setShape: (shape) => set({ shape }),
  setColor: (color) => set({ color }),
  toggleWireframe: () => set((state) => ({ wireframe: !state.wireframe })),
  toggleAutoRotate: () => set((state) => ({ autoRotate: !state.autoRotate })),
  setRotationSpeed: (speed) => set({ rotationSpeed: speed }),
  setCustomModel: (url) => set({ customModel: url, shape: 'custom' }),
  setModelScale: (scale) => set({ modelScale: scale }),
  togglePerformance: () => set((state) => ({ showPerformance: !state.showPerformance })),
  toggleDataMode: () => set((state) => ({ dataMode: !state.dataMode })),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));