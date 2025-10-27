
'use client';

import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: '皆さんへのお願い',
//   description: 'SnakeWolfコミュニティへのお願いです。',
// };

export default function RequestPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">皆さんへのお願い</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          SnakeWolfの活動を応援してくださる皆様へ。
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
        <p>日頃より、SnakeWolfの活動および所属クリエイターを応援いただき、誠にありがとうございます。</p>
        <p>皆様の温かいご支援が、私たちの創造の源となっています。健全なコミュニティを維持し、さらに良いコンテンツを皆様にお届けするため、いくつかお願いしたいことがございます。</p>

        <h2 className="font-headline">コンテンツの楽しみ方について</h2>
        <ul className="list-disc list-inside">
          <li>公式に提供されているプラットフォームでコンテンツをお楽しみください。</li>
          <li>無断転載や違法アップロードされたコンテンツの視聴はご遠慮ください。</li>
          <li>憶測や不確かな情報に基づく発言や拡散はお控えください。</li>
        </ul>

        <h2 className="font-headline">二次創作活動について</h2>
        <p>私たちは二次創作文化を尊重しており、ファンの皆様の活動を応援しています。ただし、以下の点にご配慮いただけますようお願いいたします。</p>
        <ul className="list-disc list-inside">
            <li>公式と誤解されるような表現は避けてください。</li>
            <li>クリエイターや当プロジェクト、第三者の名誉を傷つける内容は禁止します。</li>
            <li>過度に暴力的・性的な表現は、適切なゾーニングをお願いします。</li>
            <li>営利目的での二次創作物の配布・販売は、別途許諾がない限りご遠慮ください。</li>
        </ul>
        <p className="text-sm text-muted-foreground">※二次創作の可否や範囲は、クリエイターによって方針が異なる場合があります。詳細については、各クリエイターの公式チャンネル（YouTube等）で公開されているガイドラインを必ずご確認ください。</p>

        <h2 className="font-headline">コミュニティでの振る舞いについて</h2>
        <p>他のファンの方々やクリエイターへの敬意を忘れず、建設的でポジティブなコミュニケーションを心がけてください。詳細については、「誹謗中傷への対応について」のページもご一読ください。</p>
        
        <p>これらのガイドラインは、クリエイターが安心して活動を続け、ファンの皆様が心から楽しめる環境を守るために設けています。皆様のご理解とご協力に、心より感謝申し上げます。</p>
        
        <p className="text-right text-muted-foreground pt-8">最終更新日: 2024年7月25日</p>
      </div>
    </div>
  );
}
