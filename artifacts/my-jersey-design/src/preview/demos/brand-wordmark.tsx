import { BrandWordmark } from '../../components/ui/brand-wordmark';

export default function BrandWordmarkDemo() {
  return <div className="space-y-8">
    <div className="rounded-xl border bg-card p-8"><BrandWordmark/></div>
    <div className="rounded-xl border bg-card p-8"><BrandWordmark compact/></div>
    <p className="text-sm text-muted-foreground">Full navigation lockup and compact mark. This preserves the source's live-text mark, including its original metallic gold effect.</p>
  </div>;
}
