<div align="center">

# Fynix Starter Template

**Get started building modern, reactive web applications with Fynix**

![TypeScript](https://img.shields.io/badge/typescript-100%25-blue)
![Build Size](https://img.shields.io/badge/build-~15kb-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

[ Documentation](#-documentation) • [ Features](#-features) • [ Quick Start](#-quick-start) • [ Links](#-links)

</div>

---

## Documentation

### What is Fynix?

Fynix is a **lightweight, fiber-based JavaScript framework** for building fast, secure, and reactive web applications. It combines React-like component patterns with a production-ready runtime optimized for performance and security.

**Perfect for:**

- Single Page Applications (SPAs)
- Progressive Web Apps (PWAs)
- Content-heavy websites
- Real-time applications
- Performance-critical projects

---

## Features

### 1. **Fiber Architecture**

- Time-sliced rendering ensures UI responsiveness
- Work yields to higher-priority tasks
- Never blocks user interactions
- Predictable performance

### 2. **Fine-Grained Reactivity**

- Only affected components re-render
- No full tree reconciliation
- Smaller memory footprint
- Better for large applications

### 3. **Built-in Security**

- XSS protection at the framework level
- HTML entity encoding
- Protocol blocking for unsafe URLs
- No inline event handlers allowed

### 4. **TypeScript First**

- 100% TypeScript support
- JSX syntax support
- Full type safety
- Better IDE autocomplete

### 5. **Zero Dependencies**

- No external libraries
- No supply chain risk
- Predictable bundle size
- ~15KB gzipped runtime

### 6. **File-Based Routing**

- Automatic route discovery
- Dynamic route parameters
- Lazy loading support
- SEO-friendly metadata

---

## Quick Start

### Prerequisites

```
Node.js 14+ (recommended: 18+)
npm or yarn package manager
Basic JavaScript/TypeScript knowledge
```

### Installation

```bash


# Install dependencies
npx fynixcli <app-name>

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Project Structure

````
template/
├── src/
│   ├── main.ts              # Application entry point
│   ├── Global.css           # Global styles
│   ├── view.tsx             # Root component
│   ├── homepage/
│   │   └── view.tsx         # Homepage component
│   ├── docs/                # Documentation pages
│   └── components/          # Reusable components
├── public/                  # Static assets
├── index.html              # HTML entry point
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project metadata
└── README.md               # This file

##  Running Commands

### Development

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm build

# Preview production build
npm preview
````

## Contributing

Found a bug or want to contribute? Visit the [main repository](https://github.com/Lazycoder229/fynix).

---

## License

MIT License © 2026 Resty Gonzales

See [LICENSE](../LICENSE) for full details.

---

<div align="center">

**Built with using Fynix**

[⬆ Back to top](#-fynix-starter-template)

</div>
