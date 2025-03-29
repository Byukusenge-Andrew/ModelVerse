import { create } from 'zustand';

type ShapeType = 'cube' | 'sphere' | 'octahedron' | 'custom';
type MaterialPropertyKey = 'metalness' | 'roughness' | 'clearcoat' | 'reflectivity';

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
  measureMode: 'distance' | 'size' | null;
  measurements: {
    start: [number, number, number] | null;
    end: [number, number, number] | null;
  };
  cameraPosition: [number, number, number];
  sceneTools: {
    gl: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.Camera | null;
  };
  lightIntensity: number;
  showGrid: boolean;
  animations: {
    clips: string[];
    current: string | null;
    playing: boolean;
    speed: number;
  };
  materialProperties: {
    metalness: number;
    roughness: number;
    clearcoat: number;
    reflectivity: number;
  };
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
  setMeasureMode: (mode: 'distance' | 'size' | null) => void;
  setMeasurementPoint: (point: [number, number, number] | null, type: 'start' | 'end') => void;
  setCameraPosition: (position: [number, number, number]) => void;
  setSceneTools: (tools: { gl: THREE.WebGLRenderer; scene: THREE.Scene; camera: THREE.Camera }) => void;
  setLightIntensity: (intensity: number) => void;
  toggleGrid: () => void;
  setAnimations: (clips: string[]) => void;
  setCurrentAnimation: (name: string | null) => void;
  toggleAnimation: () => void;
  setAnimationSpeed: (speed: number) => void;
  setMaterialProperty: (property: MaterialPropertyKey, value: number) => void;
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
  measureMode: null,
  measurements: {
    start: null,
    end: null
  },
  cameraPosition: [5, 5, 5],
  sceneTools: {
    gl: null,
    scene: null,
    camera: null
  },
  lightIntensity: 1,
  showGrid: true,
  animations: {
    clips: [],
    current: null,
    playing: false,
    speed: 1
  },
  materialProperties: {
    metalness: 0.6,
    roughness: 0.2,
    clearcoat: 0.5,
    reflectivity: 1
  },
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
  setMeasureMode: (mode) => set({ measureMode: mode }),
  setMeasurementPoint: (point, type) => 
    set((state) => ({
      measurements: {
        ...state.measurements,
        [type]: point
      }
    })),
  setCameraPosition: (position) => set({ cameraPosition: position }),
  setSceneTools: (tools) => set({ sceneTools: tools }),
  setLightIntensity: (intensity) => set({ lightIntensity: intensity }),
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  setAnimations: (clips) => set((state) => ({ 
    animations: { ...state.animations, clips } 
  })),
  setCurrentAnimation: (name) => set((state) => {
    if (state.animations.current !== name) {
      return { 
        animations: { 
          ...state.animations, 
          current: name,
          playing: name ? true : false
        } 
      };
    }
    return { animations: { ...state.animations, current: name } };
  }),
  toggleAnimation: () => set((state) => ({ 
    animations: { ...state.animations, playing: !state.animations.playing } 
  })),
  setAnimationSpeed: (speed) => set((state) => ({ 
    animations: { ...state.animations, speed } 
  })),
  setMaterialProperty: (property, value) => set((state) => ({
    materialProperties: {
      ...state.materialProperties,
      [property]: value
    }
  })),
}));