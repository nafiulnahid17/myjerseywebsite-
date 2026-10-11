import { useCallback, useEffect, useRef, useState } from 'react';
import { ALL } from '@/data/catalog';
import {
  STORAGE_KEY, EMPTY_PROFILE, addCartItem, cartTotals, changeCartQuantity, changeCartSize,
  cleanProfile, createCartDraft, createTeamDraft, emptyCommerce, readCommerce, validateProfile,
  type CommerceSnapshot, type CustomerProfile, type JerseySize, type OrderDraft, type TeamOrderInput,
} from '@/lib/commerce';

const storageWarning = 'Your browser could not save these changes. They are available in this tab only and may be lost on refresh.';

function load() {
  try {
    return { snapshot: readCommerce(window.localStorage.getItem(STORAGE_KEY), ALL), error: null as string | null };
  } catch {
    return { snapshot: emptyCommerce(), error: 'Saved shopping preferences could not be loaded. Please review your bag and profile before ordering.' };
  }
}

/** One owner per page. Local data is never represented as an authenticated account. */
export function useCommerce() {
  const [initial] = useState(load);
  const [snapshot, setSnapshot] = useState(initial.snapshot);
  const [storageError, setStorageError] = useState<string | null>(initial.error);
  const current = useRef(snapshot);

  const commit = useCallback((next: CommerceSnapshot) => {
    current.current = next;
    setSnapshot(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setStorageError(null);
    } catch {
      setStorageError(storageWarning);
    }
  }, []);

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.storageArea !== window.localStorage || (event.key !== STORAGE_KEY && event.key !== null)) return;
      try {
        const next = readCommerce(event.newValue, ALL);
        current.current = next;
        setSnapshot(next);
        setStorageError(null);
      } catch {
        setStorageError('Another tab changed your saved data, but it could not be read. Refresh and review your bag before ordering.');
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const addItem = useCallback((productId: string, size?: JerseySize) => {
    const cart = addCartItem(current.current.cart, ALL, productId, size ?? current.current.profile.preferredSize);
    if (!cart) return false;
    commit({ ...current.current, cart });
    return true;
  }, [commit]);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    commit({ ...current.current, cart: changeCartQuantity(current.current.cart, key, quantity, ALL) });
  }, [commit]);

  const updateSize = useCallback((key: string, size: JerseySize) => {
    commit({ ...current.current, cart: changeCartSize(current.current.cart, key, size, ALL) });
  }, [commit]);

  const removeItem = useCallback((key: string) => commit({ ...current.current, cart: current.current.cart.filter((line) => line.key !== key) }), [commit]);
  const clearCart = useCallback(() => commit({ ...current.current, cart: [] }), [commit]);

  const saveProfile = useCallback((profile: CustomerProfile) => {
    const error = validateProfile(profile);
    if (error) throw new Error(error);
    commit({ ...current.current, profile: cleanProfile(profile) });
  }, [commit]);

  const clearProfile = useCallback(() => commit({ ...current.current, profile: { ...EMPTY_PROFILE } }), [commit]);
  const saveDraft = useCallback((draft: OrderDraft) => {
    commit({ ...current.current, drafts: [draft, ...current.current.drafts] });
    return draft;
  }, [commit]);
  const prepareCartOrder = useCallback(() => saveDraft(createCartDraft(current.current.cart, current.current.profile, ALL)), [saveDraft]);
  const prepareTeamOrder = useCallback((input: TeamOrderInput) => saveDraft(createTeamDraft(input)), [saveDraft]);
  const removeDraft = useCallback((id: string) => commit({ ...current.current, drafts: current.current.drafts.filter((draft) => draft.id !== id) }), [commit]);
  const totals = cartTotals(snapshot.cart, ALL);

  return {
    cart: snapshot.cart, profile: snapshot.profile, drafts: snapshot.drafts, cartCount: totals.count, subtotal: totals.subtotal,
    storageError, addItem, updateQuantity, updateSize, removeItem, clearCart, saveProfile, clearProfile, prepareCartOrder, prepareTeamOrder, removeDraft,
  };
}

export type Commerce = ReturnType<typeof useCommerce>;
