# 🌐 url-sync

A lightweight utility to **synchronize filters, sorters, and search states** via **URL query parameters**.

Supports both **frontend (like React)** and **backend (like Node.js)** usage with a clean, declarative API.

---

## 🚀 Why url-sync?

Most frontend apps store filters and sorters in local state, which:

- ❌ Doesn’t persist on page refresh
- ❌ Can’t be shared or bookmarked
- ❌ Breaks in SSR or backend filtering

`url-sync` solves this by syncing your filters and sorters with the URL, enabling:

- 🔄 State persistence
- 🔗 Sharable, bookmarkable URLs
- 💻 Server-side compatibility

---

## 📦 Installation

```bash
npm install url-sync
# or
yarn add url-sync
