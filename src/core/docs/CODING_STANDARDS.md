# 📐 Coding Standards & Best Practices

## 🎯 Core Principle

**Write only the ABSOLUTE MINIMAL amount of code needed to address the requirement correctly.**

Avoid:
- Verbose implementations
- Code that doesn't directly contribute to the solution
- Over-engineering
- Unnecessary abstractions

## 🤖 AI Assistant Rules

### When User Says "Run the Bot" or "Start the Bot"
**IMMEDIATELY execute these commands WITHOUT asking:**

```bash
# 1. Check if Next.js is running
lsof -i :3000

# 2. If not running, start it
cd /Users/mahanzandi/Desktop/Projects/Personal/AI-ChatBot && npm run dev &

# 3. Check ngrok status
curl -s http://127.0.0.1:4040/api/tunnels | grep public_url

# 4. If ngrok not running or URL changed, get new URL and update Telegram
# Extract ngrok URL and set webhook + menu button automatically
```

**DO NOT:**
- Ask for confirmation
- Explain what you're doing first
- Wait for user input

**JUST RUN IT** and report the result.

## 📁 Project Structure Rules

### Documentation Location
```
src/core/docs/
```

**All project documentation MUST be placed in `src/core/docs/` directory.**

Examples:
- ✅ `src/core/docs/TELEGRAM_SETUP.md`
- ✅ `src/core/docs/LOCAL_DEVELOPMENT.md`
- ✅ `src/core/docs/API_GUIDE.md`
- ❌ `TELEGRAM_SETUP.md` (root level)
- ❌ `docs/SETUP.md` (wrong location)

### Feature Structure
```
src/features/{feature-name}/
├── components/
├── hooks/
├── store/
├── types/
└── assets/
```

### Core Utilities
```
src/core/
├── docs/          # All documentation
├── storage/       # Storage utilities
├── telegram/      # Telegram integration
└── utils/         # Shared utilities
```

## 💻 Code Style

### Minimal Imports
```typescript
// ❌ Bad - importing entire library
import * as React from 'react';

// ✅ Good - import only what you need
import { useState, useEffect } from 'react';
```

### Concise Functions
```typescript
// ❌ Bad - verbose
function getUserName(user: User): string {
  if (user && user.name) {
    return user.name;
  } else {
    return 'Anonymous';
  }
}

// ✅ Good - minimal
const getUserName = (user: User) => user?.name || 'Anonymous';
```

### Direct Solutions
```typescript
// ❌ Bad - unnecessary abstraction
const createWrapper = (Component: React.FC) => {
  return (props: any) => <div><Component {...props} /></div>;
};

// ✅ Good - direct implementation
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);
```

## 🚫 Anti-Patterns to Avoid

1. **Over-commenting** - Code should be self-explanatory
2. **Premature optimization** - Optimize only when needed
3. **Deep nesting** - Keep it flat
4. **Large files** - Split when > 300 lines
5. **Unused code** - Delete it immediately

## ✅ Checklist Before Commit

- [ ] Code is minimal and focused
- [ ] No unused imports or variables
- [ ] Documentation in `src/core/docs/`
- [ ] Types are properly defined
- [ ] No console.logs in production code
- [ ] Environment variables properly configured

## 📚 Documentation Standards

### File Naming
- Use UPPERCASE for main docs: `SETUP.md`, `API.md`
- Use kebab-case for specific guides: `local-development.md`

### Structure
```markdown
# Title

## Section 1
Brief explanation

## Section 2
Code examples

## Troubleshooting
Common issues
```

### Language
- Persian for user-facing docs
- English for technical/API docs
- Code comments in English only

## 🔧 Environment Variables

Always document in `.env.local`:
```env
# Clear description in Persian/English
VARIABLE_NAME=value
```

## 🎨 Component Guidelines

```typescript
// Minimal component structure
export default function ComponentName() {
  const state = useStore();
  
  return (
    <div>
      {/* Minimal JSX */}
    </div>
  );
}
```

No unnecessary:
- Wrapper divs
- Intermediate variables
- Complex state management
- Props drilling (use stores)

## 📝 Commit Messages

```
feat: add telegram mini app support
fix: resolve webhook configuration
docs: update local development guide
refactor: simplify chat store logic
```

Keep it short and descriptive.
