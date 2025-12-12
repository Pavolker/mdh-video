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
        
        // Search videos for each influencer (1 video per influencer to save quota)
        const influencerPromises = influencerNames.map(async (name) => {
          const videos = await searchYoutubeVideos(name, 1); // Get 1 video per influencer
          return videos;
        });

        const allInfluencerVideos = await Promise.all(influencerPromises);
        
        // Flatten all videos into a single array
        const allVideos = allInfluencerVideos.flat();
        
        // Get 1 video from each influencer (10 total)
        const finalVideos = allVideos
          .filter(video => video) // Remove any null/undefined
          .sort(() => Math.random() - 0.5); // Shuffle for variety
        
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
