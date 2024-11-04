import React, { useRef, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { MediaItem } from '../types';
import { useMediaEditor } from '../hooks/useMediaEditor';
import { ImageTools } from './tools/ImageTools';
import { VideoTools } from './tools/VideoTools';

interface WorkspaceProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedTool: string;
  mediaItems: MediaItem[];
  onUpdateMedia: (media: MediaItem) => void;
}

function Workspace({ onFileUpload, selectedTool, mediaItems, onUpdateMedia }: WorkspaceProps) {
  const activeMedia = mediaItems[0];
  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const {
    canvasRef,
    brightness,
    contrast,
    adjustImage,
    addText,
    videoTrim,
    trimVideo,
    cropImage,
    removeBackground,
  } = useMediaEditor(activeMedia);

  useEffect(() => {
    if (activeMedia?.type === 'image' && imageRef.current) {
      const img = imageRef.current;
      img.src = activeMedia.original;
    }
  }, [activeMedia]);

  const handleImageUpdate = async (newDataUrl: string) => {
    if (activeMedia) {
      const updatedMedia = {
        ...activeMedia,
        modified: newDataUrl
      };
      onUpdateMedia(updatedMedia);
    }
  };

  const handleAdjust = async (newBrightness: number, newContrast: number) => {
    const result = await adjustImage(newBrightness, newContrast);
    if (result) handleImageUpdate(result);
  };

  const handleAddText = async (text: string, position: { x: number; y: number }, style: any) => {
    const result = await addText(text, position, style);
    if (result) handleImageUpdate(result);
  };

  const handleCrop = async (crop: any) => {
    const result = await cropImage(crop);
    if (result) handleImageUpdate(result);
  };

  const handleRemoveBackground = async () => {
    const result = await removeBackground();
    if (result) handleImageUpdate(result);
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="h-full flex flex-col">
        <div className="flex-1 p-8 flex items-center justify-center">
          {!activeMedia ? (
            <div className="text-center">
              <div className="max-w-xl mx-auto">
                <div className="flex flex-col items-center">
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 w-full">
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex flex-col items-center text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={onFileUpload}
                            accept="image/*,video/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF, MP4 up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-gray-800 rounded-lg overflow-hidden">
              {activeMedia.type === 'image' ? (
                <>
                  <img
                    ref={imageRef}
                    src={activeMedia.modified}
                    alt={activeMedia.name}
                    className="max-w-full max-h-full object-contain hidden"
                  />
                  <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-full object-contain"
                  />
                </>
              ) : (
                <video
                  ref={videoRef}
                  src={activeMedia.modified}
                  controls
                  className="max-w-full max-h-full"
                />
              )}
            </div>
          )}
        </div>
        
        {activeMedia && (
          <div className="border-t border-gray-200 bg-white p-4">
            {activeMedia.type === 'image' ? (
              <ImageTools
                tool={selectedTool}
                onAdjust={handleAdjust}
                onAddText={handleAddText}
                onCrop={handleCrop}
                onRemoveBackground={handleRemoveBackground}
                brightness={brightness}
                contrast={contrast}
                imageRef={imageRef.current}
              />
            ) : (
              <VideoTools
                tool={selectedTool}
                onTrim={trimVideo}
                duration={videoRef.current?.duration || 0}
                trimValues={videoTrim}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Workspace;