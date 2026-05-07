'use client';

import { useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';

/**
 * ChatCartBridge
 *
 * Listens for `leuco-embed:cart-add` postMessage events emitted by the
 * Replit AI chat widget (https://leuco-tools.replit.app) and forwards them
 * to our Shopify CartContext.  It also posts back a `leuco-embed:cart-add-result`
 * acknowledgement so the widget can show a confirmation (or error) to the user.
 *
 * Message contract (Embed → Parent):
 *   event: 'leuco-embed:cart-add'
 *   payload: { variantId: string, quantity?: number, productTitle?: string, variantTitle?: string }
 *
 *   variantId must be the Shopify GID format:
 *   e.g. "gid://shopify/ProductVariant/46123456789"
 *
 * Message contract (Parent → Embed):
 *   event: 'leuco-embed:cart-add-result'
 *   payload: { ok: boolean, error?: string }
 */

const ALLOWED_ORIGIN = 'https://leuco-tools.replit.app';

export function ChatCartBridge() {
  const { addToCart } = useCart();

  // Keep a stable ref so the event listener always has the latest addToCart
  const addToCartRef = useRef(addToCart);
  useEffect(() => {
    addToCartRef.current = addToCart;
  }, [addToCart]);

  useEffect(() => {
    const handler = async (event: MessageEvent) => {
      // ── Security: only trust messages from the Replit widget origin ──────
      if (event.origin !== ALLOWED_ORIGIN) return;
      if (!event.data || event.data.type !== 'leuco-embed:cart-add') return;

      const { variantId, quantity = 1 } = event.data as {
        variantId: string;
        quantity?: number;
        productTitle?: string;
        variantTitle?: string;
      };

      if (!variantId) {
        // Reply with error if no variantId was provided
        event.source?.postMessage(
          { type: 'leuco-embed:cart-add-result', ok: false, error: 'Missing variantId' },
          { targetOrigin: ALLOWED_ORIGIN }
        );
        return;
      }

      try {
        // addToCart in CartContext adds one unit at a time; loop for quantity > 1
        for (let i = 0; i < quantity; i++) {
          await addToCartRef.current(variantId);
        }

        // Cart drawer opens automatically inside CartContext on success.
        // Notify the widget so it can show its own confirmation too.
        event.source?.postMessage(
          { type: 'leuco-embed:cart-add-result', ok: true },
          { targetOrigin: ALLOWED_ORIGIN }
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        event.source?.postMessage(
          { type: 'leuco-embed:cart-add-result', ok: false, error: message },
          { targetOrigin: ALLOWED_ORIGIN }
        );
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []); // stable — addToCart is read via ref

  return null; // renders nothing
}
