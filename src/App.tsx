import React, { useState } from 'react';
import { Upload, Crop, ImageDown, Video, Scissors, Wand2, Layers, History, Download, Trash2, Plus } from 'lucide-react';
import Workspace from './components/Workspace';
import ToolPanel from './components/ToolPanel';
import Gallery from './components/Gallery';
import { MediaItem } from './types';

function App() {
  const [selectedTool, setSelectedTool] = useState('upload');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newItem: MediaItem = {
        id: Date.now().toString(),
        type: file.type.startsWith('video') ? 'video' : 'image',
        original: URL.createObjectURL(file),
        modified: URL.createObjectURL(file),
        name: file.name,
        timestamp: new Date().toISOString(),
      };
      setMediaItems([newItem, ...mediaItems]);
    }
  };

  const handleDelete = (id: string) => {
    setMediaItems(mediaItems.filter(item => item.id !== id));
  };

  const handleDownload = (item: MediaItem) => {
    const link = document.createElement('a');
    link.href = item.modified;
    link.download = `edited_${item.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Wand2 className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-semibold text-gray-900">MediaMaster</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        <ToolPanel selectedTool={selectedTool} onToolSelect={setSelectedTool} />
        <Workspace 
          onFileUpload={handleFileUpload}
          selectedTool={selectedTool}
          mediaItems={mediaItems}
          onUpdateMedia={(updatedItem) => {
            setMediaItems(mediaItems.map(item => 
              item.id === updatedItem.id ? updatedItem : item
            ));
          }}
        />
        <Gallery 
          mediaItems={mediaItems} 
          onDelete={handleDelete}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
}

export default App;