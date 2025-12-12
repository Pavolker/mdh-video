import { Video } from '../types';

// Load API keys from environment variables
// Users need to set VITE_YOUTUBE_API_KEY and VITE_GEMINI_API_KEY in .env.local
const getYoutubeApiKey = (): string => {
  const env = import.meta.env as Record<string, string>;
  return env.VITE_YOUTUBE_API_KEY || '';
};

const getGeminiApiKey = (): string => {
  const env = import.meta.env as Record<string, string>;
  return env.VITE_GEMINI_API_KEY || '';
};

interface YouTubeSearchResponse {
  items: Array<{
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
      channelTitle: string;
    };
  }>;
}

interface YouTubeVideoDetails {
  items: Array<{
    statistics: {
      viewCount: string;
    };
    contentDetails: {
      duration: string;
    };
  }>;
}

const parseVideoDuration = (duration: string): string => {
  // Parse PT format (e.g., PT1H23M45S)
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = parseInt(match?.[1] || '0', 10);
  const minutes = parseInt(match?.[2] || '0', 10);
  const seconds = parseInt(match?.[3] || '0', 10);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

const formatViewCount = (views: string): string => {
  const count = parseInt(views, 10);
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(0)}K`;
  }
  return count.toString();
};

export const searchYoutubeVideos = async (query: string, maxResults: number = 12): Promise<Video[]> => {
  const YOUTUBE_API_KEY = getYoutubeApiKey();
  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API Key not configured. Using mock data.');
    return [];
  }

  try {
    // Search for videos
    const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    searchUrl.searchParams.set('part', 'snippet');
    searchUrl.searchParams.set('q', query);
    searchUrl.searchParams.set('type', 'video');
    searchUrl.searchParams.set('maxResults', maxResults.toString());
    searchUrl.searchParams.set('key', YOUTUBE_API_KEY);

    const searchResponse = await fetch(searchUrl.toString());
    const searchData: YouTubeSearchResponse = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return [];
    }

    const videoIds = searchData.items.map((item) => item.id.videoId).join(',');

    // Get video details (duration, view count)
    const detailsUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
    detailsUrl.searchParams.set('part', 'statistics,contentDetails');
    detailsUrl.searchParams.set('id', videoIds);
    detailsUrl.searchParams.set('key', YOUTUBE_API_KEY);

    const detailsResponse = await fetch(detailsUrl.toString());
    const detailsData: YouTubeVideoDetails = await detailsResponse.json();

    // Combine search results with details
    const videos: Video[] = searchData.items.map((item, index) => {
      const details = detailsData.items[index];
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        creatorId: item.snippet.channelTitle.toLowerCase().replace(/\s+/g, '_'),
        views: formatViewCount(details?.statistics.viewCount || '0'),
        duration: parseVideoDuration(details?.contentDetails.duration || 'PT0S'),
        description: item.snippet.description,
        tags: [query],
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      };
    });

    return videos;
  } catch (error) {
    console.error('Error searching YouTube videos:', error);
    return [];
  }
};

export const generateVideosByCreator = async (creatorName: string): Promise<Video[]> => {
  return searchYoutubeVideos(creatorName);
};

export const searchVideosByTopic = async (topic: string): Promise<Video[]> => {
  return searchYoutubeVideos(topic);
};

export const fetchPlaylistVideos = async (playlistId: string, maxResults: number = 6): Promise<Video[]> => {
  const YOUTUBE_API_KEY = getYoutubeApiKey();
  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API Key not configured.');
    return [];
  }

  try {
    // Fetch playlist items
    const playlistUrl = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    playlistUrl.searchParams.set('part', 'snippet,contentDetails');
    playlistUrl.searchParams.set('playlistId', playlistId);
    playlistUrl.searchParams.set('maxResults', maxResults.toString());
    playlistUrl.searchParams.set('key', YOUTUBE_API_KEY);

    const playlistResponse = await fetch(playlistUrl.toString());
    const playlistData = await playlistResponse.json();

    if (!playlistData.items || playlistData.items.length === 0) {
      return [];
    }

    const videoIds = playlistData.items.map((item: any) => item.contentDetails.videoId).join(',');

    // Get video details
    const detailsUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
    detailsUrl.searchParams.set('part', 'statistics,contentDetails,snippet');
    detailsUrl.searchParams.set('id', videoIds);
    detailsUrl.searchParams.set('key', YOUTUBE_API_KEY);

    const detailsResponse = await fetch(detailsUrl.toString());
    const detailsData = await detailsResponse.json();

    // Combine data
    const videos: Video[] = detailsData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      creatorId: item.snippet.channelTitle.toLowerCase().replace(/\s+/g, '_'),
      views: formatViewCount(item.statistics.viewCount || '0'),
      duration: parseVideoDuration(item.contentDetails.duration || 'PT0S'),
      description: item.snippet.description,
      tags: [],
      url: `https://www.youtube.com/watch?v=${item.id}`,
    }));

    return videos;
  } catch (error) {
    console.error(`Error fetching playlist ${playlistId}:`, error);
    return [];
  }
};
