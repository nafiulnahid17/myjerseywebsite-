/** Device-side shopping preferences and request drafts, NOT a paid-order ledger. */
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'] as const;
export type JerseySize = typeof SIZES[number];
export type CartLine = { key: string; productId: string; size: JerseySize; quantity: number };
export type CustomerProfile = { name: string; phone: string; email: string; address: string; team: string; preferredSize: JerseySize };
export type TeamOrderInput = { team: string; contactName: string; phone: string; email: string; quantity: number; sizes: string; details: string; designName: string; designReference: string };
export type OrderDraft = { id: string; createdAt: string; kind: 'team' | 'cart'; summary: string; quantity: number; subtotal: number | null; message: string; designName: string };
export type CommerceSnapshot = { version: 1; cart: CartLine[]; profile: CustomerProfile; drafts: OrderDraft[] };
type Catalog = Record<string, { id: string; name: string; price: number; inStock: boolean }>;

export const EMPTY_PROFILE: CustomerProfile = { name: '', phone: '', email: '', address: '', team: '', preferredSize: 'M' };
export const MAX_QUANTITY = 500;
export const STORAGE_KEY = 'my-jersey:commerce:v1';
export const emptyCommerce = (): CommerceSnapshot => ({ version: 1, cart: [], profile: { ...EMPTY_PROFILE }, drafts: [] });
const text = (value: unknown, max: number) => typeof value === 'string' ? value.replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, '').trim().slice(0, max) : '';
const record = (value: unknown): Record<string, unknown> => value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
const isSize = (value: unknown): value is JerseySize => typeof value === 'string' && (SIZES as readonly string[]).includes(value);
const quantityValid = (n: unknown): n is number => Number.isInteger(n) && Number(n) >= 1 && Number(n) <= MAX_QUANTITY;
const hasProduct = (catalog: Catalog, id: string) => Object.prototype.hasOwnProperty.call(catalog, id);
const money = (n: number) => '৳' + n.toLocaleString('en-US');
const phoneValid = (phone: string) => /^\+?[\d\s()-]+$/.test(phone) && phone.replace(/\D/g, '').length >= 7 && phone.replace(/\D/g, '').length <= 15;

export function validateProfile(p: CustomerProfile): string | null {
  if (p.name.trim() && (p.name.trim().length < 2 || p.name.length > 80)) return 'Your name must be between 2 and 80 characters.';
  if (p.phone.trim() && (p.phone.length > 30 || !phoneValid(p.phone.trim()))) return 'Enter a valid phone number with 7–15 digits.';
  if (p.email.trim() && (p.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email.trim()))) return 'Enter a valid email address.';
  if (p.address.length > 400) return 'Keep your delivery address within 400 characters.';
  if (p.team.length > 80) return 'Keep your team name within 80 characters.';
  if (!isSize(p.preferredSize)) return 'Choose a supported jersey size.';
  return null;
}

export function cleanProfile(value: unknown): CustomerProfile {
  const p = record(value);
  return { name: text(p.name, 80), phone: text(p.phone, 30), email: text(p.email, 254), address: text(p.address, 400), team: text(p.team, 80), preferredSize: isSize(p.preferredSize) ? p.preferredSize : 'M' };
}

export function normalizeCart(value: unknown, catalog: Catalog): CartLine[] {
  if (!Array.isArray(value)) return [];
  const lines = new Map<string, CartLine>();
  let count = 0;
  for (const raw of value.slice(0, MAX_QUANTITY)) {
    const item = record(raw);
    const id = text(item.productId, 40);
    if (!hasProduct(catalog, id) || !isSize(item.size) || !quantityValid(item.quantity)) continue;
    const key = `${id}:${item.size}`;
    const quantity = Math.min(item.quantity, MAX_QUANTITY - count);
    if (!quantity) break;
    const existing = lines.get(key);
    lines.set(key, { key, productId: id, size: item.size, quantity: quantity + (existing?.quantity ?? 0) });
    count += quantity;
  }
  return [...lines.values()];
}

/** Only known SKU + size + quantity are stored; prices always come from the catalog. */
export function cartTotals(cart: CartLine[], catalog: Catalog) {
  return cart.reduce((total, line) => ({
    count: total.count + line.quantity,
    subtotal: total.subtotal + (hasProduct(catalog, line.productId) ? catalog[line.productId].price * line.quantity : 0),
  }), { count: 0, subtotal: 0 });
}

export function addCartItem(cart: CartLine[], catalog: Catalog, productId: string, size: JerseySize): CartLine[] | null {
  if (!hasProduct(catalog, productId) || !catalog[productId].inStock || !isSize(size) || cartTotals(cart, catalog).count >= MAX_QUANTITY) return null;
  return normalizeCart([...cart, { key: `${productId}:${size}`, productId, size, quantity: 1 }], catalog);
}

export function changeCartQuantity(cart: CartLine[], key: string, quantity: number, catalog: Catalog): CartLine[] {
  if (!cart.some((line) => line.key === key)) throw new Error('That item is no longer in your bag.');
  if (!quantityValid(quantity)) throw new Error('Choose a quantity between 1 and 500. Use Remove to delete an item.');
  const next = cart.map((line) => line.key === key ? { ...line, quantity } : line);
  if (cartTotals(next, catalog).count > MAX_QUANTITY) throw new Error('A request can include up to 500 jerseys. Contact us for a larger order.');
  return next;
}

export function changeCartSize(cart: CartLine[], key: string, size: JerseySize, catalog: Catalog): CartLine[] {
  if (!isSize(size)) throw new Error('Choose a supported jersey size.');
  if (!cart.some((line) => line.key === key)) throw new Error('That item is no longer in your bag.');
  return normalizeCart(cart.map((line) => line.key === key ? { ...line, size } : line), catalog);
}

export function readCommerce(raw: string | null, catalog: Catalog): CommerceSnapshot {
  if (!raw) return emptyCommerce();
  const state = record(JSON.parse(raw));
  if (state.version !== 1 || !Array.isArray(state.cart) || !Array.isArray(state.drafts)) throw new Error('Stored shopping preferences need to be reset.');
  const profile = cleanProfile(state.profile);
  if (validateProfile(profile)) throw new Error('Stored profile details are invalid.');
  const drafts = state.drafts.map((value) => {
    const d = record(value);
    if (typeof d.id !== 'string' || !/^MJ-\d{4}-[A-F0-9]{12}$/.test(d.id) || !['team', 'cart'].includes(String(d.kind)) || !quantityValid(d.quantity) ||
      typeof d.createdAt !== 'string' || !Number.isFinite(Date.parse(d.createdAt)) || typeof d.message !== 'string' || !d.message.trim() ||
      typeof d.summary !== 'string' || typeof d.designName !== 'string' ||
      !(d.subtotal === null || (typeof d.subtotal === 'number' && Number.isFinite(d.subtotal) && d.subtotal >= 0))) {
      throw new Error('Stored request history could not be read.');
    }
    return { id: d.id, createdAt: d.createdAt, kind: d.kind, summary: text(d.summary, 160), quantity: d.quantity, subtotal: d.subtotal, message: text(d.message, 16000), designName: text(d.designName, 255) } as OrderDraft;
  });
  return { version: 1, cart: normalizeCart(state.cart, catalog), profile, drafts };
}

function customerBlock(p: CustomerProfile): string {
  return [`Name: ${p.name}`, `Phone: ${p.phone}`, p.email && `Email: ${p.email}`, p.team && `Team: ${p.team}`, p.address && `Delivery address: ${p.address}`].filter(Boolean).join('\n');
}

function contactRequired(p: CustomerProfile) {
  const error = validateProfile(p);
  if (error) throw new Error(error);
  if (!p.name.trim()) throw new Error('Add your name in Profile before preparing your order.');
  if (!p.phone.trim()) throw new Error('Add your phone number in Profile before preparing your order.');
}

function draftBase(kind: OrderDraft['kind']) {
  const now = new Date();
  return { id: `MJ-${now.getUTCFullYear()}-${crypto.randomUUID().replace(/-/g, '').slice(0, 12).toUpperCase()}`, createdAt: now.toISOString(), kind };
}

export function createCartDraft(cart: CartLine[], profile: CustomerProfile, catalog: Catalog): OrderDraft {
  if (!cart.length) throw new Error('Add a jersey to your bag first.');
  contactRequired(profile);
  for (const line of cart) {
    if (!hasProduct(catalog, line.productId) || !catalog[line.productId].inStock) throw new Error(`${catalog[line.productId]?.name ?? 'An item'} is unavailable. Remove it before continuing.`);
    if (!quantityValid(line.quantity) || !isSize(line.size)) throw new Error('Check the quantity and size of each jersey.');
  }
  const { count, subtotal } = cartTotals(cart, catalog);
  if (count > MAX_QUANTITY) throw new Error('A request can include up to 500 jerseys.');
  const base = draftBase('cart');
  const lines = cart.map((line) => `${catalog[line.productId].name} · ${line.size} × ${line.quantity} — ${money(catalog[line.productId].price * line.quantity)}`);
  return {
    ...base, summary: cart.length === 1 ? catalog[cart[0].productId].name : `${cart.length} jersey selections`, quantity: count, subtotal, designName: '',
    message: `Hello My Jersey! I would like to place an order.\nRequest reference: ${base.id}\n\n${lines.join('\n')}\n\nItem subtotal: ${money(subtotal)}\n${customerBlock(cleanProfile(profile))}\n\nPlease confirm stock, sizing, delivery charges, final total and payment arrangements before confirming my order.`,
  };
}

export function createTeamDraft(input: TeamOrderInput): OrderDraft {
  if (!input.team.trim() || input.team.length > 80) throw new Error('Enter a team name, up to 80 characters.');
  if (!quantityValid(input.quantity)) throw new Error('Enter a whole-number quantity between 1 and 500.');
  if (input.sizes.length > 240 || input.details.length > 1000 || input.designReference.length > 200 || input.designName.length > 255) throw new Error('Your design details are too long. Shorten them before continuing.');
  const profile: CustomerProfile = { ...EMPTY_PROFILE, name: input.contactName, phone: input.phone, email: input.email, team: input.team };
  contactRequired(profile);
  const base = draftBase('team');
  const designName = text(input.designName, 255);
  return {
    ...base, summary: text(input.team, 80), quantity: input.quantity, subtotal: null, designName,
    message: `Hello My Jersey! I would like to order jerseys for my team.\nRequest reference: ${base.id}\n\n${customerBlock(cleanProfile(profile))}\nQuantity: ${input.quantity}\nSizes: ${text(input.sizes, 240) || 'To be confirmed'}\nDesign: ${text(input.designReference, 200) || 'Custom design / designer assistance'}\n${designName ? `Reference file: ${designName} (I will attach this file in WhatsApp)\n` : ''}${input.details.trim() ? `Details: ${text(input.details, 1000)}\n` : ''}\nI saw team jerseys starting from 299TK. Please confirm the final quote for my design, fabric and quantity, artwork, delivery and payment before production. This is a request, not a confirmed or paid order.`,
  };
}

export function orderStatusMessage(reference: string): string {
  const ref = text(reference, 80);
  if (!ref || ref.length < 3) throw new Error('Enter your request or order reference.');
  return `Hello My Jersey! Please check the status of my jersey request / order: ${ref}. Please share the confirmed production or delivery update.`;
}
