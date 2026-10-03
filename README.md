# Interactive Terminal Portfolio

## Overview

This repository contains a modern developer portfolio website featuring a unique interactive terminal interface and markdown-based content. It showcases professional projects, personal work, and academic achievements while providing an engaging terminal-based navigation experience.

## Key Features

- Interactive terminal UI with command execution (whoami, projects, home, help, date, etc.)
- Dynamic blog system using MDX for rich content display
- Comprehensive project showcase with filtering and categorization across industry, personal, and academic sections
- Professional information page with detailed bio and experience
- Responsive terminal interface with drag & drop and resize capabilities
- Mobile-friendly responsive design

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- MDX
- Heroicons (icon library)

## Setup

To get started with the project:

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The development server will be available at `http://localhost:3000`.

## Running

Use the following commands for different stages:

- `pnpm dev` - Run the application in development mode with hot reload
- `pnpm build` - Build the application for production
- `pnpm start` - Run the built application in production mode

## Project Structure

```
.
├── app/
│   ├── page.tsx                # Home page (terminal interface)
│   ├── whoami/
│   │   └── page.tsx           # Personal information page
│   ├── projects/
│   │   └── page.tsx           # Projects showcase
│   ├── blog/                   # MDX blog posts
│   │   ├── page.mdx           # Blog index page
│   │   └── [slug]/            # Individual blog posts
│   └── not-found.tsx          # 404 error page
├── components/                # UI components
│   ├── project-card.tsx       # Project display component
│   ├── terminal.tsx          # Interactive terminal component
│   ├── markdown-text.tsx      # Markdown rendering
│   └── mermaid.tsx           # Mermaid diagram component
├── data/                      # Data files
│   ├── commands.tsx           # Terminal command definitions
│   ├── projects-list/         # Project data (industry, personal, academic)
│   ├── whoami.ts              # Personal bio and experience data
│   └── projects.ts            # Project type definitions
├── public/                    # Static assets
├── mdx-components.tsx         # MDX component configuration
└── ...                        # Other configuration files
```

## Terminal Features

The interactive terminal supports various commands:

- Navigation: `whoami` (goes to personal page), `projects` (goes to projects page), `home` (returns to main page)
- System: `help` (displays available commands), `date` (shows current date), `clear` (clears terminal), `echo` (displays text)
- Responsive design with dockable, floating, and minimized modes
- Mobile-optimized with collapsible behavior

## Content Management

### Blog Posts

Blog posts are written in MDX format (Markdown + JSX) for flexible content. Each post is organized in its own directory under `app/blog/` containing a `page.mdx` file and optional assets. To add a new blog post:

1. Create a new directory under `app/blog/` (e.g., `my-new-post/`)
2. Add a `page.mdx` file inside the directory with markdown content and optional JSX components
3. Place any images or assets in the same directory
4. The blog index is automatically generated

### Projects

Project data is stored in TypeScript files under `data/projects-list/`:

- `industry.ts` - Professional/industry projects
- `personal.ts` - Personal and open-source projects
- `academics.ts` - Academic and research projects

Each project includes metadata such as title, description, technologies used, and availability status.

## Development

To modify the project:

- Add new commands in `data/commands.tsx`
- Add new projects in the appropriate project data files
- Create new UI components in the `components/` directory
- Customize styling in `app/globals.css` and `tailwind.config.ts`

## Contributing

For bug reports, feature requests, or code contributions, please follow the project's contribution guidelines (if any are specified elsewhere in the repository).

## License

This project is part of the developer's personal portfolio and is provided under the terms of the MIT License.