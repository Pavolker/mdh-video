import { useState, useEffect } from 'react';
import { Video } from '../types';
import { fetchPlaylistVideos } from '../services/youtubeService';
import { PLAYLISTS } from '../data/playlists';

export const useFeaturedVideo = () => {
  const [featuredVideo, setFeaturedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedVideo = async () => {
      setLoading(true);

      try {
        // Pick a random playlist
        const randomPlaylist = PLAYLISTS[Math.floor(Math.random() * PLAYLISTS.length)];
        
        // Fetch some videos from that playlist
        const videos = await fetchPlaylistVideos(randomPlaylist.id, 5);
        
        if (videos.length > 0) {
          // Pick a random video from the results
          const randomVideo = videos[Math.floor(Math.random() * videos.length)];
          setFeaturedVideo(randomVideo);
        }
      } catch (error) {
        console.error('Error loading featured video:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedVideo();
  }, []);

  return { featuredVideo, loading };
};
