# 🏠 RealEstateX - Full-Stack Property Marketplace

A comprehensive real estate platform built with the MERN stack, featuring advanced-level authentication, advanced search capabilities, secure payment processing, personalized user wishlists, and detailed property tracking history.

## 🎯 Project Overview

RealEstateX is a modern property marketplace where users can list properties, search with advanced filters, manage favorites, track property history, and process secure transactions. Users can also manage their profiles by updating details such as email, name, phone, and bio. Built as a comprehensive MERN stack application showcasing production-level architecture and user experience design.

## ✨ Key Features

### 🔐Dual Authentication System

- **Multi-Provider OAuth**: Custom JWT authentication + Google OAuth integration
- **Session Persistence**: Automatic login state management across browser sessions
- **Secure Route Protection**: Custom Frontend routes preventing unauthorized access
- **Authentication State Sync**: Real-time auth state synchronization across components

### 🏡 Property Management

- **Property Listings**: Users can create, edit, and manage property listings
- **Advanced Search**: Multi-filter search system (location, price range, date)
- **Real-time Results**: Optimized database queries for instant search results
- **Property Details**: Comprehensive property information and image galleries

### 👤 User Profile System

- **Complete Profile Management**: Edit username, email, phone, bio
- **Avatar Upload**: Custom image upload with client-side compression
- **Google Integration**: Seamless profile sync with Google accounts
- **Profile Persistence**: Custom avatars preserved during OAuth login
- **Account Settings**: Comprehensive account management dashboard

### ❤️ User Experience Features

- **Favorites System**: Save and manage favorite properties
- **Viewing History**: Track property viewing history
- **User Dashboard**: Personalized user activity summary
- **Responsive Design**: Mobile-first, fully responsive interface

### 💳 Payment Integration

- **PayPal Integration**: Secure payment processing with PayPal sandbox
- **Transaction Security**: Encrypted payment data handling
- **Payment History**: Track transaction records

### 🎨 Modern UI/UX

- **Tailwind CSS**: Utility-first styling for consistent design
- **Loading States**: Comprehensive loading and error states
- **404 Error Handling**: Custom error pages for better navigation

## 🏗️ Technical Architecture

### Frontend Architecture

```
React Application
├── Global State (useContext + useReducer)
├── Local State (useState)
├── Custom Hooks (useAuth)
├── Protected Routes
└── Responsive Components (Tailwind CSS)
```

### Backend Architecture

```
Express.js Server
├── Controllers (Business Logic)
├── Models (Mongoose Schemas)
├── Middleware (Validation)
├── Routes (API Endpoints)
└── Utilities (Helpers)
```

### State Management Strategy

- **Global State**: User authentication, app-wide data (useContext + useReducer)
- **Local State**: Component-specific data, form inputs (useState)
- **Custom Hooks**: Reusable logic abstraction (useAuth hook)
- **No Prop Drilling**: Centralized state eliminates unnecessary prop passing

## 🛠️ Tech Stack

| Layer              | Technology               | Purpose                       |
| ------------------ | ------------------------ | ----------------------------- |
| **Frontend**       | React                    | Component-based UI framework  |
| **Styling**        | Tailwind CSS             | Utility-first CSS framework   |
| **Icons**          | React Icons              | FontAwesome icon integration  |
| **Routing**        | React Router             | Client-side navigation        |
| **State**          | Context API + useReducer | Global state management       |
| **Backend**        | Express.js               | Web application framework     |
| **Database**       | MongoDB + Mongoose       | NoSQL database with ODM       |
| **Authentication** | JWT + Google OAuth       | Secure multi-provider auth    |
| **Payments**       | PayPal SDK               | Secure payment processing     |
| **Security**       | Bcrypt + CORS            | Password hashing and security |

## ⚙️ Installation & Setup

### Prerequisites

- **Node.js** (v16+)
- **MongoDB** (local or Atlas)
- **PayPal Developer Account**
- **Google OAuth Credentials**

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/realestatex.git
cd REALSTATEX
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Configure your environment variables
npm start
```

## 🔑 Environment Setup

### Backend Environment Variables

```env
# Database Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/realestatex

# JWT Authentication
JWT_SECRET=your_super_secure_jwt_secret_key

# Google OAuth 2.0
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# PayPal Configuration
PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_paypal_sandbox_secret

# Server Configuration
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## 🔒 Security Features

- **JWT Token Security**: Secure token generation with expiration
- **Password Hashing**: Bcrypt with appropriate salt rounds
- **Input Sanitization**: Protection against XSS and injection attacks
- **CORS Configuration**: Properly configured cross-origin resource sharing
- **Route Protection**: Comprehensive authentication middleware
- **Secure File Upload**: Image validation and size restrictions
