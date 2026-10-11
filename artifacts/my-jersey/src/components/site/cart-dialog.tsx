import { useState } from 'react';
import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { Dialog } from '@workspace/my-jersey-design/components/ui/dialog';
import { Icon } from '@workspace/my-jersey-design/components/ui/icon';
import { JerseyPreview } from '@workspace/my-jersey-design/components/ui/jersey-preview';
import type { Commerce } from '@/hooks/use-commerce';
import { SIZES, type JerseySize, type OrderDraft } from '@/lib/commerce';
import { ALL } from '@/data/catalog';
import { getJerseyReference } from '@/data/jersey-references';
import { fmt } from '@/lib/brand';
import { Notice, PreparedPanel, StorageNotice } from './order-ui';

type Props = { commerce: Commerce; onClose: () => void; onProfile: () => void; onTrack: () => void };

export function CartDialog({ commerce: c, onClose, onProfile, onTrack }: Props) {
  const [error, setError] = useState('');
  const [prepared, setPrepared] = useState<OrderDraft | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const run = (fn: () => void) => { setError(''); setPrepared(null); try { fn(); } catch (e) { setError(e instanceof Error ? e.message : 'That change could not be made.'); } };
  const close = (o: boolean) => { if (!o) onClose(); };
  const p = c.profile;

  if (!c.cart.length) {
    return <Dialog open icon="cart" contentKey="cart-empty" onOpenChange={close} title="Your cart is empty" description="Pick a ready jersey from the collections, choose a size, and it will wait here on this device.">
      <StorageNotice error={c.storageError} />
      <div className="mo-row is-center"><Button href="#shop" onClick={onClose} data-testid="link-browse-collections">Browse collections <Icon name="arrow" /></Button><Button variant="outline" onClick={onClose}>Close</Button></div>
    </Dialog>;
  }

  return (
    <Dialog open variant="wide" contentKey="cart" onOpenChange={close} title={`Your cart · ${c.cartCount} item${c.cartCount === 1 ? '' : 's'}`} className="mo">
      <ul className="cl" data-testid="list-cart">
        {c.cart.map((line) => {
          const product = ALL[line.productId];
          if (!product) return null;
          const photo = getJerseyReference(product.id);
          return (
            <li key={line.key} className="cl-row" data-testid={`row-cart-${line.key}`}>
              <div className="cl-thumb">{photo ? <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" /> : <JerseyPreview base={product.base} accent={product.accent} number="10" name={product.name.split(' ')[0].toUpperCase()} />}</div>
              <div className="cl-info">
                <b>{product.name}</b>
                <span>{product.category} · {fmt(product.price)} each</span>
                {!product.inStock && <span className="cl-warn">Currently unavailable. Remove it to continue.</span>}
              </div>
              <label className="mjf cl-size">Size
                <select value={line.size} onChange={(e) => run(() => c.updateSize(line.key, e.target.value as JerseySize))} data-testid={`select-size-${line.key}`}>
                  {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>
              <div className="cl-qty" role="group" aria-label={`Quantity for ${product.name}`}>
                <button type="button" aria-label="Decrease quantity" disabled={line.quantity <= 1} onClick={() => run(() => c.updateQuantity(line.key, line.quantity - 1))} data-testid={`button-dec-${line.key}`}><Icon name="minus" /></button>
                <output data-testid={`text-qty-${line.key}`}>{line.quantity}</output>
                <button type="button" aria-label="Increase quantity" onClick={() => run(() => c.updateQuantity(line.key, line.quantity + 1))} data-testid={`button-inc-${line.key}`}><Icon name="plus" /></button>
              </div>
              <b className="cl-line">{fmt(product.price * line.quantity)}</b>
              <button type="button" className="cl-rm" aria-label={`Remove ${product.name}, size ${line.size}`} onClick={() => run(() => c.removeItem(line.key))} data-testid={`button-remove-${line.key}`}><Icon name="trash" /></button>
            </li>
          );
        })}
      </ul>

      <div className="cl-foot">
        <div className="cl-contact">
          <small>Order contact</small>
          {p.name && p.phone ? <p data-testid="text-cart-contact"><b>{p.name}</b> · {p.phone}{p.address ? <><br />{p.address}</> : null}</p> : <p>Add your name and phone so we know who to reply to.</p>}
          <Button variant="outline" size="small" onClick={onProfile} data-testid="button-cart-profile"><Icon name="user" />{p.name ? 'Edit profile' : 'Add contact details'}</Button>
        </div>
        <div className="cl-total">
          <div><span>Item subtotal</span><b data-testid="text-subtotal">{fmt(c.subtotal)}</b></div>
          <p>Shipping is not included. Delivery charge, final total and payment method are confirmed with our team on WhatsApp. No payment is taken on this website.</p>
        </div>
      </div>

      {error && <Notice tone="error" testId="text-cart-error">{error}</Notice>}
      <StorageNotice error={c.storageError} />
      {prepared ? <PreparedPanel draft={prepared} onTrack={onTrack} /> : (
        <div className="mo-nav">
          {confirmClear
            ? <span className="mo-row"><Button variant="outline" size="small" onClick={() => { c.clearCart(); setConfirmClear(false); }} data-testid="button-confirm-clear">Yes, empty cart</Button><Button variant="outline" size="small" onClick={() => setConfirmClear(false)}>Keep items</Button></span>
            : <Button variant="outline" size="small" onClick={() => setConfirmClear(true)} data-testid="button-clear-cart"><Icon name="trash" />Clear cart</Button>}
          <Button onClick={() => run(() => setPrepared(c.prepareCartOrder()))} data-testid="button-checkout"><Icon name="wa" />Checkout on WhatsApp</Button>
        </div>
      )}
    </Dialog>
  );
}
