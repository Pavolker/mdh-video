import React from 'react';
import { Play, Info } from 'lucide-react';
import { Video, Creator } from '../types';
import { CREATORS } from '../data/mockData';

interface HeroProps {
  video: Video;
}

export const Hero: React.FC<HeroProps> = ({ video }) => {
  const creator = CREATORS[video.creatorId];

  return (
    <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden">
      {/* Background Image with Gradient Overlays */}
      <div className="absolute inset-0">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover"
        />
        {/* Dark gradients for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* Content Container - Positioned at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 md:pb-12">
        <div className="w-full max-w-4xl px-6 md:px-12 space-y-3">
          {/* Badge and Creator */}
          <div className="flex items-center gap-2">
            <span className="bg-primary text-white text-xs font-bold px-2 py-1 uppercase tracking-wide rounded">
              Featured
            </span>
            <span className="text-gray-300 text-sm font-semibold uppercase">
              • {creator?.name || 'Unknown Creator'}
            </span>
          </div>
          
          {/* Title - Max 2 lines */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white drop-shadow-2xl line-clamp-2">
            {video.title}
          </h1>
          
          {/* Description - Max 3 lines */}
          <p className="text-sm md:text-base text-gray-200 leading-relaxed line-clamp-3 max-w-3xl">
            {video.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded font-bold hover:bg-white/90 transition-all shadow-lg">
              <Play className="fill-black w-5 h-5" />
              Play
            </button>
            <button className="flex items-center gap-2 bg-gray-700/80 text-white px-6 py-2.5 rounded font-bold hover:bg-gray-700/60 transition-all backdrop-blur-sm">
              <Info className="w-5 h-5" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
