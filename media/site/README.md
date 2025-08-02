# טוני'ס פיצה - דף נחיתה מקצועי

דף נחיתה מקצועי ומודרני למסעדת פיצה עם עיצוב רספונסיבי ואנימציות מתקדמות.

## תכונות

- 🎨 עיצוב מודרני ומקצועי
- 📱 רספונסיבי לכל המכשירים
- 🌟 אנימציות חלקות ואפקטים מתקדמים
- 🍕 תפריט אינטראקטיבי
- 📞 טפסי יצירת קשר והזמנות
- ⚡ טעינה מהירה וביצועים מעולים
- ♿ נגישות מלאה
- 🔄 תמיכה בכיוון RTL (עברית)

## מבנה הקבצים

```
media/site/
├── index.html      # דף ה-HTML הראשי
├── style.css       # קבצי העיצוב
├── script.js       # קבצי ה-JavaScript
└── README.md       # קובץ התיעוד
```

## איך להריץ

### אפשרות 1: שרת פשוט
```bash
# מהתיקייה הראשית של הפרויקט
npm run website
```

הדף יהיה זמין בכתובת: http://localhost:3000

### אפשרות 2: שרת HTTP פשוט
```bash
# עבור לתיקיית האתר
cd media/site

# הרץ שרת HTTP פשוט (Python 3)
python3 -m http.server 8000

# או עם Python 2
python -m SimpleHTTPServer 8000

# או עם Node.js (אם יש לך live-server מותקן)
npx live-server
```

## התאמה אישית

### שינוי פרטי הקשר
ערוך את הקובץ `index.html` ושנה:
- מספרי טלפון
- כתובת
- כתובת אימייל
- שעות פתיחה

### שינוי התפריט
בקובץ `index.html`, מצא את הקטע `<!-- Menu Section -->` ועדכן:
- שמות הפיצות
- תיאורים
- מחירים

### שינוי צבעים ועיצוב
בקובץ `style.css`, ערוך את המשתנים ב-`:root`:
```css
:root {
    --primary-color: #e63946;    /* צבע ראשי */
    --secondary-color: #f77f00;  /* צבע משני */
    --dark-color: #2d3436;       /* צבע כהה */
    /* ... */
}
```

### הוספת תמונות
החלף את האימוג'ים בתמונות אמיתיות:
1. הוסף תמונות לתיקייה `media/site/images/`
2. עדכן את ה-HTML להפנות לתמונות החדשות

## טיפים לשיפור

### SEO
- הוסף meta tags נוספים
- שפר את תוכן הטקסטים
- הוסף structured data

### ביצועים
- דחוס תמונות
- השתמש ב-WebP format
- הוסף lazy loading לתמונות

### אנליטיקס
הוסף Google Analytics או אחר:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## תמיכה בדפדפנים

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile Safari 12+
- Chrome Mobile 60+

## רישיון

כל הזכויות שמורות לטוני'ס פיצה © 2024

## צור קשר

לעזרה נוספת או התאמות אישיות, צרו קשר דרך:
- טלפון: 050-123-4567
- אימייל: info@tonispizzas.com