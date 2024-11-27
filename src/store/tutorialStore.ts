import { create } from 'zustand';

interface TutorialState {
  isActive: boolean;
  currentStep: number;
  hasSeenTutorial: boolean;
  setIsActive: (active: boolean) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetTutorial: () => void;
  dismissTutorial: () => void;
  setHasSeenTutorial: () => void;
}

const tutorialSteps = [
  {
    title: "Welcome to ModelVerse",
    description: "Let's take a quick tour of the features. Click 'Next' to continue.",
    target: null
  },
  {
    title: "Basic Shapes",
    description: "Start with basic shapes like cube, sphere, or octahedron using these controls.",
    target: "[title='Cube']"
  },
  {
    title: "Model Upload",
    description: "Upload your own GLTF models with textures by clicking the upload button.",
    target: "[title='Upload GLTF Folder']"
  },
  {
    title: "Camera Controls",
    description: "Use preset views or orbit around your model with mouse controls.",
    target: "[title='Camera Controls']"
  },
  {
    title: "Measurements",
    description: "Measure distances and dimensions of your 3D models.",
    target: "[title='Measurements']"
  },
  {
    title: "Analysis",
    description: "View detailed model statistics including vertex and face counts.",
    target: "[title='Model Analysis']"
  },
  {
    title: "Animation",
    description: "Control animations for GLTF models or create simple rotations.",
    target: "[title='Animation']"
  },
  {
    title: "Export",
    description: "Export your scene as an image with custom settings.",
    target: "[title='Export Options']"
    
  }
];

export const useTutorialStore = create<TutorialState>((set) => ({
  isActive: !localStorage.getItem('hasSeenTutorial'),
  currentStep: 0,
  hasSeenTutorial: !!localStorage.getItem('hasSeenTutorial'),
  setIsActive: (active) => set({ isActive: active }),
  nextStep: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, tutorialSteps.length - 1)
  })),
  previousStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 0)
  })),
  resetTutorial: () => set({ currentStep: 0, isActive: false }),
  dismissTutorial: () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    set({ isActive: false, hasSeenTutorial: true });
  },
  setHasSeenTutorial: () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    set({ hasSeenTutorial: true });
  }
}));

export { tutorialSteps }; 