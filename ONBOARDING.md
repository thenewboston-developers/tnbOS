# tnbOS Technical Architecture & Onboarding Guide

## Executive Summary

tnbOS is the decentralized peer-to-peer (P2P) engine powering [thenewboston.net](https://thenewboston.net) that enables real-time communication and data storage without centralized servers. It provides real-time communication, modular app hosting, and a cryptographically secure messaging system without centralized servers.

This guide explains:
- How tnbOS works as the **network core**  
- How it differs from Ethereum or Web2 systems  
- How developers can onboard quickly and start building apps  

---

## Core Architecture Overview

### 1. Technology Stack

```
┌─────────────────────────────────────────────┐
│              User Interface                 │
│         React + Redux + TypeScript          │
├─────────────────────────────────────────────┤
│            Application Layer                │
│     Individual Apps (Chat, Shop, Trade)     │
├─────────────────────────────────────────────┤
│             System Layer                    │
│   Core Components + State Management        │
├─────────────────────────────────────────────┤
│           Networking Layer                  │
│     WebSocket + TNB Protocol (Blocks)       │
├─────────────────────────────────────────────┤
│           Electron Main Process             │
│        IPC Bridge + Local Storage           │
└─────────────────────────────────────────────┘
```

### 2. Key Components

#### **Electron Architecture**
- **Main Process** (`src/main/`): Handles system operations, file storage, and IPC communication
- **Renderer Process** (`src/renderer/`): React application running in Chromium
- **Preload Scripts**: Secure bridge between main and renderer processes

#### **System Core** (`src/system/`)
- **WebSocket Manager**: Handles real-time p2p connections
- **Block Router**: Routes incoming messages to appropriate apps
- **Authentication System**: Cryptographic authentication using tweetnacl
- **State Management**: Redux stores for system-wide state

#### **Applications** (`src/apps/`)
- Each app is self-contained with its own:
  - Redux store
  - Message handlers (blocks)
  - UI components
  - Protocol validators

## How tnbOS Acts as the Core of the Network

The **thenewboston network** is a collection of P2P nodes communicating in real time.  
Each node runs **tnbOS** locally, so the entire network is created dynamically by its users.

### Core Responsibilities of tnbOS
1. **Peer Discovery** – Finds other nodes in the network  
2. **Block Routing** – Forwards signed messages to the right recipients  
3. **Authentication** – Every message is signed with Ed25519 cryptography  
4. **App Hosting** – Modular apps (Chat, Payments, Trading) run on top of tnbOS

**Note**: While tnbOS handles P2P networking and messaging, the **Core** repository (separate from tnbOS) maintains the blockchain ledger for account balances and transaction history. Together they form the complete thenewboston network infrastructure.  

### 1. P2P Communication Flow

```
User A                    Network                    User B
   │                         │                         │
   ├──── WebSocket ─────────>│                         │
   │     Connection          │                         │
   │                         │                         │
   ├──── Authenticate ──────>│                         │
   │   (Signed Token)        │                         │
   │                         │                         │
   ├──── Create Block ──────>│                         │
   │   (Signed Message)      │                         │
   │                         │                         │
   │                         ├──── Forward Block ─────>│
   │                         │                         │
   │                         │                    Validate
   │                         │                   Signature
   │                         │                       │
   │                         │                   Process
   │                         │                    Block
```

### 2. Block Structure (Core Message Format)

```typescript
interface Block {
  id: string;               // Unique identifier
  sender: string;           // Account number (public key)
  recipient: string;        // Recipient account number
  amount: number;           // Transaction amount (if applicable)
  transaction_fee: number;  // Network fee
  payload: {
    pid: string;           // Application ID (e.g., 'chat', 'shop')
    fn: string;            // Function name (e.g., 'setMessage')
    data: any;             // Application-specific data
  };
  signature: string;        // Cryptographic signature
}
```

### 3. Security & Authentication

#### **Account Generation**
- Uses tweetnacl for Ed25519 cryptographic operations
- Account number = Public key (32 bytes hex)
- Signing key = Private key (32 bytes hex)

#### **Authentication Flow**
1. Client generates timestamp
2. Signs timestamp with private key
3. Sends token: `accountNumber$timestamp$signature`
4. Server verifies signature using public key

#### **Message Security**
- Every block is cryptographically signed
- Recipients verify sender's signature
- Prevents message tampering and impersonation


## Understanding the Paradigm Shift

### Difference From Ethereum and Other Blockchains

| Feature              | Ethereum / EVM                  | tnbOS Network Core                     |
|----------------------|----------------------------------|-----------------------------------------|
| Architecture         | Global blockchain ledger        | P2P mesh network + Core blockchain       |
| Consensus            | Proof-of-Stake / Proof-of-Work   | Direct peer messaging + Core validators  |
| Programming          | Solidity Smart Contracts        | TypeScript apps inside Electron          |
| Data Storage         | On-chain / IPFS                 | Local Electron store with sync           |
| Latency              | Block time delays (12–15s)       | Real-time WebSocket communication        |
| Costs                | Gas fees per transaction        | Minimal transaction fees (1 unit)        |

---

### Why This Approach Is Powerful

- **Zero Downtime**: No central server to fail  
- **Privacy First**: Data lives on user devices  
- **Minimal Fees**: Small transaction fees (1 unit) for network maintenance  
- **Real-Time**: WebSocket-based instant messaging  
- **Modular Apps**: Anyone can build apps on top of tnbOS  

---

### Web2 → tnbOS Migration Guide
#### **From Centralized to Decentralized**

| Web2 Concept           | tnbOS Equivalent                |
|------------------------|----------------------------------|
| REST API               | Signed Blocks over WebSocket      |
| Central Database        | Local-First Electron Storage      |
| Session/Cookie Auth      | Public/Private Key Authentication |
| Server-Side Logic        | Client-Side Modular Apps          |
| HTTP Request/Response    | P2P Real-Time Messaging           |
| User ID | Account Number (Public Key) |
| Password | Signing Key (Private Key) |

### Example Comparison  
**Web2:**
```
Client → HTTP Request → Server → DB → Response → Client
```

**tnbOS:**
```
Client A → Signed Block → P2P Network → Client B (Verified)
```

## Application Development Model

### 1. App Registration Pattern

Each app must register with the system:

```typescript
const AppRegistration = {
  appId: 'myapp',              // Unique identifier
  icon: AppIcon,               // Visual representation
  reducer: appReducer,         // Redux reducer
  router: appRouter,           // Message router
  initializer: loadAppData,    // Data loader
};
```

### 2. Message Handling Flow

```
Incoming Block
     │
     ▼
Block Router ──────> Validate PID
     │
     ▼
App Router ────────> Validate Function
     │
     ▼
Listener ──────────> Validate Data
     │
     ▼
Redux Store ───────> Update UI
```

### 3. Creating a New App

```typescript
// 1. Define your protocol
enum MyAppFn {
  sendData = 'sendData',
  receiveData = 'receiveData'
}

// 2. Create validators
const sendDataValidator = yup.object({
  message: yup.string().required(),
  timestamp: yup.number().required()
});

// 3. Implement listeners
const sendDataListener = (block, dispatch, networkId) => {
  const { payload } = block;
  dispatch(addData(payload.data));
};

// 4. Set up router
const appRouter = (block, dispatch, networkId) => {
  const handlers = {
    [MyAppFn.sendData]: sendDataListener,
  };
  handlers[block.payload.fn](block, dispatch, networkId);
};
```

### Development Workflow

#### **1. Environment Setup**
```bash
# Install dependencies
npm install

# Start development
npm start

# Run linting
npm run lint

# Build for production
npm run package
```

#### **2. Understanding Data Flow**

**Traditional Web2:**
```
Client → HTTP Request → Server → Database
                         ↓
Client ← HTTP Response ← Server
```

**tnbOS P2P:**
```
Client A → Signed Block → Network → Client B
    ↓                                    ↓
Local Store                        Local Store
```

#### **3. State Management**

- **System State**: Global state (accounts, networks, balances)
- **App State**: Application-specific state
- **Persistent State**: Electron-store for offline data

```typescript
// Reading system state
const account = useSelector(getSelf);
const networks = useSelector(getNetworks);

// Writing to app state
dispatch(addMessage(newMessage));

// Persisting data
ipcRenderer.send('set-local-electron-store', {
  key: 'chat.messages',
  value: messages
});
```

#### **4. Network Communication**

**Sending a message:**
```typescript
// Create unsigned block
const unsignedBlock = {
  amount: 0,
  id: crypto.randomUUID(),
  payload: {
    pid: 'chat',
    fn: 'setMessage',
    data: { text: 'Hello' }
  },
  recipient: recipientAccountNumber,
  sender: myAccountNumber,
  transaction_fee: 1
};

// Sign and send
const signedBlock = signData(unsignedBlock, signingKey);
await createBlock(signedBlock, networkId);
```

### Security Best Practices

1. **Never expose signing keys** in UI or logs
2. **Always validate incoming blocks** before processing
3. **Use Yup schemas** for data validation
4. **Implement rate limiting** for network requests
5. **Store sensitive data encrypted** in Electron store

### Common Patterns

#### **1. Peer Discovery**
```typescript
// Request peers from network
const getPeersRequest = {
  method: 'getPeers',
  correlation_id: uuid()
};
socket.send(JSON.stringify(getPeersRequest));
```

#### **2. Online Status Tracking**
```typescript
// Track when accounts come online
const trackOnlineStatus = {
  type: 'trackOnlineStatus',
  account_numbers: [accountA, accountB]
};
```

#### **3. Message Delivery Confirmation**
```typescript
// Send delivery status
const deliveryBlock = {
  payload: {
    pid: 'chat',
    fn: 'setDeliveryStatus',
    data: {
      message_id: originalMessageId,
      status: 'delivered'
    }
  }
};
```

## Advanced Concepts

### 1. Network Synchronization

- **Peer Sync**: Automatic discovery and connection to peers
- **Block Propagation**: Messages forwarded through network
- **Conflict Resolution**: Last-write-wins for concurrent updates

### 2. Application Interoperability

Apps can interact through:
- **Shared State**: System-level stores
- **Cross-App Messaging**: Blocks with multiple PIDs
- **Common Protocols**: Standardized message formats

### 3. Scaling Considerations

- **Local Storage Limits**: Electron store constraints
- **Network Bandwidth**: WebSocket message size
- **Peer Discovery**: Limited by network topology

## Debugging & Development Tools

### 1. Chrome DevTools
- Access via View → Toggle Developer Tools
- Network tab shows WebSocket frames
- Redux DevTools for state inspection

### 2. Logging
```typescript
// Network blocks logged automatically
logNetworkBlock(block, networkId);

// Custom logging
console.log('[MyApp]', 'Processing block:', block);
```

### 3. Testing
```bash
# Run tests
npm run test

# Test specific app
npm run test -- apps/Chat
```

## FAQ for New Developers

**Q: How is this different from blockchain?**
A: tnbOS is not a blockchain. It's a p2p messaging network with cryptographic signatures. No mining, no consensus mechanism, just direct peer communication.

**Q: Where is user data stored?**
A: Locally in Electron store on each user's device. When peers connect, they can sync data.

**Q: How do payments work?**
A: The network has its own currency tracked through signed transactions. Account balances and transaction history are maintained by the Core blockchain nodes, while tnbOS handles the P2P message routing.

**Q: Can I use traditional databases?**
A: You can integrate external services, but the core philosophy is local-first, decentralized storage.

**Q: How do I handle offline users?**
A: Messages queue locally and send when recipients come online. Apps should handle offline-first scenarios.

## Getting Started Checklist

- [ ] Understand Electron main/renderer process architecture
- [ ] Learn Redux Toolkit for state management
- [ ] Review tweetnacl for cryptography basics
- [ ] Study existing app implementations (Chat is simplest)
- [ ] Understand block structure and validation
- [ ] Practice with WebSocket debugging
- [ ] Review TypeScript strict mode patterns
- [ ] Familiarize with Yup validation schemas

## Resources

- **Electron Documentation**: https://www.electronjs.org/
- **Redux Toolkit**: https://redux-toolkit.js.org/
- **TweetNaCl**: https://tweetnacl.js.org/
- **WebSocket API**: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

## Support

For questions and issues:
- GitHub Issues: https://github.com/thenewboston-developers/tnbOS/issues
- Review existing apps in `src/apps/` for examples
- Check `CLAUDE.md` for development guidelines