import React from 'react';
import { Slider } from '../ui/Slider';

interface VideoToolsProps {
  tool: string;
  onTrim: (start: number, end: number) => void;
  duration: number;
  trimValues: { start: number; end: number };
}

export function VideoTools({ tool, onTrim, duration, trimValues }: VideoToolsProps) {
  if (tool === 'trim') {
    return (
      <div className="p-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time</label>
            <Slider
              value={trimValues.start}
              onChange={(value) => onTrim(value as number, trimValues.end)}
              min={0}
              max={duration}
              step={0.1}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Time</label>
            <Slider
              value={trimValues.end}
              onChange={(value) => onTrim(trimValues.start, value as number)}
              min={trimValues.start}
              max={duration}
              step={0.1}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{trimValues.start.toFixed(1)}s</span>
            <span>{trimValues.end.toFixed(1)}s</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}