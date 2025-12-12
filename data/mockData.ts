import { Creator, Video, Category } from '../types';

export const CREATORS: Record<string, Creator> = {
  sancler: { id: 'sancler', name: 'Sancler Miranda', avatar: 'https://picsum.photos/seed/sancler/100/100' },
  paula: { id: 'paula', name: 'Paula Bernardes', avatar: 'https://picsum.photos/seed/paula/100/100' },
  bob: { id: 'bob', name: 'Bob Inteligência Mil Graus', avatar: 'https://picsum.photos/seed/bob/100/100' },
  sandeco: { id: 'sandeco', name: 'Sandeco Macedo', avatar: 'https://picsum.photos/seed/sandeco/100/100' },
  pedro_arg: { id: 'pedro_arg', name: 'Pedro Almeida - Argonalyst', avatar: 'https://picsum.photos/seed/pedroarg/100/100' },
  well: { id: 'well', name: 'Well Pires', avatar: 'https://picsum.photos/seed/well/100/100' },
  alan: { id: 'alan', name: 'Alan Nicolas', avatar: 'https://picsum.photos/seed/alan/100/100' },
  rodrigo: { id: 'rodrigo', name: 'Rodrigo Tadewald', avatar: 'https://picsum.photos/seed/rodrigo/100/100' },
  gustavo: { id: 'gustavo', name: 'Gustavo Minari', avatar: 'https://picsum.photos/seed/gustavo/100/100' },
  pedro_zdg: { id: 'pedro_zdg', name: 'Pedro Bastos - Comunidade ZDG', avatar: 'https://picsum.photos/seed/pedrozdg/100/100' },
};



// Extract YouTube video ID from URL
function extractYoutubeId(url: string): string | null {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}

// Playlist URLs from playlist.md
export const PLAYLIST_URLS = [
  'https://www.youtube.com/watch?v=RIFwBbbbvbI&list=PLmNPvQr9Tf-Yirm1aN3kHGnhMofrLmEy7',
  'https://www.youtube.com/watch?v=q4OSTpgf62E&list=PLd-WxGaCmGwPbtpExlD9RszBc9hfrCeb3',
  'https://www.youtube.com/watch?v=PUzulUOgsW4&list=PLPXGJ8ZRQSyecDsiPR-Y8MgmwhmzE4S-a',
  'https://www.youtube.com/watch?v=4ZGNeKKmB6s&list=PLx3W_A5U6dkII_GsqN65TeUZ-KPM2KVdz',
  'https://www.youtube.com/watch?v=AW1qmpoiZZs&list=PLf4bYenXCjJXwg4PkNSxJi1yfHbCsvpa5',
  'https://www.youtube.com/watch?v=fI7tagAxCqk&list=PLnQNmmpblzQrzmZDCdc8Qd-7oHGa9uict',
  'https://www.youtube.com/watch?v=o3gbXDjNWyI&list=PLrAXtmErZgOeCZF6Q4NBW8AdxWUBhb6w4',
  'https://www.youtube.com/watch?v=6dTyOl1fmDo&list=PLZHQObOWTQDM4HpiIzNVFtvy9BZQd8fH9',
  'https://www.youtube.com/watch?v=0YypAl8mBsY&list=PLujxSBD-JXgmB1AnewzycdtUtf5YVUyzU&pp=0gcJCbAEOCosWNin',
  'https://www.youtube.com/watch?v=3P3TcKaegbA&list=PLQVvvaa0QuDdKvPge9PXQtFzvhMRyFPhW',
  'https://www.youtube.com/watch?v=-CZaGj-aX5g&list=PLrfI66qWYbW1dvN7jBt1ZGpmqphaee6RX'
];


export const AUTHOR_KEYS = Object.keys(CREATORS);

// Generate 2 videos per playlist URL, mapped to each author
function generateVideosFromUrls(urls: string[], authorKeys: string[]): Video[] {
  return urls.map((url, idx) => {
    const videoId = extractYoutubeId(url) || '';
    const creatorId = authorKeys[idx] || 'sancler';
    const creator = CREATORS[creatorId];
    return [
      {
        id: `${creatorId}_1`,
        title: `${creator.name}: Vídeo Especial 1`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        creatorId,
        views: `${Math.floor(Math.random() * 500) + 10}K`,
        duration: `${Math.floor(Math.random() * 20) + 5}:00`,
        description: `Primeiro vídeo selecionado da playlist de ${creator.name}.`,
        tags: ['AI', 'Playlist'],
        url
      },
      {
        id: `${creatorId}_2`,
        title: `${creator.name}: Vídeo Especial 2`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        creatorId,
        views: `${Math.floor(Math.random() * 500) + 10}K`,
        duration: `${Math.floor(Math.random() * 20) + 5}:00`,
        description: `Segundo vídeo selecionado da playlist de ${creator.name}.`,
        tags: ['AI', 'Playlist'],
        url
      }
    ];
  }).flat();
}

export const FEATURED_VIDEO: Video = {
  id: 'featured_1',
  title: 'The Future of AGI: Are We There Yet?',
  thumbnail: 'https://img.youtube.com/vi/RIFwBbbbvbI/hqdefault.jpg',
  creatorId: 'sancler',
  views: '1.2M',
  duration: '45:20',
  description: 'An exclusive deep dive into Artificial General Intelligence. We explore the architectural breakthroughs, reasoning capabilities, and what it truly means for the future of humanity.',
  tags: ['Documentary', 'AGI', 'Future'],
  url: PLAYLIST_URLS[0]
};

export const CATEGORIES: Category[] = [
  {
    id: 'playlist_videos',
    title: 'Vídeos Selecionados de Playlists',
    videos: generateVideosFromUrls(PLAYLIST_URLS, AUTHOR_KEYS)
  }
];
