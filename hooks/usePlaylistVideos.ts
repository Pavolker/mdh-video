import { useState, useEffect } from 'react';
import { Video, Category } from '../types';
import { searchYoutubeVideos } from '../services/youtubeService';
import { CREATORS } from '../data/mockData';

export const usePlaylistVideos = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInfluencerVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get all influencer names from CREATORS
        const influencerNames = Object.values(CREATORS).map(creator => creator.name);
        
        // Search videos for each influencer (at least 1 video per influencer)
        const influencerPromises = influencerNames.map(async (name) => {
          const videos = await searchYoutubeVideos(name, 2); // Get 2 videos per influencer
          return videos;
        });

        const allInfluencerVideos = await Promise.all(influencerPromises);
        
        // Flatten all videos into a single array
        const allVideos = allInfluencerVideos.flat();
        
        // Ensure we have at least 1 video from each influencer
        const guaranteedVideos: Video[] = [];
        allInfluencerVideos.forEach(videos => {
          if (videos.length > 0) {
            guaranteedVideos.push(videos[0]); // Take first video from each influencer
          }
        });
        
        // Get remaining videos to reach 20 total
        const remainingSlots = 20 - guaranteedVideos.length;
        const remainingVideos = allVideos.filter(v => 
          !guaranteedVideos.find(gv => gv.id === v.id)
        );
        
        // Shuffle remaining videos and select to fill up to 20
        const shuffledRemaining = remainingVideos.sort(() => Math.random() - 0.5);
        const selectedRemaining = shuffledRemaining.slice(0, remainingSlots);
        
        // Combine guaranteed + remaining and shuffle final result
        const finalVideos = [...guaranteedVideos, ...selectedRemaining]
          .sort(() => Math.random() - 0.5)
          .slice(0, 20);
        
        // Create a single category with the selected videos
        const videoCategory: Category = {
          id: 'influencer_videos',
          title: 'Vídeos em Destaque',
          videos: finalVideos
        };
        
        setCategories([videoCategory]);
      } catch (err) {
        console.error('Error loading influencer videos:', err);
        setError('Failed to load influencer videos');
      } finally {
        setLoading(false);
      }
    };

    loadInfluencerVideos();
  }, []);

  return { categories, loading, error };
};
