# 🚌 BusLine - Modern Bus Transportation Platform

A comprehensive bus transportation web application built with React, featuring role-based dashboards for admins, drivers, and students with real-time booking, trip management, and advanced UI/UX.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Usage](#-usage)
- [Authentication](#-authentication)
- [Dashboards](#-dashboards)
- [Styling & Design](#-styling--design)
- [Features in Detail](#-features-in-detail)
- [Performance Optimizations](#-performance-optimizations)
- [Contributing](#contributing)
- [Acknowledgments](#-acknowledgments)
- [Team](#-team)

## ✨ Features

### 🎯 Core Features

- **Multi-Role Authentication**: Admin, Driver, and Student login systems
- **Real-time Booking**: Interactive booking system with live trip updates
- **Admin Dashboard**: Complete CRUD operations for users, drivers, buses, trips, and destinations
- **Driver Dashboard**: Trip management, passenger tracking, and earnings overview
- **Student Dashboard**: Book trips, view history, and track buses
- **Modern UI/UX**: Professional, responsive design with smooth animations

### 🚀 Advanced Features

- **Google Maps Integration**: Interactive maps with destination plotting
- **Toast Notifications**: Modern, user-friendly feedback system
- **Search & Filtering**: Advanced search and sorting across all dashboards
- **Reviews System**: Customer testimonials and rating system
- **Real-time Updates**: Live trip status and booking confirmations

## 🛠 Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Advanced animations and transitions
- **React Router** - Client-side routing
- **React Hot Toast** - Modern notification system

### Backend

- **Repository**: [Bus-Line Backend](https://github.com/AhmedY29/Bus-Line-Backend)
- **Technology**: Node.js with TypeScript
- **Express** - Fast, unopinionated web framework
- **bcrypt** - Secure password hashing for authentication
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication system
- **API**: RESTful API endpoints
- **File Upload**: Cloudinary integration for image management
- **Socket.io** - Real-time bidirectional event-based communication and tracking

### UI Libraries

- **React Icons** - Comprehensive icon library
- **Lucide React** - Beautiful & consistent icons
- **Tailwind Scrollbar Hide** - Custom scrollbar styling

### Maps & Integration

- **Mapbox GL JS** - Interactive maps and navigation
- **Axios** - HTTP client for API requests
- **Socket.io Client** - Real-time communication
- **Cloudinary** - Image and asset management platform

### Deployment & Hosting

- **Render** - Cloud platform for hosting server-side and full-stack applications

## 📸 Screenshots

### 🏠 Landing Page

![Landing Page](./public/HomePage.png)
_Modern, clean homepage with trip booking and driver registration options_

### 🎓 Student Dashboard

![Student Dashboard](./public/StudentPage.png)
_Comprehensive student portal with booking management, trip history, and real-time tracking_

### 🚗 Driver Dashboard

![Driver Dashboard](./public/DriverPage.png)
_Professional driver interface with trip management, passenger details, and performance metrics_

### 👨‍💼 Admin Dashboard - Users Management

![Admin Users Dashboard](./public/AdminPage.png)
_Complete user management system with role-based access control and CRUD operations_

### 🚌 Admin Dashboard - Drivers Management

_Advanced driver management with application approval, document verification, and performance tracking_

### 🗺️ Admin Dashboard - Destinations Management

_Interactive destination management with Google Maps integration and coordinate extraction_

### 📱 Responsive Design

_Mobile-optimized interface ensuring seamless experience across all devices_

### 🔐 Authentication System

_Secure login and registration with role-based redirection_

## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

## 📖 Usage

### Getting Started

1. **Home Page**: Browse available trips and view travel packages
2. **Authentication**: Register as a student or driver, or login as admin
3. **Booking**: Select trips, payment, and complete bookings
4. **Dashboard**: Access role-specific features and management tools

### User Roles

#### 👨‍💼 Admin

- Manage users, drivers, buses, trips, and destinations
- View analytics and generate reports
- Approve/reject driver applications
- System-wide configuration

#### 🚗 Driver

- View assigned trips and passenger lists
- Update trip status and manage earnings
- Upload driver licenses

#### 🎓 Student

- Browse and book available trips
- View booking history and trip details
- Track buses in real-time
- Leave reviews and ratings

## 🔐 Authentication

The application uses JWT-based authentication with role-based access control:

- **JWT Tokens**: Stored in localStorage
- **Role Validation**: Client-side route protection
- **Protected Routes**: Admin, driver, and student specific pages
- **Auto-redirect**: Based on user roles after login

### Login Credentials

```javascript
// Admin
email: "admin@busline.com";
password: "admin123";

// Driver
email: "driver@busline.com";
password: "driver123";

// Student
email: "student@busline.com";
password: "student123";
```

## 📊 Dashboards

### Admin Dashboard Features

- **Users Management**: CRUD operations with search/filter
- **Drivers Management**: Approve/reject applications, manage documents
- **Buses Management**: Vehicle registration, maintenance tracking
- **Trips Management**: Route planning, schedule management
- **Destinations Management**: Google Maps integration, coordinate extraction

### Driver Dashboard Features

- **Trip Overview**: Assigned trips and passenger details
- **Earnings Tracker**: Revenue reports and payment history
- **Vehicle Management**: Document uploads, inspection status

### Student Dashboard Features

- **Trip Booking**: Search, filter, and book available trips
- **Booking History**: Past and upcoming trip details
- **Live Tracking**: Real-time bus location tracking
- **Reviews & Ratings**: Leave feedback for completed trips

## 🎨 Styling & Design

### Design System

- **Color Scheme**: Blue primary (#0165AD), professional grays
- **Typography**: Modern, readable font hierarchy
- **Spacing**: Consistent padding and margins
- **Animations**: Smooth transitions and micro-interactions

### Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Tablet Support**: Medium screen adaptations
- **Desktop**: Full-featured desktop experience
- **Accessibility**: WCAG compliant components

## 📱 Features in Detail

### Google Maps Integration

- **Destination Plotting**: Add destinations via Google Maps URLs
- **Coordinate Extraction**: Auto-extract lat/lng from various URL formats
- **Short URL Support**: Handle maps.app.goo.gl links
- **Interactive Maps**: Real-time bus tracking and route visualization

### Image Upload System

- **File Validation**: Type and size checking
- **Progress Indicators**: Upload status feedback
- **Preview Functionality**: Image thumbnails
- **Error Handling**: Comprehensive error messages

### Toast Notification System

- **Modern Design**: Custom styled notifications
- **Multiple Types**: Success, error, warning, info
- **Confirmation Dialogs**: Replace browser alerts
- **Auto-dismiss**: Configurable timeout settings

## 🚀 Performance Optimizations

- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Component lazy loading
- **Image Optimization**: Compressed assets
- **Bundle Analysis**: Optimized build size
- **Caching Strategy**: Efficient API response caching

### Code Quality

- **ESLint**: Configured for React and modern JavaScript
- **Prettier**: Code formatting (recommended)
- **Git Hooks**: Pre-commit quality checks
- **Component Testing**: Jest and React Testing Library

### Contribution Guidelines

- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all checks pass before submitting

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for utility-first styling
- Mapbox for mapping services
- All open-source contributors

## 👥 Team

- **أحمد الصالح**
- **ذكرى الجغثمي**
- **سليمان الفوزان**
- **سحر فارس**

---
