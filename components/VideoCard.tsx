import React, { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { Video } from '../types';
import { CREATORS } from '../data/mockData';

interface VideoCardProps {
  video: Video;
  onPlay?: (video: Video) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onPlay }) => {
  const creator = CREATORS[video.creatorId];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full aspect-video cursor-pointer group transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full rounded-md overflow-hidden bg-surface">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Creator Badge (Top Left) */}
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-sm flex items-center gap-2">
            {creator && <img src={creator.avatar} alt={creator.name} className="w-4 h-4 rounded-full" />}
            <span className="text-[10px] text-white font-medium truncate max-w-[100px]">{creator?.name}</span>
        </div>

        {/* Duration Badge (Bottom Right) */}
        <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] text-white font-medium">
          {video.duration}
        </div>
      </div>

      {/* Hover Info Expansion - Simple Fade for now to avoid complex Z-index math in this demo */}
      <div className={`absolute inset-0 bg-black/80 flex flex-col justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md`}>
         <div className="flex gap-4">
             <button
                onClick={() => onPlay?.(video)}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Play video"
             >
                <Play className="fill-black w-5 h-5 ml-1" />
             </button>
             <div className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
                <Plus className="w-5 h-5 text-white" />
             </div>
             <div className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
                <ThumbsUp className="w-4 h-4 text-white" />
             </div>
         </div>
         <div className="px-4 text-center">
            <h4 className="text-white text-sm font-bold line-clamp-2">{video.title}</h4>
            <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-gray-400">
               <span className="text-green-500 font-bold">98% Match</span>
               <span className="border border-gray-600 px-1">HD</span>
               <span>{video.views} views</span>
            </div>
         </div>
      </div>
    </div>
  );
};
