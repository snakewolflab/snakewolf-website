
export type NewsArticle = {
  id: string;
  title: string;
  publicationDate: string; // ISO String
  contentSummary: string;
  content: string; // Can be HTML
  tags: string[];
  imageId?: string;
  slug: string;
};

export type Tag = {
  id: string;
  name: string;
};

export type MediaItem = {
    id: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    uploadDate: string; // ISO String
    imageHint?: string;
};

export type CreatorItem = {
  id: string;
  name: string;
  description: string;
  imageId: string;
  imageUrl?: string; // This might be populated on the client
  url: string;
  tags: string[];
};

export type WorkPlatform = {
  name: string;
  url: string;
}

export type WorkItem = {
  id: string;
  slug: string;
  title: string;
  category: 'App' | 'Game';
  description: string;
  longDescription: string; // Can be HTML
  platforms: WorkPlatform[];
  imageId: string;
  galleryImageIds: string[];
};
