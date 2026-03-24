export default function SkeletonCard({ lines = 3 }) {
  return (
    <div className="animate-pulse p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] space-y-3">
      <div className="h-4 bg-white/10 rounded w-2/3" />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`h-3 bg-white/[0.06] rounded ${i === lines - 1 ? 'w-1/2' : 'w-full'}`} />
      ))}
    </div>
  )
}
