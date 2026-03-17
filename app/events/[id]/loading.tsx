export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-5xl animate-bounce">📅</div>
        <p className="text-lg text-secondary font-medium">読み込み中...</p>
      </div>
    </div>
  );
}
