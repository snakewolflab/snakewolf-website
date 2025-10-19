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
    title: 'AIコンサルティング',
    description: 'お客様のビジネス課題を解決するため、最新のAI技術を活用したコンサルティングサービスを提供します。',
    imageId: 'service-1',
    icon: 'BrainCircuit',
  },
  {
    id: 2,
    title: 'カスタムAI開発',
    description: '独自の要求に応じた、オーダーメイドのAIシステムを開発します。企画から実装、運用まで一貫してサポートします。',
    imageId: 'service-2',
    icon: 'Code',
  },
  {
    id: 3,
    title: 'データ分析プラットフォーム',
    description: 'ビッグデータを活用し、ビジネスの意思決定を支援するデータ分析プラットフォームを提供します。',
    imageId: 'service-3',
    icon: 'DatabaseZap',
  },
  {
    id: 4,
    title: 'DX支援',
    description: 'デジタルトランスフォーメーションの実現に向けた戦略立案から実行まで、包括的に支援します。',
    imageId: 'service-4',
    icon: 'IterationCw',
  },
];
