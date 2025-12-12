import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { VideoRow } from './components/VideoRow';
import { Footer } from './components/Footer';
import { SearchBar } from './components/SearchBar';
import { VideoPlayer } from './components/VideoPlayer';
import { useYoutubeSearch } from './hooks/useYoutubeSearch';
import { usePlaylistVideos } from './hooks/usePlaylistVideos';
import { CATEGORIES } from './data/mockData';
import { Video } from './types';

function App() {
  const { videos: searchResults, loading, error, search, clearSearch } = useYoutubeSearch();
  const { categories: playlistCategories, loading: playlistsLoading } = usePlaylistVideos();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  
  // Use playlist videos if available, otherwise fall back to mock data
  const displayCategories = playlistCategories.length > 0 ? playlistCategories : CATEGORIES;
  
  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Navbar />
      
      {/* Search Bar with AI Tags */}
      <div className="pt-28 md:pt-32">
        <SearchBar onSearch={search} onShowExperts={clearSearch} loading={loading} />
      </div>
      
      <main className="flex-grow">
        {/* Show search results if available */}
        {searchResults.length > 0 && (
          <div className="relative z-10 pb-12 bg-gradient-to-t from-background via-background to-transparent pt-12 px-4 md:px-12">
            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6 text-red-200">
                {error}
              </div>
            )}
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin">⏳</div>
                <p className="mt-4 text-gray-400">Loading videos...</p>
              </div>
            )}
            <VideoRow title="" videos={searchResults} onVideoClick={setSelectedVideo} />
          </div>
        )}
        
        {/* Show default categories if no search results */}
        {searchResults.length === 0 && (
          <div className="relative z-10 pb-12 px-4 md:px-12">
            {playlistsLoading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin">⏳</div>
                <p className="mt-4 text-gray-400">Carregando playlists...</p>
              </div>
            )}
            {!playlistsLoading && displayCategories.map((category) => (
              <VideoRow 
                key={category.id} 
                title={category.title} 
                videos={category.videos}
                onVideoClick={setSelectedVideo}
              />
            ))}
          </div>
        )}
      </main>

      
      {/* Video Player Modal */}
      <VideoPlayer video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      <Footer />
    </div>
  );
}

export default App;
