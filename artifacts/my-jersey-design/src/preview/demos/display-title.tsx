import { DisplayTitle } from '../../components/ui/display-title';

export default function DisplayTitleDemo() {
  return <div className="space-y-10">
    <div><p className="mb-3 font-mono text-xs text-muted-foreground">H1 · campaign title</p><DisplayTitle as="h1">Welcome to <em className="jersey-metal">My Jersey</em></DisplayTitle></div>
    <div><p className="mb-3 font-mono text-xs text-muted-foreground">H2 · section heading</p><DisplayTitle as="h2">The street was always the first stadium.</DisplayTitle></div>
    <div><p className="mb-3 font-mono text-xs text-muted-foreground">H3 · gold emphasis</p><DisplayTitle as="h3" gold className="text-4xl">Your name. Your number.</DisplayTitle></div>
  </div>;
}
