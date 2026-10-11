import { useState } from 'react';
import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { ProductCard } from '@workspace/my-jersey-design/components/ui/product-card';
import { getJerseyReference } from '@/data/jersey-references';
import { COLLECTIONS, type CollectionKey, type Product } from '@/data/catalog';

type Actions = { onAdd: (p: Product) => void; onCustomize: (p: Product) => void; onBuy: (p: Product) => void };

function Collection({ k, onAdd, onCustomize, onBuy }: Actions & { k: CollectionKey }) {
  const d = COLLECTIONS[k];
  const [cat, setCat] = useState('All');
  const [all, setAll] = useState(false);
  let list = d.items.filter((x) => cat === 'All' || x.category === cat);
  if (cat === 'All' && !all) list = list.filter((x) => !x.more);
  return (
    <>
      <div className="bh">
        <h3>{d.title}</h3>
        <div className="ch">
          {['All', ...d.tags].map((c) => <Button key={c} variant="filter" active={c === cat} onClick={() => { setCat(c); setAll(false); }}>{c}</Button>)}
        </div>
        <Button variant="outline" size="small" aria-expanded={all} onClick={() => { setCat('All'); setAll(!all); }}>{all ? 'Show less' : 'Show all'}</Button>
      </div>
      <div className="shop-grid">
        {list.map((p) => <ProductCard key={p.id} product={p} photo={getJerseyReference(p.id)} onAdd={() => onAdd(p)} onCustomize={() => onCustomize(p)} onBuy={() => onBuy(p)} />)}
      </div>
    </>
  );
}

export function Shop(a: Actions) {
  return (
    <section id="shop"><div className="w">
      <span className="eb">Ready collections</span><h2>Customize Your Favourite Ones</h2>
      <p className="shop-ref-note" role="note">Team-kit photos are style references, not photos of My Jersey stock or proof of team affiliation. Illustrations remain where a matching high-resolution photograph is still being sourced.</p>
      <Collection k="fb" {...a} />
      <Collection k="cr" {...a} />
    </div></section>
  );
}
