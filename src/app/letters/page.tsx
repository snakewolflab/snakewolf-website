
import type { Metadata } from 'next';
import { Gift, Mail, Ban, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: '書簡について',
  description: 'ファンレターやプレゼントに関するガイドライン。',
};

export default function LettersPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">ファンレター・プレゼントについて</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          クリエイターへの温かいご支援、誠にありがとうございます。
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
        <div>
            <h2 className="font-headline flex items-center gap-2"><Mail />ファンレターについて</h2>
            <p>クリエイターへのファンレターは、私たちの活動の大きな励みとなります。いただいたお手紙は、責任をもって本人にお渡しいたします。</p>
            <p>ただし、安全上の理由から、スタッフが事前に内容を確認させていただく場合がございます。予めご了承ください。</p>
        </div>

        <div>
            <h2 className="font-headline flex items-center gap-2"><Mail />封筒によるお知らせ</h2>
            <p>当プロジェクトから封筒によりお知らせを送付する場合がございます。それぞれの内容は以下の通りです。</p>
            <ul className="list-disc list-inside">
                <li>白色の封筒：通常のお知らせ</li>
            </ul>
        </div>

        <div>
            <h2 className="font-headline flex items-center gap-2"><Gift />プレゼントについて</h2>
            <p>プレゼントをお考えの際は、以下のガイドラインをご一読いただけますようお願いいたします。安全な運営のため、ご理解とご協力をお願いいたします。</p>
        </div>
        
        <div>
            <h2 className="font-headline flex items-center gap-2 text-destructive"><Ban />受け取れないもの</h2>
            <p>大変申し訳ございませんが、以下の品目については、安全管理、衛生面、法令遵守の観点から受け取ることができません。</p>
            <ul className="list-disc list-inside text-muted-foreground">
                <li>現金、金券、商品券、ギフトカード、プリペイドカード等の換金性の高いもの</li>
                <li>飲食物全般（手作り、市販品問わず）</li>
                <li>生き物（動物、植物、虫類）</li>
                <li>危険物（火薬、燃料、刃物、薬品など）</li>
                <li>使用済み、開封済みのもの</li>
                <li>大きすぎるもの、重すぎるもの（スタッフが一人で持ち運べないもの）</li>
                <li>その他、公序良俗に反するものや、スタッフが不適切と判断したもの</li>
            </ul>
        </div>
        
        <div>
            <h2 className="font-headline flex items-center gap-2 text-amber-500"><AlertTriangle />注意事項</h2>
            <p>一度お送りいただいたファンレターやプレゼントは、原則として返却できません。送付先住所は公開しておりません。イベント会場や指定された窓口をご利用ください。</p>
            <p>上記のガイドラインに沿わないと判断されたプレゼントは、当社の判断で処分させていただく場合がございます。何卒ご了承ください。</p>
        </div>

        <p className="text-right text-muted-foreground pt-8">最終更新日: 2024年7月25日</p>
      </div>
    </div>
  );
}
