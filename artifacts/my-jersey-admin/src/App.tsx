import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';
import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { BrandLogo } from '@workspace/my-jersey-design/components/ui/brand-logo';
import { Dialog } from '@workspace/my-jersey-design/components/ui/dialog';
import { Icon, IconSprite, type IconName } from '@workspace/my-jersey-design/components/ui/icon';
import { JerseyPreview } from '@workspace/my-jersey-design/components/ui/jersey-preview';
import { Tag } from '@workspace/my-jersey-design/components/ui/tag';

type Stage = 'New' | 'Reviewing' | 'Quote prepared';
type Inquiry = { id: string; kind: 'custom' | 'team'; label: string; quantity: number; stage: Stage; requestedAt: string };
type Jersey = { id: string; name: string; sport: string; collection: string; visibility: 'Visible' | 'Hidden'; price: number; primary: string; accent: string; number: string };
type Campaign = { slug: string; heading: string; copy: string; startsFrom: number };

const seedRequests: Inquiry[] = [
  { id: 'MJ-2408', kind: 'custom', label: 'Rafiq Hasan · custom cricket', quantity: 2, stage: 'New', requestedAt: 'Today, 10:42 AM' },
  { id: 'MJ-2407', kind: 'team', label: 'Northgate School · football', quantity: 24, stage: 'Reviewing', requestedAt: 'Today, 9:16 AM' },
  { id: 'MJ-2406', kind: 'custom', label: 'Nusrat Jahan · custom football', quantity: 1, stage: 'Quote prepared', requestedAt: 'Yesterday, 4:38 PM' },
  { id: 'MJ-2405', kind: 'team', label: 'Meghna Strikers · cricket', quantity: 18, stage: 'New', requestedAt: 'Yesterday, 1:05 PM' },
  { id: 'MJ-2404', kind: 'team', label: 'Dhanmondi Juniors · football', quantity: 30, stage: 'Reviewing', requestedAt: '18 Jun, 11:20 AM' },
];
const seedJerseys: Jersey[] = [
  { id: 'jersey-01', name: 'Royal Striker', sport: 'Football', collection: 'Matchday', visibility: 'Visible', price: 790, primary: '#143c91', accent: '#f3c75c', number: '10' },
  { id: 'jersey-02', name: 'Dhaka Night XI', sport: 'Cricket', collection: 'City Series', visibility: 'Visible', price: 850, primary: '#12234d', accent: '#ef5d4e', number: '07' },
  { id: 'jersey-03', name: 'Emerald Sprint', sport: 'Football', collection: 'Matchday', visibility: 'Hidden', price: 720, primary: '#087c62', accent: '#f2d57e', number: '11' },
  { id: 'jersey-04', name: 'Boundary Club', sport: 'Cricket', collection: 'City Series', visibility: 'Visible', price: 820, primary: '#f3f0e8', accent: '#cc342f', number: '18' },
];
const campaignSeed: Campaign[] = [
  { slug: 'custom', heading: 'Your design. Your game.', copy: 'Create a one-of-a-kind jersey that feels like yours, from the first sketch to the final stitch.', startsFrom: 399 },
  { slug: 'team', heading: 'Made for the whole squad.', copy: 'Bring your club colours together with custom team kits built for every player.', startsFrom: 299 },
];
const locations = [
  { id: 'loc-01', label: 'Mirpur Studio & Outlet', kind: 'Outlet', status: 'Open for visits', address: 'Section 10, Mirpur, Dhaka' },
  { id: 'loc-02', label: 'Uttara Collection Point', kind: 'Outlet', status: 'By appointment', address: 'Sector 7, Uttara, Dhaka' },
  { id: 'loc-03', label: 'Gazipur Production Floor', kind: 'Factory', status: 'Production site', address: 'Board Bazar, Gazipur' },
];
const nav: { href: string; label: string; icon: IconName; group: string }[] = [
  { href: '/', label: 'Overview', icon: 'grid', group: 'WORKSPACE' },
  { href: '/requests', label: 'Custom requests', icon: 'clipboard', group: 'WORKSPACE' },
  { href: '/team-requests', label: 'Team requests', icon: 'user', group: 'WORKSPACE' },
  { href: '/jerseys', label: 'Jersey catalog', icon: 'fabric', group: 'CATALOG' },
  { href: '/storefront', label: 'Storefront', icon: 'pen', group: 'CATALOG' },
  { href: '/locations', label: 'Locations', icon: 'factory', group: 'STUDIO' },
  { href: '/settings', label: 'Settings', icon: 'lock', group: 'STUDIO' },
];
const titleByPath: Record<string, string> = {
  '/': 'Overview', '/requests': 'Custom requests', '/team-requests': 'Team requests',
  '/jerseys': 'Jersey catalog', '/storefront': 'Storefront preview', '/locations': 'Locations', '/settings': 'Settings',
};

function initialDarkTheme() {
  try {
    const preference = window.localStorage.getItem('mj-theme');
    if (preference === 'dark' || preference === 'light') return preference === 'dark';
  } catch {
    // If browser storage is unavailable, follow the system preference.
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}

function Shell({ children }: { children: ReactNode }) {
  const [path] = useLocation();
  const [dark, setDark] = useState(initialDarkTheme);
  const [mobileNav, setMobileNav] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);
  const groups = ['WORKSPACE', 'CATALOG', 'STUDIO'];
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try {
      window.localStorage.setItem('mj-theme', next ? 'dark' : 'light');
    } catch {
      // The theme remains changed for this session if browser storage is unavailable.
    }
  }
  return <div className="app-root">
    <IconSprite />
    <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
      <div className="brand-wrap"><BrandLogo size="small" tagline={false} /></div>
      <div className="workspace-label"><span className="workspace-mark">MJ</span><span><b>Studio workspace</b><small>Bangladesh · Internal</small></span><Icon name="grid" /></div>
      <nav aria-label="Main navigation" className="side-nav">
        {groups.map(group => <div key={group} className="nav-group"><div className="nav-heading">{group}</div>{nav.filter(item => item.group === group).map(item => <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href === '/' ? 'overview' : item.href.slice(1)}`} aria-current={path === item.href ? 'page' : undefined} className={`nav-link ${path === item.href ? 'is-active' : ''}`} onClick={() => setMobileNav(false)}><Icon name={item.icon} /><span>{item.label}</span></Link>)}</div>)}
      </nav>
      <div className="sidebar-bottom"><div className="sample-mini"><span className="sample-dot" />SAMPLE ENVIRONMENT<small>Local preview only</small></div><div className="profile-row"><span className="profile-avatar">MJ</span><span><b>Studio team</b><small>Prototype workspace</small></span><Button variant="icon" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} data-testid="button-theme" onClick={toggleTheme}><Icon name={dark ? 'sun' : 'moon'} /></Button></div></div>
    </aside>
    <div className="main-column">
      <header className="topbar">
        <Button variant="icon" className="mobile-menu" aria-label={mobileNav ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-menu" onClick={() => setMobileNav(!mobileNav)}><Icon name={mobileNav ? 'x' : 'menu'} /></Button>
        <div className="crumb"><span>My Jersey</span><b>/</b><strong>{titleByPath[path] ?? 'Not found'}</strong></div>
        <div className="topbar-right"><span className="connection-chip"><i />Not connected</span><span className="topbar-date">Prototype · Bangladesh</span><Button variant="icon" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} data-testid="button-theme-top" onClick={toggleTheme}><Icon name={dark ? 'sun' : 'moon'} /></Button></div>
      </header>
      <main id="main-content" className="main-content">
        <div className="sample-alert" role="note" data-testid="status-sample-banner"><span className="alert-icon"><Icon name="file" /></span><span><b>SAMPLE / NOT CONNECTED</b><small>Illustrative workspace only. Nothing here is a confirmed order or saved record.</small></span><span className="alert-tail">REFRESH CLEARS PREVIEW EDITS</span></div>
        {children}
        <footer className="app-footer"><span>My Jersey · Internal operating workspace</span><span>All records are illustrative sample data</span></footer>
      </main>
    </div>
    {mobileNav && <Button variant="icon" className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileNav(false)} data-testid="button-close-mobile-nav"><span className="sr-only">Close navigation</span></Button>}
  </div>;
}

function PageHeading({ eyebrow, title, desc, action }: { eyebrow: string; title: string; desc: string; action?: ReactNode }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{desc}</p></div>{action && <div className="heading-action">{action}</div>}</div>;
}

function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`panel ${className}`}>{children}</section>;
}

function Overview() {
  const [open, setOpen] = useState(false);
  return <><PageHeading eyebrow="SAMPLE WORKDAY · DHAKA STUDIO" title="Good morning, team." desc="A clear view of the sample work moving through the studio today." action={<Button variant="outline" size="small" data-testid="button-activity-info" onClick={() => setOpen(true)}><Icon name="file" />About this demo</Button>} />
    <div className="metric-grid">
      {[['05', 'Sample inquiries', 'Across custom + team', 'clipboard'], ['02', 'Need first review', 'Not a live queue', 'track'], ['04', 'Catalog entries', '03 shown in preview', 'fabric'], ['03', 'Studio locations', 'Sample locations', 'store']].map(([value, label, note, icon]) => <Panel className="metric-card" key={label}><div className="metric-top"><span>{label}</span><Icon name={icon as IconName} /></div><div className="metric-value" data-testid={`metric-${label.toLowerCase().replaceAll(' ', '-')}`}>{value}</div><div className="metric-note">{note}</div></Panel>)}
    </div>
    <div className="overview-grid">
      <Panel className="inbox-panel"><div className="panel-heading"><div><h2>Latest sample inquiries</h2><p>Recent examples for workflow planning</p></div><Link href="/requests" className="text-link" data-testid="link-view-custom-requests">View all <Icon name="arrow" /></Link></div>
        <div className="request-list">{seedRequests.slice(0, 4).map((request, index) => <div className="request-row" key={request.id} data-testid={`row-overview-request-${request.id}`}><span className={`request-avatar avatar-${index % 3}`}>{request.kind === 'team' ? 'T' : 'C'}</span><div className="request-primary"><b>{request.label}</b><small>{request.id} · {request.requestedAt}</small></div><span className={`stage stage-${request.stage.toLowerCase().replace(' ', '-')}`}>{request.stage}</span><span className="request-qty">{request.quantity} pcs</span></div>)}</div>
      </Panel>
      <Panel className="workflow-panel"><div className="panel-heading"><div><h2>Operational shortcuts</h2><p>Jump into common studio work</p></div></div>
        <div className="shortcut-list">{nav.slice(1, 6).map(item => <Link key={item.href} href={item.href} className="shortcut" data-testid={`link-shortcut-${item.href.slice(1)}`}><span className="shortcut-icon"><Icon name={item.icon} /></span><span><b>{item.label}</b><small>{item.href === '/storefront' ? 'Copy & campaign controls' : item.href === '/jerseys' ? 'Visibility & starting price' : 'Illustrative sample records'}</small></span><Icon name="arrow" /></Link>)}</div>
      </Panel>
    </div>
    <Panel className="pipeline-panel"><div className="panel-heading"><div><h2>Sample request flow</h2><p>Planning snapshot only; these counts do not represent orders, payments or revenue.</p></div><span className="mini-badge">NOT LIVE</span></div><div className="pipeline">{[['New', '02', 'clipboard'], ['Reviewing', '02', 'track'], ['Quote prepared', '01', 'file']].map(([label, val, icon]) => <div className="pipeline-step" key={label}><span className="pipeline-icon"><Icon name={icon as IconName} /></span><div><small>{label}</small><b>{val} <span>examples</span></b></div><span className="pipeline-arrow">→</span></div>)}</div></Panel>
    <Dialog open={open} onOpenChange={setOpen} title="About this workspace" icon="file" description="A local prototype for the My Jersey studio team."><div className="dialog-copy"><p>Every name, request, quantity, catalog entry, and location in this workspace is fictional sample content.</p><p>Nothing is connected to a website, payment flow, order book, or customer record. Changes are temporary and disappear when you refresh.</p></div><Button variant="outline" size="small" onClick={() => setOpen(false)} data-testid="button-close-demo-info">Got it</Button></Dialog>
  </>;
}

function InquiryPage({ kind }: { kind: 'custom' | 'team' }) {
  const data = seedRequests.filter(item => item.kind === kind);
  const [query, setQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('All stages');
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [notice, setNotice] = useState('');
  const results = useMemo(() => data.filter(item => (item.label.toLowerCase().includes(query.toLowerCase()) || item.id.toLowerCase().includes(query.toLowerCase())) && (stageFilter === 'All stages' || item.stage === stageFilter)), [data, query, stageFilter]);
  const title = kind === 'custom' ? 'Custom requests' : 'Team requests';
  return <>
    <PageHeading eyebrow={kind === 'custom' ? 'CUSTOM WORK' : 'CLUBS & SCHOOLS'} title={title} desc={kind === 'custom' ? 'Illustrative one-off and personal jersey inquiries. These are not confirmed orders.' : 'Sample team kit quote requests from clubs and schools. Not submitted by real customers.'} action={<span className="count-pill">{data.length} sample records</span>} />
    {notice && <div className="preview-notice" role="status" data-testid="status-preview-notice"><Icon name="check" />{notice}<Button variant="icon" onClick={() => setNotice('')} aria-label="Dismiss notice" data-testid="button-dismiss-request-notice"><Icon name="x" /></Button></div>}
    <Panel className="data-panel">
      <div className="toolbar"><label className="search-field"><Icon name="grid" /><span className="sr-only">Search sample requests</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search label or reference…" data-testid="input-request-search" /></label><label className="select-wrap"><span className="sr-only">Filter requests by stage</span><select value={stageFilter} onChange={e => setStageFilter(e.target.value)} data-testid="select-request-stage"><option>All stages</option><option>New</option><option>Reviewing</option><option>Quote prepared</option></select></label><span className="toolbar-result">{results.length} of {data.length}</span></div>
      <div className="table-scroll"><table><thead><tr><th>REFERENCE</th><th>{kind === 'team' ? 'CLUB / SCHOOL' : 'SAMPLE REQUEST'}</th><th>QUANTITY</th><th>STAGE</th><th>RECEIVED</th><th></th></tr></thead><tbody>{results.map(item => <tr key={item.id} data-testid={`row-inquiry-${item.id}`}><td><span className="reference">{item.id}</span><span className="sample-inline">SAMPLE</span></td><td><b>{item.label}</b></td><td>{item.quantity} <span className="muted">pieces</span></td><td><span className={`stage stage-${item.stage.toLowerCase().replace(' ', '-')}`}>{item.stage}</span></td><td className="muted">{item.requestedAt}</td><td><Button variant="outline" size="small" onClick={() => setSelected(item)} data-testid={`button-review-${item.id}`}>Review</Button></td></tr>)}</tbody></table></div>
      {!results.length && <div className="empty-state"><span><Icon name="grid" /></span><h3>No matching sample requests</h3><p>Try another reference, name, or stage filter.</p><Button variant="outline" size="small" onClick={() => { setQuery(''); setStageFilter('All stages'); }} data-testid="button-reset-request-filters">Clear filters</Button></div>}
      <div className="table-foot">All records are fictional examples. Review actions only open a local preview.</div>
    </Panel>
    <Dialog open={!!selected} onOpenChange={value => !value && setSelected(null)} title="Sample request review" icon="clipboard" variant="request" contentKey={selected?.id}>
      {selected && <div className="review-detail"><div className="reference-line"><span className="reference">{selected.id}</span><span className="sample-inline">SAMPLE / NOT CONNECTED</span></div><h4>{selected.label}</h4><div className="detail-grid"><div><small>Requested quantity</small><b>{selected.quantity} pieces</b></div><div><small>Current stage</small><b>{selected.stage}</b></div><div><small>Received</small><b>{selected.requestedAt}</b></div><div><small>Customer contact</small><b>Not included in prototype</b></div></div><p className="preview-callout">This is not a real customer inquiry. No order, quote, or status change will be made.</p><Button variant="outline" size="small" onClick={() => { setSelected(null); setNotice('Preview reviewed locally — no record was updated.'); }} data-testid="button-close-request-review">Close preview</Button></div>}
    </Dialog>
  </>;
}

function JerseyCatalog() {
  const [query, setQuery] = useState('');
  const [sport, setSport] = useState('All sports');
  const [items, setItems] = useState(seedJerseys);
  const [selected, setSelected] = useState<Jersey | null>(null);
  const [notice, setNotice] = useState('');
  const results = items.filter(item => (item.name.toLowerCase().includes(query.toLowerCase()) || item.collection.toLowerCase().includes(query.toLowerCase())) && (sport === 'All sports' || item.sport === sport));
  function toggleVisibility(id: string) { setItems(current => current.map(item => item.id === id ? { ...item, visibility: item.visibility === 'Visible' ? 'Hidden' : 'Visible' } : item)); setNotice('Visibility changed in this preview only. Refresh to restore sample data.'); }
  return <>
    <PageHeading eyebrow="PRODUCT REFERENCE" title="Jersey catalog" desc="Sample catalog entries, shown price context, and visibility controls. Not a live product feed." action={<span className="count-pill">04 sample styles</span>} />
    {notice && <div className="preview-notice" role="status" data-testid="status-catalog-notice"><Icon name="check" />{notice}<Button variant="icon" onClick={() => setNotice('')} aria-label="Dismiss notice" data-testid="button-dismiss-catalog-notice"><Icon name="x" /></Button></div>}
    <div className="catalog-note"><Icon name="file" /><span><b>Displayed prices are sample product context.</b> Campaign entry offers (399 TK custom / 299 TK team) are separate and are not fixed prices for every jersey.</span></div>
    <Panel className="data-panel"><div className="toolbar"><label className="search-field"><Icon name="grid" /><span className="sr-only">Search catalog</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search jersey or collection…" data-testid="input-jersey-search" /></label><label className="select-wrap"><span className="sr-only">Filter by sport</span><select value={sport} onChange={e => setSport(e.target.value)} data-testid="select-jersey-sport"><option>All sports</option><option>Football</option><option>Cricket</option></select></label><span className="toolbar-result">{results.length} styles</span></div>
      <div className="catalog-grid">{results.map(item => <article className="jersey-card" key={item.id} data-testid={`card-jersey-${item.id}`}><Button variant="outline" className="jersey-art" onClick={() => setSelected(item)} aria-label={`Preview ${item.name}`} data-testid={`button-preview-${item.id}`}><Tag variant="category">{item.sport}</Tag><JerseyPreview base={item.primary} accent={item.accent} name="MY JERSEY" number={item.number} /></Button><div className="jersey-card-body"><div className="jersey-title-row"><div><h3>{item.name}</h3><small>{item.collection} · Sample listing</small></div><span className={`visibility ${item.visibility === 'Visible' ? 'visible' : ''}`}><i />{item.visibility}</span></div><div className="price-row"><span>Displayed sample price</span><b>{item.price} <small>TK</small></b></div><div className="jersey-actions"><Button variant="outline" size="small" onClick={() => toggleVisibility(item.id)} data-testid={`button-toggle-visibility-${item.id}`}>{item.visibility === 'Visible' ? 'Hide preview' : 'Show preview'}</Button><Button variant="icon" aria-label={`Open ${item.name} preview`} onClick={() => setSelected(item)} data-testid={`button-details-${item.id}`}><Icon name="arrow" /></Button></div></div></article>)}</div>
      {!results.length && <div className="empty-state"><span><Icon name="fabric" /></span><h3>No sample jerseys found</h3><p>Adjust your search or choose another sport.</p><Button variant="outline" size="small" onClick={() => { setQuery(''); setSport('All sports'); }} data-testid="button-reset-jersey-filters">Clear filters</Button></div>}
      <div className="table-foot">Visibility edits stay in local page state and disappear on refresh.</div>
    </Panel>
    <Dialog open={!!selected} onOpenChange={value => !value && setSelected(null)} title={selected?.name ?? 'Jersey preview'} icon="fabric" variant="wide" contentKey={selected?.id}>
      {selected && <div className="jersey-dialog"><div className="jersey-dialog-art"><JerseyPreview base={selected.primary} accent={selected.accent} name="MY JERSEY" number={selected.number} /></div><div><span className="eyebrow">{selected.collection} · {selected.sport}</span><h4>{selected.name}</h4><p className="muted">Illustrative product preview. The displayed price is context for this sample item, not the campaign starting offer.</p><div className="dialog-price">{selected.price} TK <small>sample displayed price</small></div><Button variant="outline" size="small" onClick={() => setSelected(null)} data-testid="button-close-jersey-preview">Close preview</Button></div></div>}
    </Dialog>
  </>;
}

function Storefront() {
  const [sections, setSections] = useState(campaignSeed);
  const [selected, setSelected] = useState<Campaign | null>(null);
  const [preview, setPreview] = useState<Campaign | null>(null);
  const [notice, setNotice] = useState('');
  const selectedDraft = selected && sections.find(section => section.slug === selected.slug);
  function updateSelected(field: 'heading' | 'copy', value: string) { if (!selected) return; setSections(current => current.map(section => section.slug === selected.slug ? { ...section, [field]: value } : section)); }
  return <>
    <PageHeading eyebrow="WEBSITE COPY · PREVIEW ONLY" title="Storefront controls" desc="Review campaign messaging and starting offers before a future website connection. No publish action is available." action={<span className="count-pill">Preview mode</span>} />
    {notice && <div className="preview-notice" role="status" data-testid="status-storefront-notice"><Icon name="check" />{notice}<Button variant="icon" onClick={() => setNotice('')} aria-label="Dismiss notice" data-testid="button-dismiss-storefront-notice"><Icon name="x" /></Button></div>}
    <div className="storefront-banner"><div className="storefront-info"><span className="eyebrow">WEBSITE PREVIEW · NO SOURCE IMAGERY</span><h2>Campaigns, before they go live.</h2><p>Review sample website messaging and each request type’s distinct starting offer. Public site connection and publishing are not enabled.</p><span className="offline-tag"><i />PREVIEW ONLY</span></div><div className="storefront-offers"><div><span>CUSTOM DESIGN</span><b>399 TK</b><small>starting offer</small></div><div><span>TEAM KIT</span><b>299 TK</b><small>starting offer</small></div><p>Campaign entry offers are separate from every product's displayed price.</p></div></div>
    <div className="campaign-heading"><div><h2>Campaign sections</h2><p>Offer starting points stay separate by request type.</p></div><span className="count-pill">2 draft sections</span></div>
    <div className="campaign-grid">{sections.map(section => <Panel className="campaign-card" key={section.slug} ><div className={`campaign-top campaign-${section.slug}`}><span className="campaign-mark">{section.slug === 'custom' ? '01' : '02'}</span><span>{section.slug === 'custom' ? 'CUSTOM JERSEY' : 'TEAM KIT'}</span><b>৳{section.startsFrom} <small>starting from</small></b></div><div className="campaign-body"><span className="eyebrow">STOREFRONT SECTION · {section.slug.toUpperCase()}</span><h3>{section.heading}</h3><p>{section.copy}</p><div className="campaign-footer"><span><small>Starting offer</small><b>{section.startsFrom} TK <small>not a fixed product price</small></b></span><span className="preview-only">LOCAL DRAFT</span></div><div className="campaign-actions"><Button variant="outline" size="small" onClick={() => setPreview(section)} data-testid={`button-preview-campaign-${section.slug}`}><Icon name="grid" />Preview</Button><Button variant="primary" size="small" onClick={() => setSelected(section)} data-testid={`button-edit-campaign-${section.slug}`}><Icon name="pen" />Edit copy</Button></div></div></Panel>)}</div>
    <div className="editor-note"><Icon name="lock" /><span>Local edits are temporary and disappear on refresh. There is no save, publish, or live website connection in this prototype.</span></div>
    <Dialog open={!!selected} onOpenChange={value => !value && setSelected(null)} title={`Edit ${selected?.slug === 'team' ? 'team kit' : 'custom'} section`} icon="pen" variant="request" contentKey={selected?.slug}>
      {selectedDraft && <div className="editor-form"><label>Campaign heading<input value={selectedDraft.heading} onChange={event => updateSelected('heading', event.target.value)} data-testid="input-campaign-heading" /></label><label>Website copy<textarea value={selectedDraft.copy} onChange={event => updateSelected('copy', event.target.value)} rows={4} data-testid="input-campaign-copy" /></label><div className="offer-lock"><span>Starting offer</span><b>{selectedDraft.startsFrom} TK</b><small>{selectedDraft.slug === 'custom' ? 'Custom design inquiries only' : 'Team kit inquiries only'} · offer is not a fixed price for every item.</small></div><p className="preview-callout">Changes appear only in this local preview and will be lost on refresh. Nothing is saved or published.</p><Button variant="outline" size="small" onClick={() => { setSelected(null); setNotice('Copy updated in local preview only — nothing was saved or published.'); }} data-testid="button-finish-campaign-edit">Done with preview edit</Button></div>}
    </Dialog>
    <Dialog open={!!preview} onOpenChange={value => !value && setPreview(null)} title="Campaign section preview" icon="grid" variant="wide" contentKey={preview?.slug}>
      {preview && <div className={`preview-site preview-site-${preview.slug}`}><span className="eyebrow">{preview.slug === 'custom' ? 'CUSTOM JERSEYS' : 'TEAM KITS'}</span><h2>{preview.heading}</h2><p>{preview.copy}</p><div className="preview-start">Starting from <b>{preview.startsFrom} TK</b></div><p className="preview-note">Sample starting offer; not every product's fixed price.</p><Button variant="outline" size="small" onClick={() => setPreview(null)} data-testid="button-close-campaign-preview">Close preview</Button></div>}
    </Dialog>
  </>;
}

function Locations() {
  const [filter, setFilter] = useState('All locations');
  const entries = locations.filter(item => filter === 'All locations' || item.kind === filter);
  return <>
    <PageHeading eyebrow="STUDIO DIRECTORY" title="Locations" desc="Illustrative outlet and factory details for workspace planning. Verify details before any customer use." action={<span className="count-pill">03 sample locations</span>} />
    <div className="locations-intro"><div><span className="eyebrow">BANGLADESH OPERATIONS</span><h2>People, product, place.</h2><p>These fictional directory records show the kind of information a connected admin workspace may organize.</p></div><div className="location-filter" role="group" aria-label="Filter locations">{['All locations', 'Outlet', 'Factory'].map(value => <Button key={value} variant="filter" active={filter === value} size="small" onClick={() => setFilter(value)} data-testid={`filter-location-${value.toLowerCase().replace(' ', '-')}`}>{value}</Button>)}</div></div>
    <div className="location-grid">{entries.map((item, index) => <Panel className="location-card" key={item.id} ><div className={`location-illustration location-pattern-${index}`}><span className="location-kind"><Icon name={item.kind === 'Factory' ? 'factory' : 'store'} />{item.kind}</span><div className="location-symbol"><Icon name={item.kind === 'Factory' ? 'factory' : 'store'} /></div><span className="location-coord">MY JERSEY · SAMPLE SITE</span></div><div className="location-details"><div className="location-title"><h3>{item.label}</h3><span className="status-dot"><i />{item.status}</span></div><p><Icon name="pin" />{item.address}</p><div className="location-meta"><span>REFERENCE ID</span><b>{item.id}</b><span>RECORD STATUS</span><b>Illustrative only</b></div><span className="location-sample">SAMPLE / NOT CONNECTED</span></div></Panel>)}</div>
    <div className="catalog-note location-notice"><Icon name="file" /><span>Contact details, opening hours, map pins, and directions are intentionally not included: these sample places are not verified business addresses.</span></div>
  </>;
}

function Settings() {
  const [expanded, setExpanded] = useState('future');
  return <>
    <PageHeading eyebrow="WORKSPACE FOUNDATION" title="Settings" desc="This prototype has no account, integrations, or persistent application data." />
    <Panel className="settings-hero"><div className="settings-shield"><Icon name="lock" /></div><div><span className="eyebrow">PLANNED FOR A LATER PHASE</span><h2>Protected access, when the workspace is ready.</h2><p>Supabase and protected admin access are future considerations. This prototype is public, local-state only, and should contain no real customer or business-sensitive information.</p></div><span className="planned-chip">NOT CONFIGURED</span></Panel>
    <div className="settings-grid">{[['future', 'What is planned?', 'A future phase may add protected admin access and Supabase-backed workspace data after access rules, privacy practices, and operations are agreed.'], ['now', 'What works in this prototype?', 'Navigation, search, filters, preview dialogs, and copy or visibility edits operate only in browser memory. Refreshing restores the fictional sample values.'], ['not-included', 'What is not included?', 'There are no credentials, customer contact details, payment data, API calls, database connections, publishing actions, or confirmed orders.']].map(([id, title, copy]) => <Panel className={`settings-item ${expanded === id ? 'is-expanded' : ''}`} key={id}><Button variant="outline" className="settings-toggle" aria-expanded={expanded === id} onClick={() => setExpanded(expanded === id ? '' : id)} data-testid={`button-settings-${id}`}><span><span className="eyebrow">0{id === 'future' ? '1' : id === 'now' ? '2' : '3'}</span><b>{title}</b></span><Icon name={expanded === id ? 'minus' : 'plus'} /></Button>{expanded === id && <p>{copy}</p>}</Panel>)}</div>
    <div className="settings-foot"><Icon name="file" /><span><b>Sample mode is always visible.</b> Do not treat prototype screens as an operational source of truth.</span></div>
  </>;
}

function NotFound() {
  const [, setLocation] = useLocation();
  return <div className="not-found"><span className="eyebrow">PAGE NOT FOUND</span><h1>This page is outside the workspace.</h1><p>Return to the overview to continue exploring this local prototype.</p><Button variant="primary" onClick={() => setLocation('/')} data-testid="button-return-overview">Back to overview <Icon name="arrow" /></Button></div>;
}

function RoutedPages() {
  return <Shell><Switch>
    <Route path="/" component={Overview} />
    <Route path="/requests"><InquiryPage kind="custom" /></Route>
    <Route path="/team-requests"><InquiryPage kind="team" /></Route>
    <Route path="/jerseys" component={JerseyCatalog} />
    <Route path="/storefront" component={Storefront} />
    <Route path="/locations" component={Locations} />
    <Route path="/settings" component={Settings} />
    <Route component={NotFound} />
  </Switch></Shell>;
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><RoutedPages /></WouterRouter>;
}

export default App;
