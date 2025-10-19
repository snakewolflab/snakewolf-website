export type NewsArticle = {
  id: number;
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

export type WorkItem = {
  id: number;
  title: string;
  category: 'App' | 'Game';
  description: string;
  platforms: string[];
  imageId: string;
  url: string;
};

export type CreatorItem = {
  id: number;
  name: string;
  description: string;
  imageId: string;
  url: string;
  tags: string[];
};

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    slug: 'new-product-launch-2024',
    title: '革新的な新製品「Project G」を発表',
    date: '2024年7月15日',
    tags: ['新製品', 'テクノロジー'],
    summary: 'SnakeWolfは本日、次世代AIアシスタント「Project G」を発表しました。これにより、ビジネスの生産性が飛躍的に向上します。',
    content: `
      <p>SnakeWolfは、長年の研究開発の末、本日、画期的な新製品「Project G」を正式に発表いたしました。この次世代AIアシスタントは、自然言語処理と機械学習の最新技術を駆使し、これまでにないレベルの精度と効率性を実現します。</p>
      <h3 class="font-headline text-xl font-bold mt-6 mb-2">主な特徴</h3>
      <ul class="list-disc list-inside space-y-2">
        <li>高度なコンテキスト理解能力</li>
        <li>複数のタスクを同時に処理するマルチタスク機能</li>
        <li>主要なビジネスツールとのシームレスな連携</li>
        <li>エンタープライズレベルのセキュリティ</li>
      </ul>
      <p class="mt-4">「Project Gは、単なるツールではありません。ビジネスにおける真のパートナーとなることを目指して開発されました」と、CEOの山田は語ります。「これにより、従業員はより創造的で価値の高い業務に集中できるようになるでしょう」。</p>
    `,
    imageId: 'news-1',
  },
  {
    id: 2,
    slug: 'partnership-with-tech-giant',
    title: '大手テクノロジー企業との戦略的提携を発表',
    date: '2024年6月28日',
    tags: ['提携', 'ビジネス'],
    summary: 'グローバルな展開を加速するため、業界をリードするTechCorpとの戦略的パートナーシップを締結しました。',
    content: `
      <p>本日、SnakeWolfは、テクノロジー業界の巨人であるTechCorpとの戦略的提携を締結したことを発表しました。この提携により、両社の強みを組み合わせ、革新的なソリューションをグローバル市場に提供することが可能になります。</p>
      <h3 class="font-headline text-xl font-bold mt-6 mb-2">提携の目的</h3>
      <p>このパートナーシップは、SnakeWolfの持つ先進的なAI技術と、TechCorpの広範な販売網およびインフラを統合することを目的としています。共同で、クラウドベースの新しいサービスプラットフォームを開発し、エンタープライズ顧客のデジタルトランスフォーメーションを支援します。</p>
    `,
    imageId: 'news-2',
  },
  {
    id: 3,
    slug: 'annual-tech-conference-2024',
    title: '年次技術カンファレンス「Innovate 2024」開催',
    date: '2024年5月20日',
    tags: ['イベント', 'コミュニティ'],
    summary: '「Innovate 2024」が大成功のうちに閉幕。最新の研究成果や今後のロードマップが公開されました。',
    content: `
      <p>先日開催されたSnakeWolfの年次技術カンファレンス「Innovate 2024」は、世界中から多くの開発者、パートナー、顧客を迎え、大盛況のうちに幕を閉じました。</p>
      <h3 class="font-headline text-xl font-bold mt-6 mb-2">ハイライト</h3>
      <p>基調講演では、CEOの山田が登壇し、当社の未来のビジョンと、現在進行中の研究プロジェクトについて語りました。特に、量子コンピューティング分野への参入が発表された際には、会場から大きな拍手が送られました。また、各セッションでは、当社のエンジニアが最新の技術トレンドや開発の裏側について深く掘り下げました。</p>
    `,
    imageId: 'news-3',
  },
];

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

export const workItems: WorkItem[] = [
  {
    id: 1,
    title: "Cosmic Explorer",
    category: "Game",
    description: "広大な宇宙を探索するオープンワールドRPG。未知の惑星を発見し、独自のストーリーを紡ぎます。",
    platforms: ["PC", "Console"],
    imageId: "work-cosmic-explorer",
    url: "#"
  },
  {
    id: 2,
    title: "TaskMaster Pro",
    category: "App",
    description: "チームの生産性を最大化するためのプロジェクト管理ツール。直感的なUIでタスクを効率的に整理します。",
    platforms: ["iOS", "Android", "Web"],
    imageId: "work-taskmaster-pro",
    url: "#"
  },
  {
    id: 3,
    title: "Pixel Painters",
    category: "Game",
    description: "友達と協力して楽しむ、お絵かきパズルゲーム。創造力を発揮して、数々のお題に挑戦しよう。",
    platforms: ["Mobile", "Web"],
    imageId: "work-pixel-painters",
    url: "#"
  },
];

export const creatorItems: CreatorItem[] = [
  {
    id: 1,
    name: "Alpha Creative",
    description: "美麗なイラストと独特の世界観でファンを魅了するイラストレーター。キャラクターデザインやコンセプトアートを手掛ける。",
    imageId: "creator-alpha",
    url: "#",
    tags: ["イラスト", "キャラクターデザイン"]
  },
  {
    id: 2,
    name: "Beta Illustrations",
    description: "ゲーム実況を中心に活動する人気ストリーマー。視聴者との一体感あふれる配信が持ち味。",
    imageId: "creator-beta",
    url: "#",
    tags: ["ストリーマー", "ゲーム実況"]
  },
];
