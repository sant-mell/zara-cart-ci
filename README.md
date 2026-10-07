# zara-cart-ci

A small shopping cart for the Zara online store class project, built to practice CI with GitHub Actions. The example feature is the **Apply coupon** button.

- Prices are stored as integer cents.
- Fake coupons: `ZARA10` (10% off) and `WELCOME100` (100.00 off, never below zero). Unknown codes throw `Invalid coupon`.

## Commands

```sh
npm ci          # install from package-lock.json
npm test        # run unit tests with node:test
npm run build   # copy src/ into dist/
```

CI runs all three on every push and pull request (`.github/workflows/ci.yml`).
