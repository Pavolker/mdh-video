import React from 'react';
import { Loader } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => Promise<void>;
  onShowExperts: () => void;
  loading: boolean;
}

const AI_TAGS = [
  'Inteligência Artificial',
  'IA Generativa',
  'Machine Learning',
  'Ciência de Dados',
  'Inovação em IA',
  'IA de Borda',
  'Agentes de IA',
  'Engenharia de Prompt',
  'Implementações de IA',
  'Deep Learning'
];

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onShowExperts, loading }) => {
  const handleTagClick = async (tag: string) => {
    if (!loading) {
      await onSearch(tag);
    }
  };

  const handleExpertsClick = () => {
    onShowExperts();
  };

  return (
    <div className="sticky top-20 md:top-24 left-0 right-0 w-full bg-gray-900/80 backdrop-blur-md p-4 md:p-6 z-40">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-white text-sm md:text-base font-semibold mb-3 text-center">
          Explore tópicos em IA:
        </h3>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {/* Botão Vídeos de Especialistas */}
          <button
            onClick={handleExpertsClick}
            className="px-4 py-2 bg-cyan-600/30 hover:bg-cyan-600/50 text-white rounded-full font-semibold text-sm transition-all border-2 border-cyan-500 hover:border-cyan-400"
          >
            Vídeos de Especialistas
          </button>
          
          {/* Tags de IA */}
          {AI_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              disabled={loading}
              className="px-4 py-2 bg-primary/20 hover:bg-primary/40 text-white rounded-full font-medium text-sm transition-all border border-primary/50 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader className="w-3 h-3 animate-spin" />
                  {tag}
                </span>
              ) : (
                tag
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
