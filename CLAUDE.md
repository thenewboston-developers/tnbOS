# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm start           # Start the app in development mode
npm run lint        # Run ESLint to check code style
npm run package     # Package app for production
npm run build       # Build both main and renderer processes
npm run test        # Run Jest tests
```

### Build Commands
```bash
npm run build:main      # Build main process only
npm run build:renderer  # Build renderer process only
```

### Development Process Commands
```bash
npm run start:main      # Start main process with electronmon
npm run start:renderer  # Start renderer with webpack dev server
npm run start:preload   # Build preload scripts
```

## Architecture

### Overview
tnbOS is an Electron-based p2p application platform using:
- **Frontend**: React 18 + Redux Toolkit + TypeScript + styled-components
- **Backend**: Electron main process with IPC communication
- **State Management**: Redux with separate stores per app
- **Networking**: WebSocket connections for real-time p2p communication

### Directory Structure
- `src/main/` - Electron main process code
  - `MainWindow.ts` - Main window management
  - `ipcMain.ts` - IPC handlers for renderer communication
  - `bridges/` - Communication bridges (IPC, TNB protocol)
  
- `src/renderer/` - Entry point for React app

- `src/system/` - Core system components shared across all apps
  - `components/` - Reusable UI components
  - `store/` - System-level Redux store
  - `hooks/` - System-wide React hooks
  - `routers/` - Message routing logic
  - `validators/` - Protocol validation

- `src/apps/` - Individual applications
  - Each app has its own:
    - `registration.ts` - App metadata and configuration
    - `store/` - App-specific Redux store
    - `components/` - App UI components
    - `containers/` - App container components
    - `blocks/` - Protocol message handlers
    - `listeners/` - WebSocket message listeners
    - `validators/` - Input validation
    - `routers/` - App-specific routing

- `src/shared/` - Code shared between main and renderer processes

### Key Applications
1. **Chat** - Real-time messaging with delivery tracking
2. **Shop** - E-commerce with product listings and orders
3. **Trade** - Asset trading with offers and order matching
4. **University** - Course and lecture management
5. **SpeedTest** - Network performance testing
6. **AccountManager** - Account management
7. **NetworkManager** - Network connection management

### Protocol
The app uses a custom protocol for p2p communication:
- Messages are validated using Yup schemas
- Each app defines its own block types and handlers
- WebSocket connections handle real-time data flow
- Authentication uses tweetnacl for cryptographic signatures

### TypeScript Configuration
- Strict mode enabled
- Base URL set to `./src` for absolute imports
- Target ES2021
- React JSX transform

### ESLint Configuration
- Extends Airbnb TypeScript config
- Prettier integration
- Sort-keys rule enforced
- Custom naming conventions allowed

### Styling
- styled-components for component styling
- Global styles in `system/styles/`
- Each app has its own color theme and mixins
- Material Design Icons (@mdi/react)

## Key Patterns

### Redux Store Pattern
Each app maintains its own Redux slice with:
- Initial state from electron-store persistence
- RTK reducers for state updates
- Selectors for accessing state
- Manager slice for app-level state

### IPC Communication
- Main process handles system operations via IPC
- Renderer uses custom hooks (`useReadIpc`, `useWriteIpc`)
- Type-safe IPC channels defined in `shared/types/ipc.ts`

### WebSocket Message Handling
1. Message received via WebSocket
2. Routed through `socketDataStandardRouter` or `socketDataInternalRouter`
3. App-specific router processes the message
4. Validators ensure data integrity
5. Listeners update Redux state
6. UI components re-render

### Component Organization
- Presentational components in `components/`
- Container components handle business logic
- Modals for overlay interactions
- Styled components colocated with components