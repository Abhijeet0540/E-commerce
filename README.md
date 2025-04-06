# Furni - E-commerce Furniture Store

![Furni E-commerce](images/sofa.png)

## Overview

Furni is a responsive e-commerce website for a furniture store, built with HTML, CSS, and JavaScript. The project features a complete shopping experience including product browsing, cart management, user authentication, checkout process, and responsive design for all device sizes.

## Features

### User Authentication
- User registration and login system
- Form validation for all input fields
- Secure password handling
- User session management using localStorage

### Product Management
- Browse products by category
- Product details page with images and descriptions
- Related products suggestions
- Search functionality

### Shopping Cart
- Add/remove items from cart
- Update product quantities
- Persistent cart data across sessions
- Real-time cart total calculation

### Checkout Process
- Multi-step checkout form
- Address and payment information collection
- Form validation
- Order summary
- Coupon code application
- Integration with Stripe payment gateway

### Responsive Design
- Mobile-first approach
- Adapts to all screen sizes (mobile, tablet, desktop)
- Touch-friendly interface
- Optimized images and assets

### Error Handling
- User-friendly error messages
- Payment error handling
- Form validation feedback
- Automatic redirect from error pages

## Technologies Used

- **HTML5** - Structure and content
- **CSS3** - Styling and animations
- **JavaScript** - Client-side functionality
- **Bootstrap** - Responsive grid system and components
- **Font Awesome** - Icons
- **Stripe API** - Payment processing
- **LocalStorage API** - Client-side data persistence
- **SweetAlert2** - Enhanced alert dialogs

## Project Structure

```
├── css/                  # CSS stylesheets
│   ├── bootstrap.min.css # Bootstrap framework
│   ├── style.css         # Main stylesheet
│   ├── tiny-slider.css   # Slider component styles
│   └── login.css         # Authentication page styles
├── js/                   # JavaScript files
│   ├── bootstrap.bundle.min.js # Bootstrap JavaScript
│   ├── custom.js         # Custom site-wide scripts
│   ├── cart.js           # Cart functionality
│   ├── checkout.js       # Checkout process
│   ├── login.js          # Authentication scripts
│   └── tiny-slider.js    # Slider functionality
├── images/               # Image assets
├── index.html            # Homepage
├── shop.html             # Product listing
├── cart.html             # Shopping cart
├── checkout.html         # Checkout process
├── login.html            # User authentication
├── thankyou.html         # Order confirmation
├── error.html            # Error page
└── README.md             # Project documentation
```

## Responsive Design Features

- **Fluid Grid Layout**: Adapts to different screen sizes
- **Flexible Images**: Scale appropriately across devices
- **Media Queries**: Tailored styles for different viewport sizes
- **Touch-Friendly Elements**: Larger tap targets on mobile
- **Mobile Navigation**: Collapsible menu for smaller screens
- **Responsive Typography**: Font sizes adjust for readability

### Recent Responsive Improvements

#### Login Page
- Redesigned login/signup form for all device sizes
- Added mobile navigation for authentication forms
- Improved input field styling and accessibility
- Enhanced password visibility toggle
- Optimized spacing and layout for small screens

#### Payment Error Page
- Created fully responsive error message display
- Added animated error icon with visual feedback
- Implemented dynamic error messaging based on error type
- Added automatic redirect with countdown timer
- Improved button layout for mobile devices
- Enhanced readability on small screens

### Responsive Design Best Practices Implemented

- **Mobile-First Approach**: Started with mobile designs and scaled up
- **Responsive Units**: Used relative units (%, em, rem, vh, vw) instead of fixed pixels
- **Breakpoints**: Strategic media queries at standard device widths
- **Flexible Images**: `max-width: 100%` to ensure images scale properly
- **Progressive Enhancement**: Core functionality works on all devices with enhanced experiences on larger screens
- **Touch Targets**: Minimum size of 44×44 pixels for interactive elements on mobile
- **Simplified Navigation**: Collapsible menus and prioritized content for small screens
- **Performance Optimization**: Minimized CSS and optimized assets for faster loading on mobile networks
- **Testing**: Cross-browser and cross-device testing throughout development

## Setup and Installation

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/furni-ecommerce.git
   cd furni-ecommerce
   ```

2. **Open the project**
   - You can use any web server or simply open the `index.html` file in a browser
   - For local development, you can use tools like Live Server in VS Code

3. **Stripe Integration**
   - Replace the Stripe test key in `checkout.js` with your own key
   - Set up your Stripe account to handle payments

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Testing Responsive Design

### Using Browser Developer Tools
1. Open the website in Chrome, Firefox, or Edge
2. Right-click and select "Inspect" or press F12
3. Click on the "Toggle device toolbar" icon (or press Ctrl+Shift+M)
4. Select different device presets or manually resize the viewport
5. Test interactions and verify layouts at various breakpoints:
   - Mobile: 320px - 576px
   - Tablet: 577px - 991px
   - Desktop: 992px and above

### Real Device Testing
For the best results, test on actual devices:
- Various smartphones (iOS and Android)
- Tablets (iPad, Android tablets)
- Desktop computers with different screen sizes
- Laptops with different resolutions

### Key Pages to Test
- Login/Registration page
- Product listings
- Product detail pages
- Shopping cart
- Checkout process
- Payment error page
- Order confirmation page

## Future Enhancements

- Product filtering and sorting
- User reviews and ratings
- Wishlist functionality
- Admin dashboard for product management
- Order history and tracking
- Email notifications
- Social media integration
- Performance optimizations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Design inspiration from [Untree.co](https://untree.co/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Bootstrap framework by [Twitter Bootstrap](https://getbootstrap.com/)
