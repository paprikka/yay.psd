# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server at http://localhost:3000
- `pnpm build` - Build for production
- `pnpm start` - Start production server

### Code Quality
- `pnpm lint` - Run ESLint to check code quality
- `pnpm format` - Format code with Prettier (covers: __mocks__, components, data, hooks, pages, styles, tracking)
- No built-in TypeScript check command - use `npx tsc --noEmit` for type checking

### Testing
- `pnpm test` - Run all tests
- `pnpm tdd` - Run tests in watch mode
- `pnpm test <filename>` - Run specific test file

## Architecture Overview

This is a Next.js visual storytelling/portfolio website that displays creative content (doodles, posts) with these key architectural decisions:

### Content Management
- **Contentful CMS** integration via GraphQL (`data/contentful.ts`)
- Content types: posts with title, text, image, video, audio assets
- RSS feed generation for content syndication

### Component Structure
- Components use CSS Modules for styling (`.module.css` files)
- Main components:
  - `feed-item/` - Individual items in the feed view
  - `single-post/` - Full post display
  - `renderers/` - Asset rendering (images, videos, audio)
  - `grid/` - Grid layout view

### Routing
- `/` - Main feed page
- `/grid` - Grid view of posts
- `/p/[slug]` - Individual post pages
- `/api/` - API endpoints for RSS, stats, newsletter

### Key Features
- Lazy loading for media assets
- Rainbow background animation effects
- Audio player integration (plomk library)
- Social sharing functionality
- Newsletter subscription
- Twitter syndication capabilities (currently on hold)

### State Management
- React hooks for local state
- No global state management library
- Custom hooks in `hooks/` directory

### Styling Approach
- CSS Modules for component-specific styles
- Global styles in `styles/` directory
- Responsive design with mobile-first approach

### Important Patterns
- Assets are rendered through specialized renderer components
- Feed items support multiple media types (image, video, audio)
- Background effects are managed through dedicated components
- Analytics tracking is centralized in `tracking/` directory