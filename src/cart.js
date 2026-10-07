'use strict';

// Fake coupons for the class project. All amounts are integer cents.
const COUPONS = {
  ZARA10: { type: 'percent', value: 10 },
  WELCOME100: { type: 'fixed', value: 10000 },
};

function createCart() {
  return { items: [], coupon: null };
}

function addItem(cart, { name, priceCents, quantity = 1 }) {
  if (!Number.isInteger(priceCents) || priceCents < 0) {
    throw new Error('priceCents must be a non-negative integer');
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error('quantity must be a positive integer');
  }
  cart.items.push({ name, priceCents, quantity });
  return cart;
}

function subtotalCents(cart) {
  return cart.items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
}

function applyCoupon(cart, code) {
  const normalized = String(code).trim().toUpperCase();
  if (!COUPONS[normalized]) {
    throw new Error('Invalid coupon');
  }
  cart.coupon = normalized;
  return cart;
}

function discountCents(cart) {
  if (!cart.coupon) return 0;
  const subtotal = subtotalCents(cart);
  const coupon = COUPONS[cart.coupon];
  const discount =
    coupon.type === 'percent' ? Math.round((subtotal * coupon.value) / 100) : coupon.value;
  return Math.min(discount, subtotal);
}

function totalCents(cart) {
  return subtotalCents(cart) - discountCents(cart);
}

module.exports = { createCart, addItem, subtotalCents, applyCoupon, totalCents };
