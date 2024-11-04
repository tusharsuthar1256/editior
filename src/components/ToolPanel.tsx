import React from 'react';
import { Crop, ImageDown, Video, Scissors, Wand2, Layers, Palette, Type, Sliders, Film, Music, Sticker } from 'lucide-react';

interface ToolPanelProps {
  selectedTool: string;
  onToolSelect: (tool: string) => void;
}

const tools = [
  { id: 'image', label: 'Image Tools', icon: ImageDown, items: [
    { id: 'crop', label: 'Crop', icon: Crop },
    { id: 'background', label: 'Remove Background', icon: Layers },
    { id: 'adjust', label: 'Adjustments', icon: Sliders },
    { id: 'text', label: 'Add Text', icon: Type },
  ]},
  { id: 'video', label: 'Video Tools', icon: Video, items: [
    { id: 'trim', label: 'Trim', icon: Scissors },
    { id: 'effects', label: 'Effects', icon: Wand2 },
    { id: 'audio', label: 'Audio', icon: Music },
    { id: 'transitions', label: 'Transitions', icon: Film },
  ]},
  { id: 'common', label: 'Common Tools', icon: Palette, items: [
    { id: 'filters', label: 'Filters', icon: Palette },
    { id: 'stickers', label: 'Stickers', icon: Sticker },
  ]},
];

function ToolPanel({ selectedTool, onToolSelect }: ToolPanelProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        {tools.map((section) => (
          <div key={section.id} className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <section.icon className="h-5 w-5 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-900">{section.label}</h3>
            </div>
            <div className="space-y-1">
              {section.items.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => onToolSelect(tool.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors ${
                    selectedTool === tool.id
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tool.icon className="h-4 w-4" />
                  <span>{tool.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToolPanel;