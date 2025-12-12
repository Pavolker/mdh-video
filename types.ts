export interface Creator {
  id: string;
  name: string;
  avatar: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  creatorId: string;
  views: string;
  duration: string;
  description: string;
  tags: string[];
  url?: string; // Optional URL to actual video
}

export interface Category {
  id: string;
  title: string;
  videos: Video[];
}
