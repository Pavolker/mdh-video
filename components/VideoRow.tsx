import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Video } from '../types';
import { VideoCard } from './VideoCard';

interface VideoRowProps {
  title: string;
  videos: Video[];
  onVideoClick?: (video: Video) => void;
}

export const VideoRow: React.FC<VideoRowProps> = ({ title, videos, onVideoClick }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: 'left' | 'right') => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-2 py-4 md:py-8 px-4 md:px-12">
      <h2 className="text-text hover:text-white transition-colors text-lg md:text-xl font-bold cursor-pointer inline-flex items-center gap-2 mb-4">
        {title}
        <span className="text-xs text-cyan-500 opacity-0 hover:opacity-100 transition-opacity font-medium">Explore All &gt;</span>
      </h2>
      
      <div className="grid grid-cols-5 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onPlay={onVideoClick} />
        ))}
      </div>
    </div>
  );
};
