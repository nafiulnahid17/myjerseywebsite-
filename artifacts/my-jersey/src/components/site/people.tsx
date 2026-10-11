import { Link } from 'wouter';
import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { Icon } from '@workspace/my-jersey-design/components/ui/icon';
import { BrandLogo } from '@workspace/my-jersey-design/components/ui/brand-logo';
import { DESIGNER, DESIGNER_MAIL, FACEBOOK, FOUNDER, STUDIO_MAIL, type Person } from '@/data/catalog';
import { media, srcset2 } from '@/lib/brand';

const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

type Place = { key: string; label: string; title: string; place: string; text: string; icon: 'store' | 'factory'; alt: string; query: string };
const PLACES: Place[] = [
  { key: 'outlet', label: 'Outlet', title: 'The Outlet', place: 'Chapai Nawabganj', icon: 'store', query: 'My Jersey Chapai Nawabganj',
    text: 'Our storefront, where teams come to talk through colours, fabrics and sizing in person.', alt: 'My Jersey outlet storefront in Chapai Nawabganj at sunset' },
  { key: 'factory', label: 'Factory', title: 'The Factory', place: 'Mirpur DOHS, Dhaka, Bangladesh', icon: 'factory', query: 'Mirpur DOHS Dhaka',
    text: 'Our garment manufacturing unit, where approved artwork becomes finished team kits.', alt: 'My Jersey garment manufacturing unit in Dhaka' },
];

export function Places({ onWa }: { onWa: (p: Person) => void }) {
  return (
    <section id="places" className="pl-sec"><div className="w">
      <div className="sec-head">
        <div><span className="eb">Visit us</span><h2>Our Outlet <em>&amp;</em> Factory</h2></div>
        <p className="sub">From the first conversation at our outlet to the final stitch in Dhaka, your kit stays with one team. Message us before you visit so the right person is there to meet you.</p>
      </div>
      <div className="pl-grid">
        {PLACES.map((p, i) => (
          <article key={p.key} className="pl rv" data-testid={`card-place-${p.key}`}>
            <figure>
              <img src={media(`${p.key}-768.webp`)} srcSet={srcset2(p.key)} sizes="(max-width:900px) 92vw, 600px" width={2048} height={1365} loading="lazy" decoding="async" alt={p.alt} />
              <figcaption><span>{String(i + 1).padStart(2, '0')}</span>{p.label}</figcaption>
            </figure>
            <div className="pl-body">
              <span className="pl-ic"><Icon name={p.icon} /></span>
              <div>
                <h3>{p.title}</h3>
                <p className="pl-place"><Icon name="pin" />{p.place}</p>
                <p>{p.text}</p>
                <div className="pl-ac">
                  <Button variant="outline" size="small" href={maps(p.query)} target="_blank" rel="noopener noreferrer"><Icon name="pin" />Open in Maps</Button>
                  <Button variant="outline" size="small" onClick={() => onWa(FOUNDER)}><Icon name="wa" />Ask before visiting</Button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div></section>
  );
}

type Contact = { onWa: (p: Person) => void; onMail: (a: string) => void };

export function Team({ onWa, onMail }: Contact) {
  return (
    <section id="team"><div className="w">
      <div className="sec-head">
        <div><span className="eb">The people</span><h2>Behind <em>My Jersey</em></h2></div>
        <p className="sub">A small studio means you speak directly with the people who lead the business and draw your kit.</p>
      </div>
      <div className="pp-grid">
        <article className="pp rv" data-testid="card-person-founder">
          <figure className="pp-ph"><img src={media('founder-768.webp')} srcSet={srcset2('founder')} sizes="(max-width:620px) 88vw, 240px" width={2048} height={2458} loading="lazy" decoding="async" alt="Mohidul Islam Jim" /></figure>
          <div className="pp-body">
            <small>{FOUNDER.role}</small>
            <h3>{FOUNDER.name}</h3>
            <p>Your first contact for team orders, quotes and visits to the outlet.</p>
            <dl><dt>WhatsApp</dt><dd>{FOUNDER.number}</dd></dl>
            <div className="mj-actions">
              <Button size="small" onClick={() => onWa(FOUNDER)} data-testid="button-wa-founder"><Icon name="wa" />WhatsApp</Button>
              <Button variant="outline" size="small" href={`tel:${FOUNDER.number}`}><Icon name="phone" />Call</Button>
            </div>
          </div>
        </article>
        <article className="pp rv" data-testid="card-person-designer">
          <figure className="pp-ph"><img src={media('designer-768.webp')} srcSet={srcset2('designer')} sizes="(max-width:620px) 88vw, 240px" width={2048} height={2048} loading="lazy" decoding="async" alt="Omor Faruk" /></figure>
          <div className="pp-body">
            <small>{DESIGNER.role}</small>
            <h3>{DESIGNER.name}</h3>
            <p>Shapes your idea, logo and numbering into artwork and confirms it with you before production.</p>
            <dl><dt>WhatsApp</dt><dd>{DESIGNER.number}</dd><dt>Email</dt><dd>{DESIGNER_MAIL}</dd></dl>
            <div className="mj-actions">
              <Button size="small" onClick={() => onWa(DESIGNER)} data-testid="button-wa-designer"><Icon name="wa" />WhatsApp</Button>
              <Button variant="outline" size="small" onClick={() => onMail(DESIGNER_MAIL)} data-testid="button-mail-designer"><Icon name="mail" />Send Mail</Button>
            </div>
          </div>
        </article>
      </div>
    </div></section>
  );
}

export function ContactSection({ onWa, onMail, onTeamOrder }: Contact & { onTeamOrder: () => void }) {
  return (
    <section id="contact" className="cx-sec"><div className="w">
      <div className="cx rv">
        <div className="cx-intro">
          <span className="eb">Contact</span>
          <h2>Let’s Make <em>Your Jersey</em></h2>
          <p>Share your idea, a sketch or a photo of a kit you love. We reply on WhatsApp, talk through design, fabric and sizing, and confirm the artwork with you before anything is made.</p>
          <div className="cx-cta">
            <Button onClick={onTeamOrder} data-testid="button-contact-team-order">Order for your Team <Icon name="arrow" /></Button>
            <Button variant="outline" onClick={() => onWa(FOUNDER)}><Icon name="wa" />Chat now</Button>
          </div>
        </div>
        <div className="ct">
          <button type="button" onClick={() => onWa(FOUNDER)} data-testid="button-contact-founder"><span className="k wa"><Icon name="wa" /></span><small>Number 1 · Founder</small><b>{FOUNDER.number}</b></button>
          <button type="button" onClick={() => onWa(DESIGNER)} data-testid="button-contact-designer"><span className="k wa"><Icon name="wa" /></span><small>Number 2 · Designer</small><b>{DESIGNER.number}</b></button>
          <button type="button" onClick={() => onMail(STUDIO_MAIL)} data-testid="button-contact-mail"><span className="k ml"><Icon name="mail" /></span><small>Email</small><b>{STUDIO_MAIL.split('@')[0]}<wbr />@{STUDIO_MAIL.split('@')[1]}</b></button>
          <a href={FACEBOOK} target="_blank" rel="noopener" data-testid="link-facebook"><span className="k fb"><Icon name="fb" /></span><small>Facebook page</small><b>My Jersey</b></a>
          <div className="ct-loc"><span className="k loc"><Icon name="pin" /></span><small>Outlet · Factory</small><b>Chapai Nawabganj · Mirpur DOHS, Dhaka</b></div>
        </div>
      </div>
    </div></section>
  );
}

export function Footer() {
  return (
    <footer className="site">
      <div className="ff">
        <div className="ff-brand">
          <BrandLogo size="large" />
          <p>Custom sportswear studio. Outlet in Chapai Nawabganj, factory in Mirpur DOHS, Dhaka.</p>
        </div>
        <nav aria-label="Footer">
          <a href="#works">Our works</a><a href="#team-order">For your Team</a><a href="#shop">Collections</a><a href="#places">Outlet &amp; Factory</a><a href="#contact">Contact</a>
        </nav>
      </div>
      <hr />
      <img className="al" src={media('atherious-labs-768.webp')} srcSet={srcset2('atherious-labs')} sizes="64px" width={2048} height={2066} loading="lazy" decoding="async" alt="Atherious Labs" />
      <p>This website is created by <b>Atherious Labs</b></p>
      <p>Wanna make yours? Contact · <a href="mailto:contact@atheriouslabs.com">contact@atheriouslabs.com</a> · <a href="https://www.atheriouslabs.com" target="_blank" rel="noopener">www.atheriouslabs.com</a></p>
      <hr />
      <p className="ff-legal">© My Jersey 2026–2030 · Crafted for champions <span aria-hidden="true">·</span> <Link href="/admin" className="ff-admin" data-testid="link-admin">Studio admin</Link></p>
    </footer>
  );
}
