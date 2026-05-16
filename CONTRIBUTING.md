# Contributing to Scent

This document outlines the development workflow and rules to keep the codebase consistent and maintainable.

---

## 📦 Project Setup

### Clone the repository

```bash
git clone https://github.com/Abviol/scent.git
```

### Copy variables from .env.example to .env

```bash
cp .env.example .env
```

### Install dependencies

```bash
pnpm install
```

### Start development server

```bash
pnpm dev
```

### Build project
```bash
pnpm build
```

### Lint code
```bash
pnpm lint
```

---

## 🔄 Development Flow

1. Create branch from `dev`
2. Implement changes
3. Run `pnpm lint` + `pnpm build`
4. Open PR targeting `dev`
5. Merge after review/checks

---

## 🌿 Branch Naming

Use the following convention:

```
type/short-description
```

### Branch types:
- `feat`: new feature
- `fix`: bug fix
- `refactor`: code change without behavior change
- `docs`: documentation only
- `style`: formatting (no logic changes)
- `test`: adding/updating tests
- `chore`: maintenance (build tools, deps, etc.)

### Examples:
- feat/cart-drawer
- fix/hydration-issue
- refactor/navbar-state
- docs/readme-update

---

## 🌳 Branch Strategy

- master → production
- dev → active development

---

## 💬 Commit Convention

We use Conventional Commits:

```
type(scope): subject

Body: explanation of what changed and why (optional)

Footer: links / breaking changes (optional)
```

### 1. Type (required)
- `feat`: new feature
- `fix`: bug fix
- `refactor`: code change without behavior change
- `docs`: documentation only
- `style`: formatting (no logic changes)
- `test`: adding/updating tests
- `chore`: maintenance (build tools, deps, etc.)

### 2. Scope (optional)
What part of the app is affected.

Examples:
- `cart`
- `navbar`
- `auth`
- `checkout`
- `api`

### 3. Subject (required)
Short description of the change

**Rules**:

- imperative mood (“add”, not “added”)
- lowercase
- no period at the end
- ideally ≤ 50–72 characters


Example:
```
feat(cart): add drawer animation
```

### 4. Body (optional)
Why and what in detail.

```markdown
Implemented smooth slide-in animation using Framer Motion.
Improves UX consistency with design system.
```

### 5. Footer (optional)
Used for metadata like:
- breaking changes
- issue references

```markdown
fix(auth): prevent login crash on empty input

Closes #42
```
or
```markdown
feat(api): change response format

BREAKING CHANGE: response now returns `userData` instead of `user`
```

### Full commit example

```markdown
feat(cart): add drawer animation

Implemented slide-in cart drawer with focus trap and escape handling.
Improves accessibility and aligns with design specs.

Closes #18
```

### 🚫 What should NOT be committed

- console.log left in code
- commented-out code
- unused imports
- debug flags
---

## 🔀 Pull Requests

Before opening a PR:

- Ensure the branch is up to date with `dev`
- Run `pnpm build`
- Run `pnpm lint`
- Test changes locally

### PR Naming Convention

PR titles use the same format as commit messages:
```markdown
type(scope): short description
```

### PR requirements:
- Clear description
- Screenshots (if UI changes)
- All checklist (applicable) items completed

See `/.github/pull_request_template.md`.

---

## 🎨 Code Style

- Use TypeScript strictly
- Prefer functional components
- Use Tailwind CSS for styling
- Avoid inline styles
- Keep components small and reusable
- Prefer server components when possible (Next.js App Router)

---

## ✅ Definition of Done

A task is considered complete when:

- [ ] Feature works as expected
- [ ] No ESLint errors
- [ ] No console errors
- [ ] Fully responsive
- [ ] Accessible (keyboard + ARIA where needed)
- [ ] Types are correct
- [ ] UI matches design
- [ ] Code is reviewed and clean

---

## 📌 Notes

This project is designed as a portfolio-level production simulation.  
Quality, consistency, and clarity matter more than speed.