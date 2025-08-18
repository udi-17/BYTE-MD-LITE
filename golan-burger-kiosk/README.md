# 🍔 Golan Burger Kiosk System
## מערכת קיוסק גולן בורגר

A modern, touch-friendly kiosk ordering system for Golan Burger restaurant, built with React and TypeScript. The system supports both Hebrew and English languages and provides a McDonald's-style ordering experience.

מערכת הזמנות קיוסק מודרנית וידידותית למגע עבור מסעדת גולן בורגר, בנויה עם React ו-TypeScript. המערכת תומכת בעברית ובאנגלית ומספקת חוויית הזמנה בסגנון מקדונלדס.

## ✨ Features / תכונות

### 🌐 Multi-Language Support / תמיכה רב-לשונית
- Hebrew (עברית) - Right-to-left interface
- English - Left-to-right interface
- Easy language switching

### 🍽️ Complete Restaurant Experience / חוויית מסעדה מלאה
- **Welcome Screen** - Interactive welcome with language selection
- **Menu Categories** - Burgers, Sides, Drinks, Desserts
- **Item Customization** - Size options, toppings, special requests
- **Shopping Cart** - Add, remove, modify quantities
- **Checkout Process** - Order type selection (dine-in/takeaway)
- **Payment Options** - Credit card, mobile payment, cash
- **Order Confirmation** - Order number and pickup instructions

### 🎨 Modern UI/UX Design / עיצוב מודרני
- Touch-optimized interface for kiosk use
- Large buttons and clear typography
- Smooth animations and transitions
- Responsive design for different screen sizes
- High contrast mode support
- Accessibility features

### 🛒 Smart Cart Management / ניהול עגלה חכם
- Real-time price calculations
- Tax calculation (17% VAT)
- Quantity adjustments
- Customization tracking
- Order summary

## 🚀 Quick Start / התחלה מהירה

### Prerequisites / דרישות מוקדמות
- Node.js (v18 or higher)
- npm or yarn

### Installation / התקנה

```bash
# Clone the repository / שכפול המאגר
git clone <repository-url>
cd golan-burger-kiosk

# Install dependencies / התקנת תלויות
npm install

# Start development server / הפעלת שרת פיתוח
npm run dev

# Build for production / בנייה לייצור
npm run build
```

### Development Server / שרת פיתוח
The application will be available at `http://localhost:5173`

האפליקציה תהיה זמינה בכתובת `http://localhost:5173`

## 📁 Project Structure / מבנה הפרויקט

```
src/
├── components/          # React components / רכיבי React
│   ├── WelcomeScreen.tsx    # Welcome screen / מסך פתיחה
│   ├── MenuScreen.tsx       # Menu display / תצוגת תפריט
│   ├── CustomizeScreen.tsx  # Item customization / התאמה אישית
│   ├── CartScreen.tsx       # Shopping cart / עגלת קניות
│   ├── CheckoutScreen.tsx   # Checkout process / תהליך הזמנה
│   ├── PaymentScreen.tsx    # Payment processing / עיבוד תשלום
│   └── CompleteScreen.tsx   # Order completion / השלמת הזמנה
├── context/             # React Context / הקשר React
│   └── KioskContext.tsx     # Global state management / ניהול מצב גלובלי
├── data/               # Static data / נתונים סטטיים
│   └── menu.ts             # Menu items and categories / פריטי תפריט וקטגוריות
├── types/              # TypeScript types / טיפוסי TypeScript
│   └── index.ts            # Type definitions / הגדרות טיפוסים
├── App.tsx             # Main application / אפליקציה ראשית
├── App.css             # Global styles / סגנונות גלובליים
└── main.tsx            # Entry point / נקודת כניסה
```

## 🍔 Menu Configuration / הגדרת תפריט

The menu is configured in `src/data/menu.ts`. You can easily modify:
- Menu categories / קטגוריות תפריט
- Menu items / פריטי תפריט  
- Prices / מחירים
- Customization options / אפשרויות התאמה אישית
- Item descriptions / תיאורי פריטים

### Adding New Items / הוספת פריטים חדשים

```typescript
{
  id: 'new-item',
  name: 'New Item',
  nameHeb: 'פריט חדש',
  description: 'Description in English',
  descriptionHeb: 'תיאור בעברית',
  price: 25,
  image: '/images/new-item.jpg',
  category: 'burgers',
  customizations: [
    // Add customization options
  ]
}
```

## 🎨 Customization / התאמה אישית

### Styling / עיצוב
- Modify `src/App.css` for styling changes
- CSS variables for easy theme customization
- Responsive breakpoints for different screen sizes

### Colors / צבעים
The application uses a modern color palette:
- Primary: `#667eea` (Purple-blue)
- Success: `#28a745` (Green)
- Warning: `#ffa500` (Orange)
- Danger: `#ff6b6b` (Red)

### Languages / שפות
To add new languages:
1. Update the `Language` type in `src/types/index.ts`
2. Add translations to menu data
3. Update component text rendering logic

## 🔧 Configuration / הגדרות

### Environment Variables / משתני סביבה
Create a `.env` file for configuration:

```env
VITE_RESTAURANT_NAME=Golan Burger
VITE_TAX_RATE=0.17
VITE_CURRENCY=₪
```

### Payment Integration / אינטגרציית תשלומים
The payment system is currently simulated. To integrate real payment processing:
1. Replace the mock payment in `PaymentScreen.tsx`
2. Add your payment provider's SDK
3. Implement secure payment handling

## 📱 Kiosk Deployment / פריסת קיוסק

### Hardware Requirements / דרישות חומרה
- Touch screen display (recommended 21-24 inches)
- Minimum resolution: 1920x1080
- Touch-capable device
- Network connection for payment processing

### Browser Setup / הגדרת דפדפן
For kiosk mode:
1. Use Chrome in kiosk mode: `chrome --kiosk --app=http://localhost:5173`
2. Disable browser UI elements
3. Enable touch events
4. Set up auto-refresh for reliability

### Production Deployment / פריסה לייצור
1. Build the application: `npm run build`
2. Deploy to web server (nginx, Apache, etc.)
3. Configure HTTPS for security
4. Set up monitoring and logging

## 🛠️ Development / פיתוח

### Available Scripts / סקריפטים זמינים

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Testing / בדיקות
To add testing:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

## 🤝 Contributing / תרומה

1. Fork the repository / עשה Fork למאגר
2. Create a feature branch / צור ענף תכונה
3. Make your changes / בצע שינויים
4. Test thoroughly / בדוק ביסודיות  
5. Submit a pull request / שלח pull request

## 📄 License / רישיון

This project is licensed under the MIT License - see the LICENSE file for details.

הפרויקט הזה מורשה תחת רישיון MIT - ראה את קובץ LICENSE לפרטים.

## 🆘 Support / תמיכה

For support and questions:
- Create an issue in the repository
- Contact the development team

לתמיכה ושאלות:
- צור issue במאגר
- צור קשר עם צוות הפיתוח

---

**Built with ❤️ for Golan Burger**
**נבנה באהבה עבור גולן בורגר** 🍔