import { JerseyPreview } from '../../components/ui/jersey-preview';

export default function JerseyPreviewDemo() {
  return <div className="grid gap-8 sm:grid-cols-2">
    <div><div className="mx-auto max-w-[240px]"><JerseyPreview base="#121212" accent="#d9a94a" name="YOUR NAME" number="10" aria-label="Black and gold source jersey"/></div><p className="mt-5 text-center text-sm text-muted-foreground">Source hero colors · YOUR NAME / 10</p></div>
    <div><div className="mx-auto max-w-[240px]"><JerseyPreview base="#1f4fd8" accent="#f5c518" name="ROYALS" number="07" aria-label="Blue and gold cricket jersey"/></div><p className="mt-5 text-center text-sm text-muted-foreground">Source cricket colors · ROYALS / 07</p></div>
  </div>;
}
