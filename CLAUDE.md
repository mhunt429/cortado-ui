# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development server (proxies /api to https://localhost:7170)
npm start           # or: ng serve

# Build
npm run build       # production build → dist/
npm run watch       # development build with watch

# Tests
npm test            # Karma/Jasmine test runner (opens browser)

# Formatting
npm run format          # prettier --write on all src ts/html/scss/json
npm run format:check    # check without writing
```

To run a single test file, use the `--include` flag:
```bash
ng test --include='src/app/shared/components/toast/**/*.spec.ts'
```

## Architecture

### Stack
- **Angular 21** with standalone components (no NgModules)
- **Tailwind CSS v4** — configured via `@use "tailwindcss"` in `src/styles.scss`; dark mode is class-based (`.dark` on `<html>`)
- **ApexCharts** for dashboard charts
- **Plaid** ("connector") for bank account linking
- **lucide-angular** for icons; **angular-svg-icon** for SVG assets
- **Angular SSR** (`@angular/ssr`) + **Service Worker** (`@angular/service-worker`, production only)

### Project Structure

```
src/app/
├── core/
│   ├── models/          # TypeScript interfaces/types for API shapes
│   └── validators.ts    # Shared Angular form validators
├── features/            # Route-level feature components
│   ├── connector/       # Plaid bank account linking flow
│   ├── dashboard/       # Charts and financial overview
│   │   └── components/  # category-chart, spending-trend-chart
│   ├── identity/        # login/, register/
│   ├── landing-page/
│   └── messages/        # messages-list/, message-detail/
└── shared/
    ├── components/      # Reusable UI: alert, card, floating-label input,
    │                    #   main-layout, navbar, paged-table,
    │                    #   password-validation-summary, primary-button, toast
    ├── guards/          # authGuard (functional guard)
    ├── helpers/         # cookie-helper
    ├── interceptors/    # auth-token.interceptor (currently commented out)
    └── services/        # auth, account, connector, http-client,
                         #   finance-mock, messages, theme, toast
```

### Routing & Auth

- Public routes: `/` (landing), `/identity/login`, `/identity/register`
- Protected routes use `MainLayoutComponent` (navbar + router-outlet) wrapped by `authGuard`
- `authGuard` is a functional `CanActivateFn` that calls `GET /api/identity/current-user` on every navigation; redirects to `/identity/login` on failure and stores the user in `sessionStorage`

### HTTP / API

All HTTP calls go through `HttpClientService` (`src/app/shared/services/http-client.service.ts`), which:
- Prepends `/api` to every URL
- Passes `withCredentials: true` (cookie-based auth)
- Dev server proxies `/api → https://localhost:7170` (configured in `proxy.conf.json`)

API responses are typed as `BaseApiResponse<T>` (`src/app/core/models/baseApiResponse.ts`):
```ts
type BaseApiResponse<T> = { statusCode: number; data: T; errors: string[] };
```

### Services

- **`ThemeService`** — manages dark mode via Angular `signal`; persists preference to `localStorage` under key `darkMode`
- **`ToastService`** — `BehaviorSubject<ToastMessage | null>`; auto-dismisses after 5 s unless `persisted: true`
- **`AuthService`** — session check via `isAuthenticated()` reads `sessionStorage`; actual session validation happens in the guard via `loadSession$()`

### Formatting

Prettier is enforced. Key settings: single quotes, semicolons, 100-char print width (120 for HTML), 2-space indent, LF line endings, trailing commas (ES5).
