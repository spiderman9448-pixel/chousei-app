import Link from "next/link";
import { Button } from "@/app/components/ui";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background">
      <div className="max-w-md w-full text-center space-y-10">
        {/* ロゴ・タイトル */}
        <div className="space-y-4">
          <div className="text-6xl">📅</div>
          <h1 className="text-4xl font-bold text-foreground">
            カンタン出欠調整
          </h1>
          <p className="text-secondary text-xl leading-relaxed">
            ログイン不要！
            <br />
            URLを共有するだけで
            <br />
            イベントの出欠を集められます。
          </p>
        </div>

        {/* 使い方 */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="space-y-2">
            <div className="text-4xl">✏️</div>
            <p className="text-base font-medium text-foreground">
              イベントを作成
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl">🔗</div>
            <p className="text-base font-medium text-foreground">URLを共有</p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl">✅</div>
            <p className="text-base font-medium text-foreground">出欠を集計</p>
          </div>
        </div>

        {/* CTA */}
        <Link href="/new">
          <Button size="lg" className="w-full text-xl py-5 mt-4">
            イベントを作成する
          </Button>
        </Link>
      </div>
    </div>
  );
}
