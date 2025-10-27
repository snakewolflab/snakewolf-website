
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'SnakeWolfのプライバシーポリシーです。個人情報の取り扱いについて説明します。',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">プライバシーポリシー</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          お客様の個人情報の保護について。
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
        <p>SnakeWolf（以下「当プロジェクト」といいます。）は、お客様の個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。</p>

        <h2 className="font-headline">第1条（個人情報）</h2>
        <p>「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。</p>

        <h2 className="font-headline">第2条（個人情報の収集方法）</h2>
        <p>当プロジェクトは、ユーザーが利用登録をする際に氏名、生年月日、住所、電話番号、メールアドレス、銀行口座番号、クレジットカード番号、運転免許証番号などの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を、当社の提携先（情報提供元、広告主、広告配信先などを含みます。以下、｢提携先｣といいます。）などから収集することがあります。</p>

        <h2 className="font-headline">第3条（個人情報を収集・利用する目的）</h2>
        <p>当プロジェクトが個人情報を収集・利用する目的は、以下のとおりです。</p>
        <ol className="list-decimal list-inside">
          <li>当社サービスの提供・運営のため</li>
          <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
          <li>ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等及び当社が提供する他のサービスの案内のメールを送付するため</li>
          <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
          <li>利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため</li>
          <li>上記の利用目的に付随する目的</li>
        </ol>

        <h2 className="font-headline">第4条（プライバシーポリシーの変更）</h2>
        <p>本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。当社が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。</p>

        <h2 className="font-headline">第5条（お問い合わせ窓口）</h2>
        <p>本ポリシーに関するお問い合わせは、<Link href="/contact">お問い合わせフォーム</Link>よりお願いいたします。</p>
        
        <p className="text-right text-muted-foreground pt-8">最終更新日: 2024年7月21日</p>
      </div>
    </div>
  );
}
