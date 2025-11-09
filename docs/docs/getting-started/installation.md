---
sidebar_position: 1
title: Installation
---

# Installation Guide

Complete step-by-step guide to install and set up GlassAdmin.

## Prerequisites

- **Node.js** 18.0.0+ 
- **npm** 9.0.0+
- Modern code editor

```bash
node --version  # v18.0.0+
npm --version   # v9.0.0+
```

## Installation Steps

### 1. Extract Package

```bash
unzip glassadmin-react.zip
cd GlassAdmin/react-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development

```bash
npm run dev
```

### 4. Open Browser

Navigate to [http://localhost:5173](http://localhost:5173)

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview build |
| `npm run lint` | Run ESLint |

## Troubleshooting

### Port in Use

```bash
npm run dev -- --port 3000
```

### Install Fails

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

- [Quick Start](./quick-start)
- [Components](../components/overview)
- [Theming](../guides/theming)
