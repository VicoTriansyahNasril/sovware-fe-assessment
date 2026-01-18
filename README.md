# 🚀 Sovware Frontend Assessment - Flow Builder

A high-performance, pixel-perfect simplified version of Apache NiFi's flow builder. Built with modern React ecosystem focusing on Clean Code, Strict Typing, and Enterprise Architecture.

![App Screenshot](https://via.placeholder.com/800x400?text=Sovware+Flow+Builder)

## ✨ Key Features

### 1. Authentication Module (`/features/auth`)

- **Secure Login**: Mock API integration with loading states and error handling.
- **Splash Screen**: Smooth transition animation upon successful login.
- **Session Management**: Zustand persist middleware for token storage.
- **Logout Confirmation**: Modal confirmation before clearing session.

### 2. Dashboard (`/features/dashboard`)

- **Class Management**: Interactive list of design classes.
- **Pixel Perfect UI**: Custom search bar, sidebar navigation, and status indicators matching Figma.
- **Flow Versioning**: Modal to select/create flow versions before entering design mode.

### 3. Flow Builder Canvas (`/features/flow`)

- **Powered by React Flow**: High-performance canvas engine.
- **Floating Controls**: Custom toolbar overlay for better UX.
- **Drag & Drop**: Add processors via modal selection.
- **Connection Logic**:
  - Custom Edge with "Success" labels.
  - Validation (prevent self-loops).
  - Connection Modal configuration.
- **Keyboard Shortcuts**:
  - `Delete` / `Backspace`: Remove selected nodes/edges.
  - `Shift + Drag`: Multi-selection.

### 4. Publish System

- **Validation Engine**: Checks for isolated nodes before publishing.
- **JSON Preview**: Live preview of the generated flow configuration.
- **Success Feedback**: Custom toast notification with progress bar.

---

## 🛠️ Tech Stack

- **Core**: React 18 (Vite), TypeScript
- **Styling**: Tailwind CSS, HeroUI (NextUI)
- **State Management**: Zustand
- **Canvas Engine**: @xyflow/react (React Flow 12)
- **Icons**: Lucide React, React Icons
- **Animation**: Framer Motion
- **Utilities**: React Hot Toast, CLSX

---

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository

    ```bash
    git clone https://github.com/VicoTriansyahNasril/sovware-fe-assessment.git
    cd sovware-fe-assessment
    ```

2.  Install dependencies

    ```bash
    npm install
    ```

3.  Start development server

    ```bash
    npm run dev
    ```

4.  Open `http://localhost:5173` in your browser.

### Login Credentials

- **Email**: `admin@sovware.com`
- **Password**: `admin123`

---

## 🐳 Docker Deployment

Build and run the application in a production-ready Nginx container.

1.  **Build Image**

    ```bash
    docker build -t sovware-fe .
    ```

2.  **Run Container**

    ```bash
    docker run -p 8080:80 sovware-fe
    ```

3.  Access at `http://localhost:8080`

---

## 📂 Project Structure (Feature-Based)

src/
├── components/ # Shared UI components (Buttons, Inputs, Layouts)
├── features/ # Feature-specific logic & components
│ ├── auth/ # Authentication feature
│ ├── dashboard/ # Dashboard feature
│ └── flow/ # Flow Builder feature (Canvas, Nodes, Modals)
├── pages/ # Page composition roots
├── store/ # Global Zustand stores
└── utils/ # Helper functions

---

## ✅ Assessment Checklist

- [x] **User Authentication**: Login, Validation, Token Storage.
- [x] **Design Flow**: Canvas, Custom Nodes, Toolbar.
- [x] **Processor Connection**: Connect nodes, Custom Edges.
- [x] **Publish Design**: Validation, JSON Output, Success Toast.
- [x] **Bonus**: Docker Support, Strict TypeScript, Clean Code.

---
