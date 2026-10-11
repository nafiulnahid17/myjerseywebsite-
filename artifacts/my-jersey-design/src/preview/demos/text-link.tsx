import { useState } from 'react';
import { TextLink } from '../../components/ui/text-link';

export default function TextLinkDemo() {
  const [last, setLast] = useState('None');
  return <div className="space-y-8">
    <div className="flex flex-wrap gap-8">
      {['Recent works','Contact','About','Outlets','Factory'].map(label=><TextLink key={label} href="#link-result" onClick={event=>{event.preventDefault();setLast(label);}}>{label}</TextLink>)}
    </div>
    <TextLink variant="underlined" href="#link-result" onClick={event=>{event.preventDefault();setLast('Contact now');}}>Contact now ↗</TextLink>
    <p id="link-result" role="status" className="font-mono text-sm">Last selection: {last}</p>
    <p className="text-sm text-muted-foreground">Navigation and underlined variants. The labels shown here reflect the user's requested navigation; these are demonstration links, not new website routes.</p>
  </div>;
}
