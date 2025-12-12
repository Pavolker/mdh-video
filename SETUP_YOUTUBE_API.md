# YouTube Search Implementation Guide

## Overview

The app now includes YouTube video search functionality that allows users to search for videos by creator name, topic, or keywords. The implementation uses the YouTube Data API v3.

## Architecture

### Service Layer
- **`services/youtubeService.ts`** - Core service for YouTube API interactions
  - `searchYoutubeVideos(query)` - Search videos by any query
  - `searchVideosByTopic(topic)` - Search by topic
  - `generateVideosByCreator(creatorName)` - Search by creator name
  - Handles API calls, data transformation, and error handling

### React Hook
- **`hooks/useYoutubeSearch.ts`** - Custom React hook for search functionality
  - Manages search state (videos, loading, error)
  - Provides `search()` and `searchByTopic()` functions
  - Handles loading and error states

### UI Components
- **`components/SearchBar.tsx`** - Search input form
  - Text input for search queries
  - Search button with loading indicator
  - Integrated with the useYoutubeSearch hook

### App Integration
- **`App.tsx`** - Updated to display search results
  - Shows search results when available
  - Falls back to featured videos and categories
  - Displays error messages and loading states

## Setup Instructions

### 1. Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the YouTube Data API v3:
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create credentials (API Key):
   - Go to "Credentials" in the left menu
   - Click "Create Credentials" > "API Key"
   - Copy your API key

### 2. Configure Environment Variables

1. Open `.env.local` in the project root
2. Add your YouTube API key:
   ```
   VITE_YOUTUBE_API_KEY=your_api_key_here
   ```
3. (Optional) Add Gemini API key for future AI features:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

### 3. Start the App

```bash
npm run dev
```

The search bar will appear below the header. If the API key is not configured, the app will fall back to mock data.

## How It Works

### Search Flow
1. User enters a search query in the search bar
2. Clicking "Search" or pressing Enter calls `searchYoutubeVideos()`
3. The service makes an API call to YouTube:
   - First request: Gets video snippets (title, description, thumbnail, channel)
   - Second request: Gets video details (duration, view count)
4. Results are transformed into the app's Video format
5. Results are displayed in a VideoRow component

### Data Transformation

The YouTube API response is transformed into the app's `Video` interface:

```typescript
interface Video {
  id: string;                    // YouTube video ID
  title: string;                 // Video title
  thumbnail: string;            // Thumbnail URL
  creatorId: string;            // Channel name (lowercase)
  views: string;                // Formatted view count (e.g., "1.2M")
  duration: string;             // Duration (e.g., "45:20")
  description: string;          // Video description
  tags: string[];               // Array with search query
  url?: string;                 // YouTube URL
}
```

## Features

✅ Search videos by any query
✅ Display real YouTube video data
✅ Format large view counts (M, K)
✅ Parse video duration from ISO 8601 format
✅ Error handling and user feedback
✅ Loading state indicators
✅ Fallback to mock data when API key not configured

## API Usage Notes

- **Rate Limiting**: YouTube API has quota limits (default: 10,000 units per day)
- **Search Cost**: Each search request uses ~100 quota units
- **Details Cost**: Each details request uses ~1 quota unit
- Maximum results per search: 12 videos (configurable in `youtubeService.ts`)

## Troubleshooting

### "No videos found"
- Check your API key is correct
- Verify the YouTube Data API v3 is enabled in Google Cloud Console
- Try a different search query

### API quota exceeded
- Wait 24 hours for the quota to reset
- Or upgrade to a higher quota limit in Google Cloud Console

### Search bar not appearing
- Verify `.env.local` file exists
- Check console for any error messages
- Try hard refresh (Cmd+Shift+R on Mac)

## Future Enhancements

- Implement Gemini AI to intelligently search and recommend videos
- Add filters (date, duration, channel)
- Implement pagination for large result sets
- Add search history/suggestions
- Create playlists from search results
