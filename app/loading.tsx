export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary/30" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-primary border-e-transparent border-b-transparent border-s-transparent" />
        </div>
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Lade...</p>
      </div>
    </div>
  );
}
