# CS2 Stats

A comprehensive [Next.js](https://nextjs.org) application for tracking and visualizing Counter-Strike 2 match statistics. This project processes CS2 demo files and provides detailed analytics including player performance, weapon statistics, map data, and advanced metrics.

## Prerequisites

### External Repository Required

This project requires the **[demoinfocs-golang](https://github.com/markus-wa/demoinfocs-golang)** library to parse CS2 demo files. You'll need to set up a separate repository with this library to process match data before importing it into this project.

### System Requirements

- Node.js 18+
- pnpm package manager
- PostgreSQL database
- Go 1.19+ (for demo parsing)

## Setup Instructions

### 1. Clone and Setup the External Repository

First, set up the demo parsing repository:

```bash
git clone https://github.com/markus-wa/demoinfocs-golang.git
cd demoinfocs-golang
```

### 2. Configure Demo Processing

1. **Modify main.go**: Change the path in [`main.go`](src/scripts/main.go) for saving `stats.json` to point to your desired output location.

2. **Copy main.go**: Copy the modified [`main.go`](src/scripts/main.go) from this project's `src/scripts/` directory to the `scripts/` directory in the demoinfocs-golang repository.

3. **Configure CS2 Demo Path**: Change the destination of CS2 demo recordings from the default CS2 directory to the `scripts/dist/` folder in the demoinfocs-golang repository.

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Database connection
DATABASE_URL="your_postgresql_connection_string"

# Application URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"  # Development
# NEXT_PUBLIC_BASE_URL="https://your-domain.com"  # Production

# Revalidation secret for API calls
REVALIDATION_SECRET="your_secret_key"
```

### 4. Install Dependencies and Setup Database

```bash
# Install dependencies
pnpm install
```

### 5. Development

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Package.json Scripts

The project includes several utility scripts for managing CS2 statistics:

### Data Import

- **`pnpm run loadStats`** - Load new statistics from `stats.json` into the database
- **`pnpm run revertLoadingStats`** - Revert the last statistics loading operation (useful for fixing mistakes and testing)

### Data Management

- **`pnpm run clearSession`** - Clear current session data (temporary match data)
- **`pnpm run clearSeasonOfficial`** - Clear entire season data (use with caution!)

### Typical Workflow

1. **Process Demos**: Run the Go script in the external repository to parse CS2 demos and generate `src/scripts/stats.json` file
2. **Load Stats**: Use `pnpm run loadStats` to import the parsed statistics into your database
3. **View Results**: Check the web application to see updated statistics
4. **Manage Data**: Use clear scripts to reset session or season data as needed

## Project Structure

```
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── all-time/       # All-time statistics views
│   │   ├── general/        # General/season statistics
│   │   ├── session/        # Current session statistics
│   │   └── history/        # Historical data views
│   ├── components/         # Reusable React components
│   │   ├── grids/         # Data grid components
│   │   └── ui/            # UI component library
│   ├── scripts/           # Database management scripts
│   └── utils/             # Utility functions
├── prisma/                # Database schema and migrations
└── public/               # Static assets (avatars, backgrounds)
```

## Features

- **Player Statistics**: Comprehensive tracking of kills, deaths, assists, and advanced metrics
- **Weapon Analytics**: Detailed weapon usage and performance statistics
- **Map Performance**: Map-specific player and team performance data
- **Session Management**: Temporary session tracking separate from seasonal data
- **Historical Data**: Season-by-season comparison and trends
- **Team Randomization**: Built-in team balancing tool
- **Achievement System**: Player achievement tracking and recognition

## Database Management

The project uses [Prisma](https://www.prisma.io/) as the ORM with PostgreSQL. Key commands:

```bash
# Apply database migrations
pnpm prisma migrate dev

# View database in browser
pnpm prisma studio

# Reset database (caution!)
pnpm prisma migrate reset
```

## Deployment

### Vercel (Recommended)

The easiest deployment method is using [Vercel](https://vercel.com):

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on git push

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [Prisma Documentation](https://www.prisma.io/docs) - Database management
- [demoinfocs-golang](https://github.com/markus-wa/demoinfocs-golang) - CS2 demo parsing library
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling framework
- [Shadcn](https://ui.shadcn.com/docs/components) - Components

## License

This project is licensed under the MIT License.
