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

        {/* 使い方（ステップ表示） */}
        <div className="flex items-center justify-center gap-2 text-secondary text-base">
          <span className="bg-muted px-3 py-1.5 rounded-full text-sm font-medium">
            ① 作成
          </span>
          <span className="text-border">→</span>
          <span className="bg-muted px-3 py-1.5 rounded-full text-sm font-medium">
            ② 共有
          </span>
          <span className="text-border">→</span>
          <span className="bg-muted px-3 py-1.5 rounded-full text-sm font-medium">
            ③ 集計
          </span>
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
