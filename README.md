# Wave Mirissa - E-Commerce Jewelry Platform

A modern, AI-powered e-commerce platform for jewelry with advanced features including virtual try-on, AI-powered jewelry recommendations, 3D product visualization, and admin dashboard management.

**🌐 Live Demo:** [https://wave-mirissa-frontend.vercel.app/](https://wave-mirissa-frontend.vercel.app/)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Project Structure](#project-structure)
- [Running the Project](#running-the-project)
- [Building for Production](#building-for-production)
- [Backend API](#backend-api)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Customer Features

- **AI-Powered Jewelry Recommendations** - Get personalized jewelry suggestions based on facial features and preferences
- **Virtual Try-On** - Try jewelry virtually using personality-based recommendations
- **3D Product Viewer** - Interactive 3D model viewing and customization with GLB format support
- **Product Customization** - Customize jewelry designs with different options
- **Shopping Cart & Checkout** - Complete e-commerce shopping experience
- **Order Management** - Track and manage orders with detailed status updates
- **User Authentication & Profiles** - Secure login and personalized user profiles
- **Wishlist** - Save favorite products for later purchase
- **Multiple Payment Methods** - PayHere integration for secure payments
- **Product Reviews** - Rate and review purchased products
- **Responsive Design** - Fully responsive across all devices

### Admin Features

- **Comprehensive Admin Dashboard** - Manage entire store operations
- **Product Management** - Add, edit, and delete products with customization options
- **Order Management** - View, track, and manage customer orders
- **User Management** - Manage user accounts and permissions
- **Email Notifications** - Send automated emails to customers
- **Analytics & Reports** - Track sales, orders, and user metrics
- **Customization Management** - Manage jewelry customization options

---

## 🛠️ Tech Stack

### Frontend

- **React 19.1** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v7** - Client-side routing
- **Material-UI (MUI)** - Component library
- **Axios** - HTTP client
- **Framer Motion** - Smooth animations
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js

### Additional Libraries

- **Chart.js & React-ChartJS-2** - Data visualization
- **Lottie** - Animation library
- **React Toastify & React Hot Toast** - Notifications
- **PayHere SDK** - Payment integration
- **XLSX** - Excel file handling
- **jsPDF** - PDF generation
- **Cloudinary** - Image storage and optimization

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher) or **yarn**
- **Git**

---

## 🚀 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Yasindu-Navo/Wave_Mirissa-FE.git
cd Wave_Mirissa-FE
```

2. **Install dependencies:**

```bash
npm install
```

or if using yarn:

```bash
yarn install
```

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory and add the following environment variables:

```env
# Backend API URL
VITE_API_URL=http://localhost:8080/api

# Payment Gateway
VITE_PAYHERE_MERCHANT_ID=your_merchant_id

# Image Upload
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Other configurations
VITE_APP_NAME=Wave Mirissa
```

**Note:** Replace the values with your actual credentials.

---

## 📁 Project Structure

```
src/
├── api/                          # API integration and axios configuration
├── assets/                       # Images, vectors, and static files
│   ├── about us/
│   ├── bestSeller/
│   ├── bridal/
│   ├── CustomizationSamples/
│   ├── sampleProducts/
│   ├── story/
│   └── videos/
├── components/                   # Reusable React components
│   ├── admin/                    # Admin-specific components
│   │   ├── AddProductModel.jsx
│   │   ├── EditProductModal.jsx
│   │   ├── OrderModel.jsx
│   │   ├── Sidebar.jsx
│   │   └── ...
│   ├── AI_suggestion/            # AI recommendation features
│   │   ├── FaceImageUpload.jsx
│   │   ├── JewelryRecommendations.jsx
│   │   └── ...
│   ├── HomePage/                 # Homepage components
│   │   ├── HeroCarousel.jsx
│   │   ├── BestsellersSection.jsx
│   │   ├── CategoryGrid.jsx
│   │   └── ...
│   ├── PersonalityVirtualTryon/  # Virtual try-on features
│   ├── ProductPreview/           # Product display components
│   ├── MyOrder/                  # Order-related components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Cart.jsx
│   ├── Login.jsx
│   ├── SignUp.jsx
│   └── ...
├── 3d view/                      # 3D model handling
│   ├── GlbViewer.jsx
│   └── GlbUploader.jsx
├── pages/                        # Page components
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── CheckoutPage.jsx
│   ├── AI_Suggetion.jsx
│   ├── VirtualTryOn.jsx
│   ├── UserProfile.jsx
│   ├── Myorders.jsx
│   ├── WishlistPage.jsx
│   ├── admin/
│   └── ...
├── context/                      # React Context for state management
│   ├── AuthContext.jsx
│   └── CartProvider.jsx
├── utils/                        # Utility functions
│   └── calcPrice.js
├── payhere/                      # PayHere payment integration
├── App.jsx
├── main.jsx
├── index.css
└── App.css

Configuration Files:
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── eslint.config.js             # ESLint configuration
└── package.json                 # Dependencies and scripts
```

---

## 🏃 Running the Project

### Development Mode

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Preview Build

Preview the production build locally:

```bash
npm run preview
```

---

## 🏗️ Building for Production

Build the project for production:

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

---

## ✅ Linting

Run ESLint to check code quality:

```bash
npm run lint
```

---

## 🔗 Backend API

This frontend application works with the Wave Mirissa Backend API built with Java Spring Boot.

**Backend Repository:** [https://github.com/Yasindu-Navo/Wave_Mirissa-BE.git](https://github.com/Yasindu-Navo/Wave_Mirissa-BE.git)

### Setting Up Backend

1. Clone the backend repository:

```bash
git clone https://github.com/Yasindu-Navo/Wave_Mirissa-BE.git
cd Wave_Mirissa-BE
```

2. Follow the backend README for setup instructions

3. Ensure the backend API is running on the configured `VITE_API_URL` (default: `http://localhost:8080/api`)

---

## 📝 Key Features Implementation

### AI Jewelry Recommendations

- Upload facial image
- Receive personalized jewelry recommendations based on analysis
- View detailed recommendations with styling tips

### Virtual Try-On

- Personality-based questionnaire
- Jewelry recommendations based on personality type
- Interactive try-on visualization

### 3D Product Viewer

- Upload and view GLB 3D models
- Interactive rotation and zoom
- Product customization options

### Admin Dashboard

- Monitor sales and revenue
- Manage inventory
- Process orders
- Send notifications to customers
- Manage user accounts

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact & Support

For support or inquiries, please contact the development team or open an issue in the repository.

---

## 🎯 Future Enhancements

- [ ] Enhanced AR try-on features
- [ ] Machine learning-based recommendation engine
- [ ] Multi-language support
- [ ] Advanced inventory management
- [ ] Customer analytics and insights
- [ ] Mobile app development

---

**Built with ❤️ by the Wave Mirissa Team**
