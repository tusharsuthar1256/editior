import React, { useState } from 'react';
import { Slider } from '../ui/Slider';
import { TextInput } from '../ui/TextInput';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageToolsProps {
  tool: string;
  onAdjust: (brightness: number, contrast: number) => void;
  onAddText: (text: string, position: { x: number; y: number }, style: TextStyle) => void;
  onCrop: (crop: Crop) => void;
  onRemoveBackground: () => void;
  brightness: number;
  contrast: number;
  imageRef: HTMLImageElement | null;
}

interface TextStyle {
  fontSize: number;
  fontFamily: string;
  color: string;
}

export function ImageTools({ 
  tool, 
  onAdjust, 
  onAddText, 
  onCrop,
  onRemoveBackground,
  brightness, 
  contrast,
  imageRef 
}: ImageToolsProps) {
  const [textStyle, setTextStyle] = useState<TextStyle>({
    fontSize: 24,
    fontFamily: 'Arial',
    color: '#ffffff'
  });
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 0,
    y: 0,
    width: 100,
    height: 100
  });

  const fontFamilies = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana'];

  switch (tool) {
    case 'adjust':
      return (
        <div className="space-y-4 p-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Brightness</label>
            <Slider
              value={brightness}
              onChange={(value) => onAdjust(value as number, contrast)}
              min={0}
              max={200}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contrast</label>
            <Slider
              value={contrast}
              onChange={(value) => onAdjust(brightness, value as number)}
              min={0}
              max={200}
            />
          </div>
        </div>
      );

    case 'text':
      return (
        <div className="p-4 space-y-4">
          <TextInput
            onAdd={(text) => onAddText(text, textPosition, textStyle)}
            placeholder="Enter text..."
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">Font Size</label>
            <Slider
              value={textStyle.fontSize}
              onChange={(value) => setTextStyle({ ...textStyle, fontSize: value as number })}
              min={12}
              max={72}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">X Position</label>
            <Slider
              value={textPosition.x}
              onChange={(value) => setTextPosition({ ...textPosition, x: value as number })}
              min={0}
              max={100}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Y Position</label>
            <Slider
              value={textPosition.y}
              onChange={(value) => setTextPosition({ ...textPosition, y: value as number })}
              min={0}
              max={100}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Font Family</label>
            <select
              value={textStyle.fontFamily}
              onChange={(e) => setTextStyle({ ...textStyle, fontFamily: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {fontFamilies.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Text Color</label>
            <input
              type="color"
              value={textStyle.color}
              onChange={(e) => setTextStyle({ ...textStyle, color: e.target.value })}
              className="mt-1 block w-full"
            />
          </div>
        </div>
      );

    case 'crop':
      return (
        <div className="p-4">
          {imageRef && (
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => onCrop(c)}
            >
              <img src={imageRef.src} alt="Crop preview" />
            </ReactCrop>
          )}
        </div>
      );

    case 'background':
      return (
        <div className="p-4">
          <button
            onClick={onRemoveBackground}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Remove Background
          </button>
        </div>
      );

    default:
      return null;
  }
}