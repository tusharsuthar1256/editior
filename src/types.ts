export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  original: string;
  modified: string;
  name: string;
  timestamp: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface VideoTrim {
  start: number;
  end: number;
}

export interface ImageAdjustments {
  brightness: number;
  contrast: number;
}