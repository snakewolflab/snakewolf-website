

export type NewsArticle = {
  id?: string; // Firestore ID will be string
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  content: string;
  imageId: string;
};

export type ServiceItem = {
  id: number;
  title: string;
  description: string;
  imageId: string;
  icon: string;
};

export type Platform = {
  name: string;
  url: string;
};

export type WorkItem = {
  id?: string; // Firestore ID will be string
  slug: string;
  title: string;
  category: 'App' | 'Game';
  description: string;
  longDescription: string;
  platforms: Platform[];
  imageId: string;
  galleryImageIds: string[];
};

export type CreatorItem = {
  id?: string; // Firestore ID will be string
  name: string;
  description: string;
  imageId: string;
  url: string;
  tags: string[];
};


export const serviceItems: ServiceItem[] = [
  {
    id: 1,
    title: 'アプリ・ゲーム開発',
    description: 'スマートフォン向けのアプリや、PC・コンソール向けのゲーム開発を行います。企画から開発、運用まで一貫してサポートします。',
    imageId: 'service-app-game',
    icon: 'Gamepad2',
  },
  {
    id: 2,
    title: 'クリエイター支援',
    description: 'コンテンツ制作、ファンコミュニティ運営、収益化戦略など、クリエイター活動を包括的にサポートします。',
    imageId: 'service-creator-support',
    icon: 'Sparkles',
  },
];
