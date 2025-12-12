import { useState, useCallback } from 'react';
import { Video } from '../types';
import { searchYoutubeVideos, searchVideosByTopic } from '../services/youtubeService';

interface UseYoutubeSearchResult {
  videos: Video[];
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  searchByTopic: (topic: string) => Promise<void>;
  clearSearch: () => void;
}

export const useYoutubeSearch = (): UseYoutubeSearchResult => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const results = await searchYoutubeVideos(query);
      setVideos(results);
      if (results.length === 0) {
        setError('No videos found for this search.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchByTopic = useCallback(async (topic: string) => {
    if (!topic.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const results = await searchVideosByTopic(topic);
      setVideos(results);
      if (results.length === 0) {
        setError(`No videos found for topic: ${topic}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = () => {
    setVideos([]);
    setError(null);
  };

  return { videos, loading, error, search, searchByTopic, clearSearch };
};
