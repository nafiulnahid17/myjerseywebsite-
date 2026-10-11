import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Icon } from '../../components/ui/icon';

export default function ButtonDemo() {
  const [count,setCount]=useState(0);
  const [category,setCategory]=useState('All');
  return <div className="space-y-8">
    <div className="flex flex-wrap items-center gap-3">
      <Button onClick={()=>setCount(n=>n+1)}>Get your design now <Icon name="arrow"/></Button>
      <Button variant="outline" onClick={()=>setCount(n=>n+1)}>Contact now</Button>
      <Button variant="icon" aria-label="Cart example" onClick={()=>setCount(n=>n+1)}><Icon name="cart"/></Button>
    </div>
    <div className="flex flex-wrap gap-3"><Button size="small" onClick={()=>setCount(n=>n+1)}>Small primary</Button><Button variant="outline" size="small" onClick={()=>setCount(n=>n+1)}>Small outline</Button></div>
    <div className="flex flex-wrap gap-3"><Button disabled>Disabled primary</Button><Button variant="outline" disabled>Disabled outline</Button><Button variant="icon" disabled aria-label="Disabled icon"><Icon name="cart"/></Button></div>
    <div className="flex flex-wrap gap-2">{['All','National','Club'].map(label=><Button key={label} variant="filter" active={category===label} onClick={()=>setCategory(label)}>{label}</Button>)}</div>
    <Button href="#button-result" onClick={event=>{event.preventDefault();setCount(n=>n+1);}}>Native anchor CTA</Button>
    <p id="button-result" role="status" className="text-sm text-muted-foreground">Activations: {count}. Filter selection: {category}. This is only a component demonstration.</p>
    <p className="text-sm text-muted-foreground">Source variants, small size, disabled guards, selected filter state and native keyboard focus. No headless UI library replaces the source behavior.</p>
  </div>;
}
