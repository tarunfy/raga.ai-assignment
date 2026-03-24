## ✨ Features

- **Executive Dashboard**: Comprehensive overview tracking admissions, discharges, department capacity utilizing robust area and radial bar charts.
- **Patient Directory Context**: Browse the patient roster with elegant grid and list layouts. Real-time persisted view state and advanced sorting.
- **Authentication**: Secure workspace access backed by Firebase. Beautiful, seamless onboarding via sign-in and sign-up flows.
- **State Management**: Rapid, dependable client-side state with `zustand` and declarative data fetching with TanStack React Query.
- **Dynamic Theming**: Full dark and light mode coverage integrated with shadcn/ui.

<br />

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI & Components**: [React 19](https://react.dev/), [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Data Fetching**: [TanStack React Query](https://tanstack.com/query/latest)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Charts / Visualization**: [Recharts](https://recharts.org/)
- **Authentication**: [Firebase](https://firebase.google.com/)
- **Icons**: [Phosphor Icons](https://phosphoricons.com/)
- **Linting & Formatting**: [Biome](https://biomejs.dev/)

<br />

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/raga.git
cd raga
```

### 2. Install dependencies

This project uses `pnpm` as its package manager.

```bash
pnpm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and configure your Firebase / application keys. You can reference `.env.example`.

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# Add any other missing variables
```

### 4. Run the Development Server

Start the application with Turbopack for lightning-fast HMR:

```bash
pnpm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) in your browser to explore AegisCare.

<br />

## 📜 Available Scripts

- `pnpm dev`: Start development server with Turbopack.
- `pnpm build`: Create an optimized production build.
- `pnpm start`: Start the production server.
- `pnpm format`: Format the codebase using Biome.
- `pnpm lint`: Run linting checks using Biome.
- `pnpm typecheck`: Run TypeScript compilation checks.
- `pnpm check`: Run both linter and typechecker.

<br />

## 🛡️ License

This project is licensed under the MIT License.
