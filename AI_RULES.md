# AI_RULES.md

## Tech Stack Overview
- **Core Framework**: React 18+ with TypeScript
- **Routing**: React Router v6
- **UI Libraries**: 
  - Shadcn UI for core components (buttons, cards, forms)
  - Radix UI for advanced UI patterns (modals, tooltips)
- **State Management**: Zustand for global state
- **API Layer**: Axios for HTTP requests
- **Authentication**: Firebase Auth + Firestore
- **Real-time Data**: Firebase Cloud Functions
- **Styling**: Tailwind CSS (via Shadcn UI)
- **Testing**: Jest + React Testing Library
- **Code Quality**: ESLint + Prettier

## Library Usage Rules

### UI Components
- **Shadcn UI** must be used for:
  - Buttons, cards, forms, and layout components
  - All primary UI elements (headers, footers, modals)
- **Radix UI** reserved for:
  - Complex UI patterns (dialogs, portals)
  - Custom tooltip/modal implementations
- **Never** use CSS-in-JS libraries (e.g., styled-components)

### State Management
- **Zustand** is the only state management solution
- No Redux, MobX, or Context API for global state
- Local component state allowed for UI elements

### API & Data
- **Axios** for all HTTP requests
  - Wrap in custom hooks (`useApiCall`)
  - No fetch API or other HTTP clients
- **Firebase** for:
  - Authentication (`firebase.auth()`)
  - Real-time data (`firebase.firestore()`)
  - Cloud Functions for serverless logic
- No third-party API clients unless explicitly approved

### Styling
- **Tailwind CSS** via Shadcn UI
  - No CSS modules or global stylesheets
  - All custom styles must use Tailwind classes
- No inline styles except for:
  - Transitions/animations
  - Dynamic width/height calculations

### Testing
- **Jest** for unit tests
- **React Testing Library** for component tests
- No Enzyme or Cypress unless explicitly required

### Code Quality
- **ESLint** with Airbnb config
- **Prettier** for code formatting
- No TODO comments in production code
- All new components must include:
  - TypeScript types
  - Accessibility attributes
  - Unit tests

### Third-Party Libraries
- Only use npm packages with:
  - >10k stars on GitHub
  - Active maintenance (last update <6 months)
  - Clear security audits
- Document all third-party dependencies in `README.md`

### Firebase Rules
- Authentication must use Firebase Auth
- Real-time data must use Firestore
- Cloud Functions for:
  - Payment processing
  - Webhook handling
  - User data synchronization
- No direct database access from client-side

### Security
- All API keys/secrets in environment variables
- No hardcoded credentials
- Use Firebase Security Rules for data protection
- Implement rate limiting for API endpoints