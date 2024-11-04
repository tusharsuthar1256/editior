import React from 'react';

interface SliderProps {
  value: number | [number, number];
  onChange: (value: number | [number, number]) => void;
  min: number;
  max: number;
  step?: number;
  range?: boolean;
}

export function Slider({ value, onChange, min, max, step = 1, range = false }: SliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (range && Array.isArray(value)) {
      // For range sliders, update the appropriate handle
      const [start, end] = value;
      const isStartHandle = Math.abs(newValue - start) < Math.abs(newValue - end);
      onChange(isStartHandle ? [newValue, end] : [start, newValue]);
    } else if (!range) {
      // For single value sliders
      onChange(newValue);
    }
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={Array.isArray(value) ? value[0] : value}
      onChange={handleChange}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
    />
  );
}