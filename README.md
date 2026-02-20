# NCORE Website

A professional, responsive multi-page website for **NCORE** (Network for Cyber Online Rehabilitation and Empowerment) built with HTML5, CSS3, and vanilla JavaScript.

## 🌟 Features

- **Modern Design**: Cyber-themed design with dark navy blue (#0A192F) and cyber green (#00FF88) color scheme
- **Fully Responsive**: Mobile-first design that works perfectly on all devices
- **Interactive Elements**: Smooth animations, counters, modals, and form validation
- **Accessibility**: WCAG compliant with proper semantic HTML and focus management
- **Performance**: Optimized CSS and JavaScript for fast loading
- **Cross-browser**: Compatible with all modern browsers

## 📁 Project Structure

```
ncore-website/
│
├── index.html              # Homepage
├── about.html              # About Us page
├── colleges.html           # College Associations page
├── contact.html            # Contact page
│
├── css/
│   └── style.css          # Main stylesheet with all CSS
│
├── js/
│   └── script.js          # Main JavaScript file with all functionality
│
├── images/                 # Image assets directory
│   ├── colleges/          # College logos and images
│   ├── govt/              # Government agency logos
│   ├── advisory/          # Advisory board member photos
│   └── events/            # Event photos and graphics
│
├── assets/
│   └── pdfs/              # PDF resources and guides
│
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. For development, use a local server to avoid CORS issues

### Local Development Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 🎨 Design System

        ### Color Palette
        - **Primary White**: #FFFFFF (Pure white elements)
        - **Primary Navy**: #1a2332 (Text and accents)
        - **Primary Green**: #2E8B57 (Accent color)
        - **Background Light**: #f1f5f9 (Secondary backgrounds)
        - **Background White**: #f8fafc (Main background - subtle off-white)
        - **Text Primary**: #1a2332 (Main text)
        - **Text Secondary**: #4a5568 (Secondary text)

### Typography
- **Headings**: Poppins (Google Fonts)
- **Body Text**: Inter (Google Fonts)
- **Responsive sizing** using CSS clamp()

### Components
- **Cards**: Glassmorphism effect with subtle borders
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean, accessible form elements
- **Navigation**: Fixed header with mobile hamburger menu

## ⚡ JavaScript Features

### Core Functionality
- **Mobile Menu Toggle**: Responsive navigation for mobile devices
- **Animated Counters**: Number animations on scroll
- **Modal System**: Popup windows for detailed information
- **FAQ Accordion**: Collapsible FAQ sections
- **Form Validation**: Client-side form validation with error handling
- **Smooth Scrolling**: Smooth anchor link navigation
- **Scroll Effects**: Header transparency and scroll animations

### Interactive Elements
- **Event Filtering**: Filter events by category (Events page)
- **Counter Animations**: Animated statistics on homepage
- **Form Submissions**: Contact form and newsletter signup
- **Modal Popups**: Detailed information for partners and colleges

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Mobile-First Approach
- Base styles for mobile devices
- Progressive enhancement for larger screens
- Touch-friendly navigation and interactions
- Optimized layouts for all screen sizes

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of HTML5 semantic elements
- **ARIA Labels**: Screen reader support for interactive elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations
- **Reduced Motion**: Respects user's motion preferences

## 🔧 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+

## 📄 Page Descriptions

### Homepage (index.html)
- Hero section with call-to-action
- Impact counters with animations
- Feature highlights
- Preview sections for courses, events, and advisory board

### About Us (about.html)
- Mission and vision statements
- Company story and timeline
- Leadership team profiles
- Approach and methodology

### College Associations (colleges.html)
- Partner college information
- Chapter application process
- Success stories
- Partnership benefits

### Contact (contact.html)
- Contact form with validation
- Office information
- Department contacts
- Social media links

## 🎯 Customization

### Adding New Pages
1. Create new HTML file following existing structure
2. Include header and footer sections
3. Add navigation link in all pages
4. Follow CSS class naming conventions

### Modifying Styles
- Main styles are in `css/style.css`
- Use CSS custom properties (variables) for consistent theming
- Follow BEM methodology for class naming
- Test responsive behavior across all breakpoints

### Adding JavaScript Features
- Main functionality is in `js/script.js`
- Follow existing function naming conventions
- Use event delegation for dynamic content
- Ensure accessibility compliance

## 🚀 Performance Optimization

### CSS Optimizations
- CSS custom properties for consistent theming
- Efficient selectors and minimal specificity
- Critical CSS inlined for above-the-fold content
- Unused CSS removal

### JavaScript Optimizations
- Event delegation for dynamic content
- Debounced scroll and resize handlers
- Efficient DOM queries and caching
- Minimal bundle size

### Image Optimization
- Responsive images with appropriate sizing
- WebP format support (when available)
- Lazy loading for non-critical images
- Optimized file sizes

## 🔒 Security Considerations

- **Form Validation**: Client-side validation with server-side verification
- **XSS Prevention**: Proper HTML escaping and sanitization
- **CSRF Protection**: Implement for production forms
- **HTTPS**: Use HTTPS in production for secure connections

## 📈 Analytics & Tracking

The website is prepared for analytics integration:
- Structured data markup for SEO
- Event tracking hooks for user interactions
- Performance monitoring capabilities
- Conversion tracking setup

## 🌐 SEO Features

- **Meta Tags**: Comprehensive meta descriptions and keywords
- **Semantic HTML**: Proper heading hierarchy and structure
- **Open Graph**: Social media sharing optimization
- **Schema Markup**: Structured data for search engines
- **Sitemap Ready**: XML sitemap structure prepared

## 🧪 Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Navigation works on all devices
- [ ] Forms validate properly
- [ ] Modals open and close correctly
- [ ] Responsive design works on all screen sizes
- [ ] Accessibility features function properly
- [ ] Cross-browser compatibility verified

### Automated Testing
- HTML validation (W3C)
- CSS validation (W3C)
- JavaScript linting (ESLint recommended)
- Accessibility testing (axe-core recommended)

## 📝 License

This project is created for NCORE and is proprietary. All rights reserved.

## 🤝 Contributing

For internal development:
1. Follow existing code style and conventions
2. Test changes across all devices and browsers
3. Ensure accessibility compliance
4. Update documentation as needed

## 📞 Support

For technical support or questions about the website:
- **Email**: support@ncore.org
- **Phone**: +1 (555) 123-4567
- **Office Hours**: Mon-Fri 9:00 AM - 6:00 PM EST

## 🔄 Version History

- **v1.0.0** (Current): Initial release with all core pages and functionality
- Complete responsive design
- Interactive JavaScript features
- Accessibility compliance
- Cross-browser compatibility

---

**Built with ❤️ for NCORE - Building a safer digital world through education, collaboration, and innovation.**
# nCore
