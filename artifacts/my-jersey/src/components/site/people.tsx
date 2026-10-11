import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { Icon } from '@workspace/my-jersey-design/components/ui/icon';
import { DESIGNER, DESIGNER_MAIL, FACEBOOK, FOUNDER, STUDIO_MAIL, type Person } from '@/data/catalog';
import { media, srcset2 } from '@/lib/brand';

export function Places() {
  return (
    <section id="places" style={{ background: 'var(--bg2)' }}><div className="w">
      <span className="eb">Visit us</span><h2>Our Outlet &amp; Factory</h2>
      <div className="two">
        <div className="ph rv"><figure><img src={media('outlet-768.webp')} srcSet={srcset2('outlet')} sizes="(max-width:900px) 92vw, 580px" width={2048} height={1365} loading="lazy" decoding="async" alt="My Jersey outlet storefront in Chapai Nawabganj at sunset" /></figure><div><Icon name="store" /><div><h3>Outlet</h3><p>Chapai Nawabganj</p></div></div></div>
        <div className="ph rv"><figure><img src={media('factory-768.webp')} srcSet={srcset2('factory')} sizes="(max-width:900px) 92vw, 580px" width={2048} height={1365} loading="lazy" decoding="async" alt="My Jersey garment manufacturing unit in Dhaka" /></figure><div><Icon name="factory" /><div><h3>Factory</h3><p>Mirpur DOHS, Dhaka, Bangladesh</p></div></div></div>
      </div>
    </div></section>
  );
}

type Contact = { onWa: (p: Person) => void; onMail: (a: string) => void };

export function Team({ onWa, onMail }: Contact) {
  return (
    <section id="team"><div className="w">
      <span className="eb">The people</span><h2>Behind My Jersey</h2>
      <div className="two">
        <div className="fd rv">
          <img className="fp" src={media('founder-768.webp')} srcSet={srcset2('founder')} sizes="180px" width={2048} height={2458} loading="lazy" decoding="async" alt="Mohidul Islam Jim" />
          <div><h3>Mohidul Islam Jim</h3><p>Founder &amp; CEO</p>
            <div className="mj-actions"><Button size="small" onClick={() => onWa(FOUNDER)}><Icon name="wa" />WhatsApp</Button></div></div>
        </div>
        <div className="fd rv">
          <div className="av"><i /><img src={media('designer-768.webp')} srcSet={srcset2('designer')} sizes="172px" width={2048} height={2048} loading="lazy" decoding="async" alt="Omor Faruk" /></div>
          <div><h3>Omor Faruk</h3><p>Designer, My Jersey</p>
            <div className="mj-actions">
              <Button size="small" onClick={() => onWa(DESIGNER)}><Icon name="wa" />WhatsApp</Button>
              <Button variant="outline" size="small" onClick={() => onMail(DESIGNER_MAIL)}><Icon name="mail" />Send Mail</Button>
            </div></div>
        </div>
      </div>
    </div></section>
  );
}

export function ContactSection({ onWa, onMail }: Contact) {
  return (
    <section id="contact" style={{ background: 'var(--bg2)' }}><div className="w">
      <span className="eb">Contact</span><h2>Let's Make Your Jersey</h2>
      <div className="ct">
        <a href={FACEBOOK} target="_blank" rel="noopener"><span className="k fb"><Icon name="fb" /></span><small>Facebook page</small><b>My Jersey</b></a>
        <button type="button" onClick={() => onMail(STUDIO_MAIL)}><span className="k ml"><Icon name="mail" /></span><small>Email</small><b>{STUDIO_MAIL}</b></button>
        <button type="button" onClick={() => onWa(FOUNDER)}><span className="k wa"><Icon name="wa" /></span><small>Number 1 · Founder</small><b>{FOUNDER.number}</b></button>
        <button type="button" onClick={() => onWa(DESIGNER)}><span className="k wa"><Icon name="wa" /></span><small>Number 2 · Designer</small><b>{DESIGNER.number}</b></button>
      </div>
    </div></section>
  );
}

export function Footer() {
  return (
    <footer className="site">
      <img className="fl" src={media('my-jersey-logo-768.webp')} srcSet={srcset2('my-jersey-logo')} sizes="260px" width={2048} height={682} loading="lazy" decoding="async" alt="My Jersey" />
      <hr />
      <img className="al" src={media('atherious-labs-768.webp')} srcSet={srcset2('atherious-labs')} sizes="64px" width={2048} height={2066} loading="lazy" decoding="async" alt="Atherious Labs" />
      <p>This website is created by <b>Atherious Labs</b></p>
      <p>Wanna make yours? Contact · <a href="mailto:contact@atheriouslabs.com">contact@atheriouslabs.com</a> · <a href="https://www.atheriouslabs.com" target="_blank" rel="noopener">www.atheriouslabs.com</a></p>
      <hr />
      <p>© My Jersey 2026–2030 · Crafted for champions</p>
    </footer>
  );
}
