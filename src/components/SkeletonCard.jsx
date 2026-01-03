export default function SkeletonCard(){
  return (
    <div className="bg-card rounded-lg overflow-hidden animate-pulse">
      <div className="h-48 w-full bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-20 bg-muted rounded" />
        <div className="h-5 w-full bg-muted rounded" />
        <div className="h-5 w-5/6 bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-4/5 bg-muted rounded" />
      </div>
    </div>
  )
}
