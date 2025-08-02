# Toni's Pizzas - דף נחיתה מקצועי 🍕

## תיאור הפרויקט
דף נחיתה מודרני ומקצועי לפיצריה "Toni's Pizzas" הכולל עיצוב רספונסיבי, אנימציות חלקות ופונקציונליות מלאה.

## מאפיינים עיקריים

### 🎨 עיצוב
- עיצוב מודרני ונקי עם צבעי נושא אדום וכתום
- תמיכה מלאה ב-RTL (עברית)
- רספונסיבי לכל גדלי המסכים
- אנימציות חלקות ומקצועיות

### 🚀 פונקציונליות
- תפריט ניווט חכם עם אפקט הסתרה בגלילה
- סינון דינמי של פריטי תפריט
- גלריית תמונות עם Lightbox
- טפסי יצירת קשר והרשמה לניוזלטר
- מערכת התראות
- כפתור חזרה למעלה
- כפתור WhatsApp צף

### 📱 רספונסיביות
- עיצוב מותאם למובייל עם תפריט המבורגר
- אופטימיזציה לטאבלט ומסכים גדולים
- תמונות עם lazy loading לביצועים טובים יותר

## מבנה הקבצים
```
landing-page/
│
├── index.html          # קובץ HTML ראשי
├── css/
│   └── style.css      # עיצוב האתר
├── js/
│   └── main.js        # פונקציונליות JavaScript
├── images/            # תיקיית תמונות
│   ├── logo.png       # לוגו
│   ├── hero-pizza.png # תמונה ראשית
│   ├── pizza-*.jpg    # תמונות פיצות
│   ├── gallery-*.jpg  # תמונות גלריה
│   ├── chef.jpg       # תמונת שף
│   └── customer-*.jpg # תמונות לקוחות
└── README.md          # קובץ זה
```

## הוראות התקנה והפעלה

### 1. הכנת תמונות
יש להוסיף את התמונות הבאות לתיקיית `images/`:
- **logo.png** - לוגו הפיצריה (50x50 פיקסלים)
- **hero-pizza.png** - תמונת פיצה ראשית (600x600 פיקסלים)
- **pizza-margherita.jpg** - תמונת פיצה מרגריטה
- **pizza-pepperoni.jpg** - תמונת פיצה פפרוני  
- **pizza-veggie.jpg** - תמונת פיצה צמחונית
- **gallery-1.jpg עד gallery-6.jpg** - תמונות לגלריה
- **chef.jpg** - תמונת השף
- **customer-1.jpg עד customer-3.jpg** - תמונות לקוחות

### 2. עדכון פרטים
עדכן את הפרטים הבאים בקובץ `index.html`:
- מספר טלפון (חפש: `123-456-7890`)
- כתובת (חפש: `רחוב הרצל 123, תל אביב`)
- כתובת אימייל (חפש: `info@tonispizzas.com`)
- מספר WhatsApp (חפש: `972123456789`)
- קישורים לרשתות חברתיות

### 3. הפעלת האתר
1. פתח את הקובץ `index.html` בדפדפן
2. או העלה את כל הקבצים לשרת האתר שלך

## התאמות נוספות

### שינוי צבעים
ערוך את המשתנים ב-`css/style.css`:
```css
:root {
    --primary-color: #e74c3c;    /* צבע ראשי */
    --secondary-color: #f39c12;   /* צבע משני */
    --dark-color: #2c3e50;        /* צבע כהה */
}
```

### הוספת פריטי תפריט
הוסף פריטים חדשים בקטע התפריט ב-`index.html`:
```html
<div class="menu-item" data-category="pizzas">
    <img src="images/pizza-new.jpg" alt="פיצה חדשה">
    <div class="menu-item-content">
        <h3>שם הפיצה</h3>
        <p>תיאור המרכיבים</p>
        <div class="menu-item-footer">
            <span class="price">₪XX</span>
            <button class="btn btn-small">הזמן</button>
        </div>
    </div>
</div>
```

## טכנולוגיות בשימוש
- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Heebo, Rubik)

## תמיכה בדפדפנים
- Chrome (מעודכן)
- Firefox (מעודכן)
- Safari (מעודכן)
- Edge (מעודכן)
- תמיכה בסיסית ב-IE11

## רישיון
כל הזכויות שמורות ל-Toni's Pizzas © 2024

## יצירת קשר
לשאלות ותמיכה: info@tonispizzas.com

---
**נבנה עם ❤️ עבור Toni's Pizzas**