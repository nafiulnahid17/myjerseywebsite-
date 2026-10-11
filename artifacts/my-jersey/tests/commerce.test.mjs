import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EMPTY_PROFILE, emptyCommerce, readCommerce, normalizeCart, addCartItem, changeCartSize,
  changeCartQuantity, cartTotals, createCartDraft, createTeamDraft, validateProfile, orderStatusMessage,
} from '../src/lib/commerce.ts';
import { validateDesignFile, MAX_DESIGN_BYTES } from '../src/lib/design-file.ts';

const catalog = {
  fb0: { id: 'fb0', name: 'Bangladesh Fan Edition', price: 1450, inStock: true },
  fb1: { id: 'fb1', name: 'Argentina Sky Edition', price: 1550, inStock: true },
  fb2: { id: 'fb2', name: 'Unavailable kit', price: 1550, inStock: false },
};
const profile = { ...EMPTY_PROFILE, name: 'Test Customer', phone: '01700000000', email: 'customer@example.com' };
const one = () => addCartItem([], catalog, 'fb0', 'M');

test('known SKU prices only; unknown IDs, invalid sizes and quantities are rejected', () => {
  const cart = normalizeCart([
    { productId: 'fb0', size: 'M', quantity: 2, price: 1, key: 'evil' },
    { productId: 'missing', size: 'M', quantity: 1 },
    { productId: '__proto__', size: 'M', quantity: 1 },
    { productId: 'fb0', size: 'HUGE', quantity: 1 },
    { productId: 'fb1', size: 'M', quantity: -1 },
  ], catalog);
  assert.deepEqual(cart, [{ key: 'fb0:M', productId: 'fb0', size: 'M', quantity: 2 }]);
  assert.deepEqual(cartTotals(cart, catalog), { count: 2, subtotal: 2900 });
});

test('same SKU/size combines; different size stays distinct and merges on resize', () => {
  const second = addCartItem(one(), catalog, 'fb0', 'L');
  const third = addCartItem(second, catalog, 'fb0', 'M');
  assert.equal(third.length, 2);
  assert.equal(third[0].quantity, 2);
  const merged = changeCartSize(third, 'fb0:L', 'M', catalog);
  assert.equal(merged.length, 1);
  assert.equal(merged[0].quantity, 3);
});

test('stock-out items and requests beyond 500 cannot be added', () => {
  assert.equal(addCartItem([], catalog, 'fb2', 'M'), null);
  assert.equal(addCartItem([], catalog, 'toString', 'M'), null);
  const full = changeCartQuantity(one(), 'fb0:M', 500, catalog);
  assert.equal(addCartItem(full, catalog, 'fb1', 'S'), null);
  for (const invalid of [0, -1, 0.5, 501, NaN, Infinity]) assert.throws(() => changeCartQuantity(one(), 'fb0:M', invalid, catalog));
});

test('profile validation accepts optional fields and blocks malformed supplied details', () => {
  assert.equal(validateProfile(EMPTY_PROFILE), null);
  assert.equal(validateProfile(profile), null);
  assert.match(validateProfile({ ...profile, email: 'bad' }), /email/);
  assert.match(validateProfile({ ...profile, phone: '123' }), /phone/);
});

test('cart handoff includes variant, quantity, current total and requests confirmation, never payment success', () => {
  const draft = createCartDraft(changeCartQuantity(one(), 'fb0:M', 3, catalog), profile, catalog);
  assert.match(draft.id, /^MJ-\d{4}-[A-F0-9]{12}$/);
  assert.equal(draft.subtotal, 4350);
  assert.equal(draft.quantity, 3);
  assert.match(draft.message, /M × 3/);
  assert.match(draft.message, /confirm stock/);
  assert.match(draft.message, /4,350/);
  assert.throws(() => createCartDraft([], profile, catalog), /Add a jersey/);
  assert.throws(() => createCartDraft(one(), EMPTY_PROFILE, catalog), /name/);
  assert.throws(() => createCartDraft([{ key: 'fb2:M', productId: 'fb2', size: 'M', quantity: 1 }], profile, catalog), /unavailable/);
});

const team = { team: 'Demo Club', contactName: profile.name, phone: profile.phone, email: '', quantity: 15, sizes: '5 M, 10 L', details: 'Gold trim', designName: 'kit.png', designReference: 'Custom design' };
test('team draft records only reference metadata and no fabricated quote or fulfillment state', () => {
  const draft = createTeamDraft(team);
  assert.equal(draft.subtotal, null);
  assert.match(draft.message, /will attach this file in WhatsApp/);
  assert.match(draft.message, /not a confirmed or paid order/);
  assert.match(draft.message, /starting from 299TK/);
  assert.ok(!('status' in draft));
  for (const quantity of [0, 1.1, 501]) assert.throws(() => createTeamDraft({ ...team, quantity }), /quantity/);
  assert.throws(() => createTeamDraft({ ...team, phone: 'bad' }), /phone/);
});

test('saved cart/profile/request history roundtrip; corrupt payloads do not silently succeed', () => {
  const saved = { ...emptyCommerce(), cart: one(), profile, drafts: [createTeamDraft(team)] };
  assert.deepEqual(readCommerce(JSON.stringify(saved), catalog), saved);
  assert.deepEqual(readCommerce(null, catalog), emptyCommerce());
  assert.throws(() => readCommerce('{broken', catalog));
  assert.throws(() => readCommerce('{"version":99}', catalog));
  assert.throws(() => readCommerce(JSON.stringify({ ...saved, drafts: [{ ...saved.drafts[0], subtotal: -1 }] }), catalog));
});

test('status inquiry validates reference without claiming an order exists', () => {
  assert.match(orderStatusMessage('MJ-REFERENCE'), /Please check the status/);
  assert.throws(() => orderStatusMessage(' '), /reference/);
});

test('design preview accepts typed magic bytes and rejects empty, oversize, mismatched and executable uploads', async () => {
  const png = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 0]);
  assert.equal(await validateDesignFile(new File([png], 'kit.png', { type: 'image/png' })), null);
  assert.equal(await validateDesignFile(new File(['%PDF-1.7\n'], 'kit.pdf', { type: 'application/pdf' })), null);
  assert.match(await validateDesignFile(new File(['not image'], 'kit.png', { type: 'image/png' })), /not a valid/);
  assert.match(await validateDesignFile(new File([png], 'kit.jpg', { type: 'image/png' })), /does not match/);
  assert.match(await validateDesignFile(new File(['<svg/>'], 'kit.svg', { type: 'image/svg+xml' })), /not supported/);
  assert.match(await validateDesignFile(new File([], 'kit.png')), /empty/);
  assert.match(await validateDesignFile(new File([new Uint8Array(MAX_DESIGN_BYTES + 1)], 'kit.png')), /10 MB/);
});
