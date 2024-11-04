import { useState, useRef } from 'react';
import { MediaItem, Position, VideoTrim, ImageAdjustments } from '../types';

interface TextStyle {
  fontSize: number;
  fontFamily: string;
  color: string;
}

export function useMediaEditor(initialMedia: MediaItem | null) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [text, setText] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [textStyle, setTextStyle] = useState<TextStyle>({
    fontSize: 24,
    fontFamily: 'Arial',
    color: '#ffffff'
  });
  const [videoTrim, setVideoTrim] = useState({ start: 0, end: 100 });

  const applyImageChanges = () => {
    if (!canvasRef.current || !initialMedia) return null;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const img = new Image();
    img.src = initialMedia.original;
    
    return new Promise((resolve) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Apply adjustments
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
        ctx.drawImage(img, 0, 0);
        
        // Apply text
        if (text) {
          ctx.filter = 'none';
          ctx.font = `${textStyle.fontSize}px ${textStyle.fontFamily}`;
          ctx.fillStyle = textStyle.color;
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 2;
          
          const x = (textPosition.x / 100) * canvas.width;
          const y = (textPosition.y / 100) * canvas.height;
          
          ctx.strokeText(text, x, y);
          ctx.fillText(text, x, y);
        }

        // Apply crop if needed
        if (crop.width < 100 || crop.height < 100) {
          const croppedData = ctx.getImageData(
            (crop.x / 100) * canvas.width,
            (crop.y / 100) * canvas.height,
            (crop.width / 100) * canvas.width,
            (crop.height / 100) * canvas.height
          );
          
          canvas.width = (crop.width / 100) * canvas.width;
          canvas.height = (crop.height / 100) * canvas.height;
          ctx.putImageData(croppedData, 0, 0);
        }

        resolve(canvas.toDataURL());
      };
    });
  };

  const adjustImage = async (newBrightness: number, newContrast: number) => {
    setBrightness(newBrightness);
    setContrast(newContrast);
    return applyImageChanges();
  };

  const addText = async (newText: string, position: Position, style: TextStyle) => {
    setText(newText);
    setTextPosition(position);
    setTextStyle(style);
    return applyImageChanges();
  };

  const cropImage = async (newCrop: { x: number; y: number; width: number; height: number }) => {
    setCrop(newCrop);
    return applyImageChanges();
  };

  const removeBackground = async () => {
    if (!canvasRef.current) return null;
    
    // Simplified background removal using color detection
    // In a real application, you'd want to use a more sophisticated ML model
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Simple background removal (this is just a demonstration)
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // If pixel is close to white, make it transparent
      if (r > 240 && g > 240 && b > 240) {
        data[i + 3] = 0; // Alpha channel
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  };

  const trimVideo = (start: number, end: number) => {
    setVideoTrim({ start, end });
  };

  return {
    canvasRef,
    brightness,
    contrast,
    adjustImage,
    text,
    textPosition,
    textStyle,
    addText,
    videoTrim,
    trimVideo,
    cropImage,
    removeBackground,
  };
}