import Link from "next/link";
import { Button } from "@/app/components/ui";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background">
      <div className="max-w-sm w-full text-center space-y-8">
        {/* ロゴ・タイトル */}
        <div className="space-y-3">
          <div className="text-5xl">📅</div>
          <h1 className="text-2xl font-bold text-foreground">
            カンタン出欠調整
          </h1>
          <p className="text-secondary text-base leading-relaxed">
            ログイン不要！
            <br />
            URLを共有するだけで
            <br />
            イベントの出欠を集められます。
          </p>
        </div>

        {/* 使い方（ステップ表示） */}
        <div className="flex items-center justify-center gap-2 text-secondary">
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
          <Button size="lg" className="w-full text-base py-4 mt-2">
            イベントを作成する
          </Button>
        </Link>
      </div>
    </div>
  );
}
