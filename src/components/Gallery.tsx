import React from 'react';
import { Clock, Download, Trash2 } from 'lucide-react';
import { MediaItem } from '../types';

interface GalleryProps {
  mediaItems: MediaItem[];
  onDelete: (id: string) => void;
  onDownload: (item: MediaItem) => void;
}

function Gallery({ mediaItems, onDelete, onDownload }: GalleryProps) {
  return (
    <div className="w-72 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-900">History</h3>
          <Clock className="h-4 w-4 text-gray-500" />
        </div>
        <div className="space-y-4">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-gray-50 rounded-lg overflow-hidden"
            >
              {item.type === 'image' ? (
                <img
                  src={item.modified}
                  alt={item.name}
                  className="w-full h-32 object-cover"
                />
              ) : (
                <video
                  src={item.modified}
                  className="w-full h-32 object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onDownload(item)}
                    className="p-1 rounded-full bg-white text-gray-900 hover:bg-gray-100"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="p-1 rounded-full bg-white text-red-600 hover:bg-gray-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs text-gray-500 truncate">{item.name}</p>
                <p className="text-xs text-gray-400">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;