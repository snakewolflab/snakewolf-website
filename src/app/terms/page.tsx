
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '利用規約',
  description: 'SnakeWolfのサービス利用規約です。',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">利用規約</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          本サービスの利用にあたっては、本規約に同意したものとみなします。
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
        <p>この利用規約（以下，「本規約」といいます。）は、SnakeWolf（以下，「当プロジェクト」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。</p>
        
        <h2 className="font-headline">第1条（適用）</h2>
        <p>本規約は，ユーザーと当プロジェクトとの間の本サービスの利用に関わる一切の関係に適用されるものとします。</p>

        <h2 className="font-headline">第2条（禁止事項）</h2>
        <p>ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。</p>
        <ol className="list-decimal list-inside">
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>当プロジェクトのサーバーまたはネットワークの機能を破壊したり，妨害したりする行為</li>
            <li>当プロジェクトのサービスの運営を妨害するおそれのある行為</li>
            <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
            <li>他のユーザーに成りすます行為</li>
            <li>当プロジェクトのサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為</li>
            <li>その他，当プロジェクトが不適切と判断する行為</li>
        </ol>

        <h2 className="font-headline">第3条（免責事項）</h2>
        <p>当プロジェクトは、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。</p>
        
        <h2 className="font-headline">第4条（サービス内容の変更等）</h2>
        <p>当プロジェクトは、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。</p>

        <h2 className="font-headline">第5条（準拠法・裁判管轄）</h2>
        <p>本規約の解釈にあたっては，日本法を準拠法とします。本サービスに関して紛争が生じた場合には，当プロジェクトの所在地を管轄する裁判所を専属的合意管轄とします。</p>
        
        <p className="text-right text-muted-foreground pt-8">最終更新日: 2024年7月21日</p>
      </div>
    </div>
  );
}
