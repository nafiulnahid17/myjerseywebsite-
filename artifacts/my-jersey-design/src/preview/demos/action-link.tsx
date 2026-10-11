import { useState } from 'react';
import { ActionLink } from '../../components/ui/action-link';

export default function ActionLinkDemo() {
  const [activations, setActivations] = useState(0);
  return <div className="space-y-8">
    <p className="text-sm text-muted-foreground">Primary filled pill. Links retain native anchor behavior; application routing stays outside the design system.</p>
    <div className="flex flex-wrap gap-4">
      <ActionLink href="#action-result" onClick={event => {event.preventDefault(); setActivations(n=>n+1);}}>Get your custom jersey ↗</ActionLink>
      <ActionLink href="#action-result" disabled onClick={()=>setActivations(n=>n+1)}>Disabled CTA</ActionLink>
    </div>
    <p id="action-result" role="status" className="font-mono text-sm">Demo activations: {activations}</p>
    <p className="text-sm text-muted-foreground">Tab to the active link and press Enter. Disabled and visible focus states are accessibility adaptations added during extraction.</p>
  </div>;
}
