# Gigante Fleur - Flower Shop Website

A modern, responsive React website for a bouquet and flower seller built with Tailwind CSS.

## Features

### 🌸 Core Functionality
- **Homepage**: Beautiful hero section with call-to-action buttons
- **Gallery**: Grid layout with filtering by flower type and occasion
- **Lightbox/Modal**: Click any image to view details in a modal
- **Upload Page**: Form to upload new flower/bouquet designs with image preview
- **About Page**: Business story, team information, and contact details
- **Responsive Navigation**: Mobile-friendly navbar with smooth scrolling

### 🎨 Design & UX
- **Modern Design**: Clean, minimal, professional aesthetic
- **Tailwind CSS**: Utility-first styling with custom color palette
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Hover effects and transitions throughout
- **Search Functionality**: Search gallery items by title or description

### 🚀 Technical Features
- **Local Storage**: Persist uploaded bouquets across sessions
- **Image Preview**: Preview uploaded images before submitting
- **Form Validation**: Comprehensive validation with error handling
- **Component Architecture**: Modular, reusable React components
- **Routing**: Client-side navigation with React Router

## Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Responsive navigation header
│   ├── Footer.js          # Footer with social links
│   └── FlowerModal.js     # Lightbox modal for gallery images
├── pages/
│   ├── Home.js           # Homepage with hero section
│   ├── Gallery.js        # Gallery with filters and search
│   ├── Upload.js         # Upload form with image preview
│   └── About.js          # About page with team info
├── App.js                # Main app component with routing
├── App.css               # App-specific styles
└── index.css             # Global styles and Tailwind imports
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open your browser**:
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## Usage Guide

### 🏠 Homepage
- View the hero banner with beautiful flower imagery
- Navigate to Gallery or Upload pages using call-to-action buttons
- Learn about the business features and values

### 🖼️ Gallery Page
- Browse all available bouquets in a responsive grid layout
- **Search**: Use the search bar to find specific bouquets
- **Filter**: Filter by flower type (roses, tulips, etc.) or occasion
- **View Details**: Click any bouquet to see full details in a modal
- **Responsive**: Grid adjusts from 1-3 columns based on screen size

### 📤 Upload Page
- **Image Upload**: Drag & drop or click to select images
- **Preview**: See your image before submitting
- **Form Fields**:
  - Title: Bouquet name (required)
  - Description: Detailed description (required)
  - Price: Optional pricing information
  - Category: Select flower type
  - Occasion: Choose the appropriate occasion
- **Validation**: All required fields are validated before submission
- **Local Storage**: Uploaded bouquets are saved and appear in the gallery

### ℹ️ About Page
- Business story and history
- Company values and mission
- Team member profiles
- Timeline of company milestones
- Contact information and hours

## Customization

### 🎨 Colors
The theme uses custom flower-themed colors defined in `tailwind.config.js`:
- `flower-pink`: Light pink background
- `flower-rose`: Primary rose color
- `flower-purple`: Accent purple
- `flower-green`: Success green

### 📱 Responsive Breakpoints
- Mobile: Default styles
- Tablet: `md:` breakpoint (768px)
- Desktop: `lg:` breakpoint (1024px)

### 🔧 Configuration Files
- `tailwind.config.js`: Tailwind CSS configuration
- `postcss.config.js`: PostCSS configuration
- `package.json`: Dependencies and scripts

## Browser Support

This website supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- **Optimized Images**: Uses Unsplash for high-quality, optimized images
- **Lazy Loading**: Images load as needed
- **Local Storage**: Reduces API calls by storing data locally
- **Component Optimization**: Efficient React component structure

## Future Enhancements

Potential features to add:
- E-commerce functionality with shopping cart
- User accounts and authentication
- Real backend API integration
- Advanced search with tags
- Social sharing features
- Customer reviews and ratings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for flower lovers everywhere
