import { useEffect, useState } from 'react';
import { useTutorialStore, tutorialSteps } from '../store/tutorialStore';
import { X } from 'lucide-react';

export function TutorialOverlay() {
  const { 
    isActive, 
    currentStep, 
    nextStep, 
    previousStep, 
    resetTutorial, 
    dismissTutorial 
  } = useTutorialStore();
  const [highlightPosition, setHighlightPosition] = useState<DOMRect | null>(null);

  useEffect(() => {
    const updateHighlight = () => {
      const targetElement = tutorialSteps[currentStep].target;
      if (targetElement) {
        const element = document.querySelector(targetElement);
        if (element) {
          const rect = element.getBoundingClientRect();
          setHighlightPosition(rect);
          element.classList.add('tutorial-highlight');
        }
      }
    };

    updateHighlight();
    window.addEventListener('resize', updateHighlight);

    return () => {
      const targetElement = tutorialSteps[currentStep].target;
      if (targetElement) {
        const element = document.querySelector(targetElement);
        if (element) {
          element.classList.remove('tutorial-highlight');
        }
      }
      window.removeEventListener('resize', updateHighlight);
    };
  }, [currentStep]);

  if (!isActive) return null;

  const currentTutorialStep = tutorialSteps[currentStep];
  const isLastStep = currentStep === tutorialSteps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Semi-transparent overlay with cutout */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Highlight area */}
      {highlightPosition && (
        <div
          className="absolute pointer-events-none"
          style={{
            top: highlightPosition.top - 4,
            left: highlightPosition.left - 4,
            width: highlightPosition.width + 8,
            height: highlightPosition.height + 8,
            border: '2px solid #4338ca',
            borderRadius: '8px',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
            zIndex: 101
          }}
        >
          <div className="absolute inset-0 bg-indigo-500/10 rounded-lg" />
        </div>
      )}

      {/* Tutorial dialog - always centered */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
        style={{ zIndex: 102 }}
      >
        <button
          onClick={dismissTutorial}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          title="Skip Tutorial"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {currentTutorialStep.title}
        </h2>
        <p className="text-gray-600 mb-6">
          {currentTutorialStep.description}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <button
              onClick={previousStep}
              disabled={isFirstStep}
              className={`px-4 py-2 rounded-lg mr-2 ${
                isFirstStep 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Back
            </button>
            <button
              onClick={isLastStep ? resetTutorial : nextStep}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {isLastStep ? 'Finish' : 'Next'}
            </button>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500 mb-1">
              {currentStep + 1} / {tutorialSteps.length}
            </span>
            <button
              onClick={dismissTutorial}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Skip tutorial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 