import { Tag } from '../../components/ui/tag';

export default function TagDemo() {
  return <div className="space-y-8">
    <div className="flex flex-wrap gap-4"><Tag/><Tag inStock={false}/></div>
    <div className="relative h-20 w-56 rounded-xl border bg-card"><Tag variant="category">National</Tag></div>
    <p className="text-sm text-muted-foreground">Original availability dots, green/red pills and absolute category tag. Category tags sit inside a positioned card.</p>
  </div>;
}
