
'use client';

import type { Metadata } from 'next';
import Link from 'next/link';

// export const metadata: Metadata = {
//   title: '誹謗中傷への対応について',
//   description: 'SnakeWolfのコミュニティにおける誹謗中傷への対応方針について。',
// };

export default function DefamationPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">誹謗中傷への対応について</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          すべての人が安心して楽しめるコミュニティを目指して。
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
        <p>SnakeWolfは、私たちのプラットフォームやコミュニティに参加するすべてのユーザーが、敬意をもって互いに接し、安全でポジティブな体験を共有できる環境を維持することに尽力しています。</p>
        <p>私たちは、人種、性別、性的指向、宗教、国籍、障害など、いかなる理由に基づく差別、ハラスメント、ヘイトスピーチ、そして個人に対する誹謗中傷を一切容認しません。</p>
        
        <h2 className="font-headline">私たちの基本方針</h2>
        <ul className="list-disc list-inside">
          <li><strong>ゼロ・トレランス:</strong> 誹謗中傷や悪意のある行為に対しては、厳格な姿勢で臨みます。</li>
          <li><strong>迅速な対応:</strong> 報告を受けた問題に対しては、迅速に調査し、適切な措置を講じます。</li>
          <li><strong>透明性の確保:</strong> 対応プロセスやポリシーについて、可能な限り透明性を保ち、コミュニティの信頼を維持します。</li>
          <li><strong>教育と啓発:</strong> ポジティブなコミュニケーションを促進するための啓発活動に努めます。</li>
        </ul>

        <h2 className="font-headline">禁止される行為</h2>
        <p>以下のような行為は、私たちのコミュニティガイドラインに違反します。</p>
        <ul className="list-disc list-inside">
            <li>特定の個人や集団に対する脅迫、嫌がらせ、ストーキング行為。</li>
            <li>差別的な言葉や、憎悪を煽るコンテンツの投稿。</li>
            <li>他者のプライバシーを侵害する個人情報の公開。</li>
            <li>虚偽の情報を流布し、他者の名誉を毀損する行為。</li>
        </ul>

        <h2 className="font-headline">違反が確認された場合の措置</h2>
        <p>ガイドラインへの違反が確認された場合、以下の措置を単独または組み合わせて講じることがあります。</p>
        <ul className="list-disc list-inside">
            <li>該当コンテンツの削除</li>
            <li>アカウントの一時的または永久的な利用停止</li>
            <li>法執行機関への通報</li>
        </ul>
        
        <h2 className="font-headline">ご協力のお願い</h2>
        <p>健全なコミュニティを維持するためには、皆様のご協力が不可欠です。不適切な行為やコンテンツを発見した場合は、速やかに<Link href="/contact">お問い合わせフォーム</Link>よりご報告ください。</p>
        <p>私たちは、すべてのクリエイターとファンが創造性を最大限に発揮し、安心して交流できる場所を守るために、継続的な努力を続けます。</p>
        
        <p className="text-right text-muted-foreground pt-8">最終更新日: 2024年7月21日</p>
      </div>
    </div>
  );
}
