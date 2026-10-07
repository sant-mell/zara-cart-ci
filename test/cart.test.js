'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createCart, addItem, subtotalCents, applyCoupon, totalCents } = require('../src/cart');

function shirtAndJeans() {
  const cart = createCart();
  addItem(cart, { name: 'Shirt', priceCents: 59900 });
  addItem(cart, { name: 'Jeans', priceCents: 89900 });
  return cart;
}

test('subtotal adds item prices in cents', () => {
  assert.equal(subtotalCents(shirtAndJeans()), 149800);
});

test('subtotal respects quantity', () => {
  const cart = createCart();
  addItem(cart, { name: 'Socks', priceCents: 14900, quantity: 3 });
  assert.equal(subtotalCents(cart), 44700);
});

test('ZARA10 takes 10% off a shirt and jeans', () => {
  const cart = shirtAndJeans();
  applyCoupon(cart, 'ZARA10');
  assert.equal(totalCents(cart), 134820);
});

test('WELCOME100 takes 100.00 off', () => {
  const cart = shirtAndJeans();
  applyCoupon(cart, 'WELCOME100');
  assert.equal(totalCents(cart), 139800);
});

test('WELCOME100 never makes the total negative', () => {
  const cart = createCart();
  addItem(cart, { name: 'Hair clip', priceCents: 4990 });
  applyCoupon(cart, 'WELCOME100');
  assert.equal(totalCents(cart), 0);
});

test('unknown coupon is rejected', () => {
  const cart = shirtAndJeans();
  assert.throws(() => applyCoupon(cart, 'FREESTUFF'), { message: 'Invalid coupon' });
  assert.equal(totalCents(cart), 149800);
});

test('total without coupon equals subtotal', () => {
  const cart = shirtAndJeans();
  assert.equal(totalCents(cart), subtotalCents(cart));
});
