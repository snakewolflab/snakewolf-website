

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

// This data will be seeded into Firestore.
export const newsArticlesData: Omit<NewsArticle, 'id'>[] = [
  {
    slug: 'new-product-launch-2024',
    title: '革新的な新製品「Project G」を発表',
    date: '2024/07/15',
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
    slug: 'partnership-with-tech-giant',
    title: '大手テクノロジー企業との戦略的提携を発表',
    date: '2024/06/28',
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
    slug: 'annual-tech-conference-2024',
    title: '年次技術カンファレンス「Innovate 2024」開催',
    date: '2024/05/20',
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

export const workItemsData: Omit<WorkItem, 'id'>[] = [
  {
    slug: 'cosmic-explorer',
    title: "Cosmic Explorer",
    category: "Game",
    description: "広大な宇宙を探索するオープンワールドRPG。未知の惑星を発見し、独自のストーリーを紡ぎます。",
    longDescription: "<p>Cosmic Explorerは、プレイヤーが宇宙船のキャプテンとなり、銀河系を自由に旅する壮大なオープンワールドRPGです。</p><p>プロシージャル生成によって生み出される無数の星系には、それぞれ独自の環境、生態系、そして文明が存在します。資源を採掘し、他の船と交易を行い、時には危険な宇宙海賊との戦闘を繰り広げながら、あなたは自分だけの物語を紡いでいきます。メインストーリーの謎を追うもよし、未踏の惑星を探検するもよし。宇宙での生き方は、すべてあなた次第です。</p>",
    platforms: [
        { name: "PC", url: "https://store.steampowered.com" },
        { name: "Console", url: "#" }
    ],
    imageId: "work-cosmic-explorer",
    galleryImageIds: ["work-cosmic-explorer", "work-pixel-painters", "news-1"],
  },
  {
    slug: 'taskmaster-pro',
    title: "TaskMaster Pro",
    category: "App",
    description: "チームの生産性を最大化するためのプロジェクト管理ツール。直感的なUIでタスクを効率的に整理します。",
    longDescription: "<p>TaskMaster Proは、現代のチームが必要とするすべての機能を備えた、オールインワンのプロジェクト管理アプリケーションです。</p><p>カンバンボード、ガントチャート、カレンダービューなど、プロジェクトの状況に合わせて最適な表示方法を選択できます。タスクの依存関係設定、担当者の割り当て、進捗状況のリアルタイム追跡により、チーム全体の透明性を高め、ボトルネックを解消します。SlackやGoogle Driveとの連携もスムーズで、既存のワークフローを妨げることなく、シームレスな導入が可能です。</p>",
    platforms: [
        { name: "iOS", url: "https://www.apple.com/app-store/" },
        { name: "Android", url: "https://play.google.com/store" },
        { name: "Web", url: "#" }
    ],
    imageId: "work-taskmaster-pro",
    galleryImageIds: ["work-taskmaster-pro", "news-2", "news-3"],
  },
  {
    slug: 'pixel-painters',
    title: "Pixel Painters",
    category: "Game",
    description: "友達と協力して楽しむ、お絵かきパズルゲーム。創造力を発揮して、数々のお題に挑戦しよう。",
    longDescription: "<p>Pixel Paintersは、年齢を問わず誰でも楽しめる、協力型のお絵かきパズルゲームです。</p><p>最大4人のプレイヤーでチームを組み、出題されるお題をドット絵で表現します。限られた時間の中で、仲間とコミュニケーションを取りながら一枚の絵を完成させる達成感は格別です。豊富なカラーパレットとキャンバスサイズ、そしてユニークなお題の数々が、あなたの創造性を刺激します。完成したアートはコレクションして、友達に自慢することもできます。</p>",
    platforms: [
        { name: "iOS", url: "#" },
        { name: "Android", url: "https://play.google.com/store" },
        { name: "Web", url: "#" }
    ],
    imageId: "work-pixel-painters",
    galleryImageIds: ["work-pixel-painters", "work-cosmic-explorer", "creator-alpha"],
  },
];
export const workItems = workItemsData.map((item, index) => ({...item, id: `${index + 1}`}));


export const creatorItemsData: Omit<CreatorItem, 'id'>[] = [
  {
    name: "Alpha Creative",
    description: "美麗なイラストと独特の世界観でファンを魅了するイラストレーター。FANMEにて限定コンテンツを公開中。",
    imageId: "creator-alpha",
    url: "https://example.com",
    tags: ["イラスト", "キャラクターデザイン"]
  },
  {
    name: "Beta Illustrations",
    description: "ゲーム実況を中心に活動する人気ストリーマー。FANMEにて会員限定配信やブログを更新中。",
    imageId: "creator-beta",
    url: "https://fanme.link/beta-illustrations",
    tags: ["ストリーマー", "ゲーム実況"]
  },
];
