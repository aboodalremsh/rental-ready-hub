# RentEase - Property Rental Platform

A modern, full-stack property rental application built with React, JavaScript, and Lovable Cloud. RentEase connects property owners with renters, offering a seamless experience for browsing, saving, and renting properties.

![RentEase](https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=400&fit=crop)

## 🔗 Links

- **GitHub Repository**: [View on GitHub](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME)

## 🏠 Features

### For Renters
- **Browse Properties** - Explore available apartments, offices, studios, penthouses, and commercial spaces
- **Advanced Filtering** - Search by location, property type, and price range
- **Save Favorites** - Save properties to your personal list for later review
- **Rental Applications** - Submit rental applications directly through the platform
- **Dashboard** - Track all your rental applications and their status

### For Property Owners
- **List Properties** - Add properties with detailed descriptions, images, and amenities
- **Manage Listings** - Update property status (available, rented, maintenance)
- **Track Rentals** - Monitor rental applications and tenant information

### General Features
- **User Authentication** - Secure signup and login with email
- **Responsive Design** - Fully responsive UI that works on all devices
- **Real-time Updates** - Live updates for property availability and application status
- **Contact System** - Built-in contact form for inquiries

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **JavaScript (ES6+)** - Clean, readable code with JSDoc type hints
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **React Query** - Server state management
- **React Hook Form** - Form handling with Zod validation

### Backend (Lovable Cloud)
- **Node.js** - Server-side JavaScript runtime
- **PostgreSQL Database** - Robust relational database
- **Row Level Security (RLS)** - Secure data access policies
- **Authentication** - Built-in auth with email/password
- **Real-time Subscriptions** - Live data updates

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout components
│   ├── ui/              # shadcn/ui components (JSX)
│   └── NavLink.jsx      # Navigation link component
├── hooks/
│   ├── useAuth.jsx      # Authentication hook
│   ├── useTheme.jsx     # Theme management hook
│   ├── use-toast.js     # Toast notification hook
│   └── use-mobile.jsx   # Mobile detection hook
├── integrations/
│   └── supabase/        # Supabase client and types
├── pages/
│   ├── Index.jsx        # Landing page
│   ├── Properties.jsx   # Property listings
│   ├── PropertyDetail.jsx # Single property view
│   ├── Dashboard.jsx    # User dashboard
│   ├── Auth.jsx         # Login/Signup page
│   ├── About.jsx        # About page
│   ├── Services.jsx     # Services page
│   ├── Contact.jsx      # Contact form
│   └── NotFound.jsx     # 404 page
├── types/
│   └── property.js      # Property type definitions (JSDoc)
├── lib/
│   └── utils.js         # Utility functions
└── App.jsx              # Main app component with routes
```

## 🗄️ Database Schema

### Tables

| Table | Description |
|-------|-------------|
| `profiles` | User profile information |
| `properties` | Property listings with details |
| `rentals` | Rental applications and contracts |
| `saved_properties` | User's saved/favorited properties |
| `contact_messages` | Contact form submissions |

### Enums

- **property_type**: `apartment`, `office`, `studio`, `penthouse`, `commercial`
- **property_status**: `available`, `rented`, `maintenance`
- **rental_status**: `pending`, `approved`, `rejected`, `completed`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or bun

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser

## 📱 Pages Overview

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with featured properties and stats |
| `/properties` | Properties | Browse all available properties with filters |
| `/properties/:id` | Property Detail | Detailed view of a single property |
| `/dashboard` | Dashboard | User's rental applications (protected) |
| `/auth` | Authentication | Login and signup forms |
| `/about` | About | Company information and team |
| `/services` | Services | Services offered to renters and owners |
| `/contact` | Contact | Contact form and company details |

## 🔐 Authentication

The app uses email/password authentication with the following features:
- Secure signup with email verification
- Protected routes for authenticated users
- Persistent sessions
- Profile management

## 🎨 Design System

The project uses a custom design system built on Tailwind CSS with:
- Semantic color tokens (primary, secondary, accent, etc.)
- Consistent spacing and typography
- Dark/Light mode support
- Responsive breakpoints

## 🧪 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `@supabase/supabase-js` | Database and auth client |
| `@tanstack/react-query` | Server state management |
| `framer-motion` | Animations |
| `lucide-react` | Icons |
| `react-hook-form` | Form handling |
| `zod` | Schema validation |
| `date-fns` | Date formatting |
| `sonner` | Toast notifications |

## 🌐 Deployment

The app can be deployed via Lovable:
1. Click **Share** → **Publish** in the Lovable editor
2. Your app will be live at `yourproject.lovable.app`

For custom domains, go to **Project** → **Settings** → **Domains**.

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This project is maintained through Lovable. To contribute:
1. Make changes in Lovable or push to the connected GitHub repository
2. Changes sync automatically between Lovable and GitHub

---
