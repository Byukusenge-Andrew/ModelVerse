import { useState } from 'react';
import { Camera, Image, Ruler, ChevronRight, ChevronLeft, Box, Sun, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { CameraControls } from './panels/CameraControls';
import { ExportControls } from './panels/ExportControls';
import { MeasurementTools } from './panels/MeasurementTools';
import { ModelAnalysis } from './panels/ModelAnalysis';
import { EnvironmentSettings } from './panels/EnvironmentSettings';
import { AnimationControls } from './panels/AnimationControls';

export function SidePanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [openSections, setOpenSections] = useState<string[]>(['camera']);

  const sections = [
    { id: 'camera', icon: Camera, label: 'Camera Controls', Component: CameraControls },
    { id: 'export', icon: Image, label: 'Export Options', Component: ExportControls },
    { id: 'measure', icon: Ruler, label: 'Measurements', Component: MeasurementTools },
    { id: 'analysis', icon: Box, label: 'Model Analysis', Component: ModelAnalysis },
    { id: 'environment', icon: Sun, label: 'Environment', Component: EnvironmentSettings },
    { id: 'animation', icon: Play, label: 'Animation', Component: AnimationControls }
  ] as const;

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className={`absolute top-0 right-0 h-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 ${
      isOpen ? 'w-80' : 'w-12'
    }`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-1/2 -left-3 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
      >
        {isOpen ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {isOpen ? (
        <div className="p-4 h-full overflow-y-auto">
          <div className="space-y-2">
            {sections.map(({ id, icon: Icon, label, Component }) => (
              <div key={id} className="border-b border-gray-100 last:border-0">
                <button
                  onClick={() => toggleSection(id)}
                  className="w-full p-2 flex items-center justify-between text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{label}</span>
                  </div>
                  {openSections.includes(id) ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {openSections.includes(id) && (
                  <div className="p-2">
                    <Component />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-4">
          {sections.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => {
                setIsOpen(true);
                toggleSection(id);
              }}
              className="p-2 hover:bg-indigo-100 rounded-lg transition-colors"
              title={label}
            >
              <Icon className="w-4 h-4 text-gray-600" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 