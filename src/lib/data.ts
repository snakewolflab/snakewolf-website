export type NewsArticle = {
  id: string;
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
  id: string;
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
  id: string;
  name: string;
  description: string;
  imageId: string;
  url: string;
  tags: string[];
};


export const newsArticlesData: NewsArticle[] = [
    {
        id: '1',
        slug: 'new-service-launch',
        title: '新サービス「クリエイター支援」を開始しました',
        date: '2024/07/20',
        tags: ['新サービス', 'クリエイター支援'],
        summary: '本日より、SnakeWolfは新たに「クリエイター支援サービス」を開始します。コンテンツ制作から収益化まで、クリエイターの活動を全面的にバックアップします。',
        content: `
            <p>本日より、SnakeWolfは新たに「クリエイター支援サービス」を開始します。このサービスは、動画クリエイター、イラストレーター、ミュージシャンなど、あらゆるジャンルのクリエイターが自身の創造性を最大限に発揮できるよう、多角的なサポートを提供するものです。</p>
            <h3 class="font-headline text-xl font-bold mt-6 mb-2">主なサポート内容</h3>
            <ul class="list-disc list-inside space-y-2">
                <li><strong>コンテンツ制作支援:</strong> 企画立案、機材選定、撮影・編集技術のアドバイスなど。</li>
                <li><strong>ファンコミュニティ運営:</strong> SNS戦略の立案、イベント企画、ファンとのエンゲージメント向上施策。</li>
                <li><strong>収益化サポート:</strong> 広告収益の最適化、グッズ販売、メンバーシップ導入など、活動に合わせたマネタイズ戦略を構築します。</li>
                <li><strong>法務・税務サポート:</strong> 専門家と連携し、契約書の確認や確定申告などの複雑な手続きをサポートします。</li>
            </ul>
            <p class="mt-4">私たちは、クリエイターが創作活動に集中できる環境を整えることが、新しい文化の創造に繋がると信じています。ご興味のあるクリエイターの方は、ぜひ<a href="/contact" class="text-primary hover:underline">お問い合わせ</a>ください。</p>
        `,
        imageId: 'news-1'
    },
    {
        id: '2',
        slug: 'cosmic-explorer-update',
        title: '「Cosmic Explorer」大型アップデートのお知らせ',
        date: '2024/07/15',
        tags: ['ゲーム', 'アップデート'],
        summary: '宇宙探査ゲーム「Cosmic Explorer」に、待望のマルチプレイヤーモードを追加する大型アップデートをリリースしました。友達と一緒に、未知の銀河を冒険しよう！',
        content: `
            <p>平素より「Cosmic Explorer」をお楽しみいただき、誠にありがとうございます。本日、大型アップデートv2.0をリリースし、待望の「マルチプレイヤーモード」を実装いたしました。</p>
            <h3 class="font-headline text-xl font-bold mt-6 mb-2">v2.0アップデート内容</h3>
            <ul class="list-disc list-inside space-y-2">
                <li><strong>協力マルチプレイ:</strong> 最大4人のプレイヤーでチームを組み、同じ宇宙船に乗り込んで銀河を探査できます。役割を分担し、協力してミッションに挑みましょう。</li>
                <li><strong>新惑星「ゼノビア」:</strong> 新たな生態系と独自の資源を持つ惑星「ゼノビア」が発見されました。未知の動植物や古代文明の遺跡があなたを待っています。</li>
                <li><strong>宇宙船カスタマイズ機能の拡張:</strong> 新しい船体パーツやカラーリングが追加され、より個性的な宇宙船を建造できるようになりました。</li>
                <li><strong>その他:</strong> UIの改善、パフォーマンスの最適化、多数のバグ修正を行いました。</li>
            </ul>
            <p class="mt-4">このアップデートを記念して、すべてのプレイヤーにゲーム内通貨「1,000ギャラクシーコイン」をプレゼントします。友達を誘って、新たな宇宙の冒険に出発しましょう！</p>
        `,
        imageId: 'news-2'
    },
    {
        id: '3',
        slug: 'new-partnership',
        title: '株式会社デジタルビジョンとの業務提携について',
        date: '2024/07/10',
        tags: ['提携', 'ビジネス'],
        summary: 'AI技術を活用したデータ解析ソリューションを提供する株式会社デジタルビジョンと業務提携を締結しました。これにより、より高度なデータ駆動型サービスを提供します。',
        content: `
            <p>この度、SnakeWolfは、AI技術を活用した高度なデータ解析ソリューションを提供する株式会社デジタルビジョンと、戦略的業務提携を締結したことをお知らせいたします。</p>
            <p class="mt-4">今回の提携により、当社の持つクリエイティブな企画力と開発力に、株式会社デジタルビジョンの持つ最先端のAI分析技術が融合されます。これにより、ゲームやアプリケーションのユーザー体験をデータに基づいて最適化し、よりパーソナライズされたエンターテインメントを提供することが可能になります。</p>
            <h3 class="font-headline text-xl font-bold mt-6 mb-2">提携による主なシナジー</h3>
            <ul class="list-disc list-inside space-y-2">
                <li>ゲーム内でのプレイヤー行動分析に基づく、動的な難易度調整システムの開発。</li>
                <li>ユーザーの嗜好を予測し、最適なコンテンツを推薦するAIエンジンの導入。</li>
                <li>広告効果を最大化するための、リアルタイムデータ分析プラットフォームの共同開発。</li>
            </ul>
            <p class="mt-4">私たちはこの提携を通じて、エンターテインメント業界におけるデジタルトランスフォーメーションを加速させ、これまでにない新しい価値を創造してまいります。</p>
        `,
        imageId: 'news-3'
    }
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

export const workItemsData: WorkItem[] = [
    {
      id: '1',
      slug: 'cosmic-explorer',
      title: 'Cosmic Explorer',
      category: 'Game',
      description: '未知の銀河を旅する、オープンワールド宇宙探査ゲーム。',
      longDescription: `
        <p>「Cosmic Explorer」は、プレイヤーが宇宙船のキャプテンとなり、広大な銀河系を自由に探査するオープンワールドRPGです。</p>
        <p class="mt-4">プロシージャル生成によって生み出される無数の星々には、それぞれ独自の環境、生態系、そして文明が存在します。資源を採掘し、宇宙船をアップグレードし、異星人と交易や戦闘を繰り広げながら、銀河の中心に隠された謎を解き明かしてください。</p>
        <h3 class="font-headline text-xl font-bold mt-6 mb-2">主な特徴</h3>
        <ul class="list-disc list-inside space-y-2">
            <li><strong>無限の探査:</strong> 自動生成される銀河で、毎回新しい冒険が待っています。</li>
            <li><strong>自由なプレイスタイル:</strong> 探検家、商人、賞金稼ぎ、海賊など、なりたい自分になろう。</li>
            <li><strong>奥深いカスタマイズ:</strong> モジュール式の宇宙船設計で、自分だけの船を建造可能。</li>
            <li><strong>壮大なストーリー:</strong> 古代異星人の謎を追う、壮大なメインストーリー。</li>
        </ul>
      `,
      platforms: [
        { name: 'PC', url: '#' },
        { name: 'Console', url: '#' }
      ],
      imageId: 'work-cosmic-explorer',
      galleryImageIds: ['news-2', 'work-cosmic-explorer', 'hero-background'],
    },
    {
      id: '2',
      slug: 'taskmaster-pro',
      title: 'TaskMaster Pro',
      category: 'App',
      description: 'チームの生産性を最大化する、次世代プロジェクト管理ツール。',
      longDescription: `
        <p>「TaskMaster Pro」は、個人から大規模チームまで対応する、柔軟でパワフルなプロジェクト管理アプリケーションです。</p>
        <p class="mt-4">直感的なカンバンボード、ガントチャート、カレンダー表示を切り替えながら、タスクの進捗を視覚的に把握できます。AIによるタスクの優先順位付け提案や、自動化されたワークフロー設定により、面倒な管理業務から解放され、本来の業務に集中できます。</p>
        <h3 class="font-headline text-xl font-bold mt-6 mb-2">主な機能</h3>
        <ul class="list-disc list-inside space-y-2">
            <li><strong>多様なビュー:</strong> カンバン、リスト、ガントチャート、カレンダーなど、好みの表示方法でタスクを管理。</li>
            <li><strong>AIアシスタント:</strong> 締め切りや依存関係を分析し、最適なタスクの優先順位を提案。</li>
            <li><strong>強力な連携:</strong> Slack, Google Drive, GitHubなど、普段お使いのツールとシームレスに連携。</li>
            <li><strong>詳細なレポート:</strong> プロジェクトの進捗やチームのパフォーマンスを分析する、カスタマイズ可能なダッシュボード。</li>
        </ul>
      `,
      platforms: [
        { name: 'Web', url: '#' },
        { name: 'iOS', url: '#' },
        { name: 'Android', url: '#' }
      ],
      imageId: 'work-taskmaster-pro',
      galleryImageIds: ['work-taskmaster-pro', 'news-3'],
    },
    {
      id: '3',
      slug: 'pixel-painters',
      title: 'Pixel Painters',
      category: 'Game',
      description: 'お題に合わせてドット絵を描く、お絵かきコミュニケーションゲーム。',
      longDescription: `
        <p>「Pixel Painters」は、オンラインで友達や世界中のプレイヤーとお絵かきが楽しめる、新感覚のパーティゲームです。</p>
        <p class="mt-4">出題されるお題に合わせて、限られた時間内にドット絵を作成します。完成した絵は全員で鑑賞し、「いいね！」を送り合ったり、誰が一番お題に近かったかを投票で決めたりします。絵心は不要！ユニークな発想とセンスで、最高のピクセルアーティストを目指しましょう。</p>
        <h3 class="font-headline text-xl font-bold mt-6 mb-2">ゲームモード</h3>
        <ul class="list-disc list-inside space-y-2">
            <li><strong>クリエイトモード:</strong> 出題されたお題のドット絵を描いて、みんなに披露しよう。</li>
            <li><strong>クイズモード:</strong> 他のプレイヤーが描いた絵を見て、お題が何かを当てよう。</li>
            <li><strong>フリーペイント:</strong> 時間を気にせず、自由にドット絵制作が楽しめる。</li>
        </ul>
      `,
      platforms: [
        { name: 'PC', url: '#' },
        { name: 'Web', url: 'https://example.com' }
      ],
      imageId: 'work-pixel-painters',
      galleryImageIds: ['work-pixel-painters'],
    },
];

export const creatorItemsData: CreatorItem[] = [
    {
        id: '1',
        name: 'Alpha Creative',
        description: '美麗なイラストと独特な世界観でファンを魅了するデジタルアーティスト。キャラクターデザインから背景美術まで幅広く手掛ける。',
        imageId: 'creator-alpha',
        url: '#',
        tags: ['イラスト', 'コンセプトアート'],
    },
    {
        id: '2',
        name: 'Beta Gaming',
        description: '高難易度ゲームの実況プレイで人気のストリーマー。冷静な分析と、時折見せる情熱的なプレイが持ち味。e-Sports大会にも出場経験あり。',
        imageId: 'creator-beta',
        url: '#',
        tags: ['ゲーム実況', 'e-Sports'],
    },
];
