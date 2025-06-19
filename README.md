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
````
## 🧠 Core Functions

1. URLSync(config, locationSearch?)
Parses filters and sorters from the current URL.

````
import URLSync from "url-sync";

const { filters, sorters, sorterState, parsedQuery } = URLSync({
  filters: {
    status: { type: "string", queryString: "status", defaultValue: "active" },
    price: { type: "number", queryString: "price" },
  },
  sorters: {
    fieldToQueryString: { name: "sort_name" },
    sortOrdersValues: {
      ASCENDING: "asc",
      DESCENDING: "desc",
    },
    defaultSortValues: { sortBy: "asc", sortOn: "name" },
  },
});

# Output
{
  filters: {
    status: "active",
    price: 500
  },
  sorters: [
    { sortOn: "name", sortBy: "asc" }
  ],
  sorterState: {
    name: "ascend"
  },
  parsedQuery: {
    status: "active",
    price: "500",
    sort_name: "asc"
  }
}

````

2. URLSyncNavigate(updatedObj, locationSearch?, locationPathname?)
Creates a new URL with updated query parameters.

````
import { URLSyncNavigate } from "url-sync";

const newUrl = URLSyncNavigate({
  status: "completed",
  search: "shoes",
  page: null, // null removes it from the URL
});

# Output 
/current-pathname?status=completed&search=shoes
````


## 🏷 License
MIT © Denish Puthawala
