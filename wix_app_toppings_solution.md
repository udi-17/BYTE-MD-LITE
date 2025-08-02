# פתרון בעיית התוספות באפליקציית Wix

## 🎯 הבעיה
באתר Wix שלך יש אפשרות להוסיף תוספות לפיצה, אבל באפליקציית Wix (Branded App/Spaces) האפשרות הזו לא מופיעה.

## 🔍 סיבות אפשריות ב-Wix

### 1. **הבדלים בין תצוגת Desktop למובייל**
- ייתכן שהאלמנט של התוספות מוסתר בתצוגת מובייל
- הרכיב לא מותאם לגודל מסך קטן

### 2. **בעיה ב-Wix Stores**
- התוספות מוגדרות כ"Product Options" שלא מופיעות באפליקציה
- בעיה בסנכרון בין האתר לאפליקציה

### 3. **מגבלות של Wix Mobile App**
- לא כל הפיצ'רים של האתר זמינים באפליקציה
- צריך להפעיל את האפשרות במיוחד

## 🛠️ פתרונות צעד אחר צעד

### פתרון 1: בדיקת הגדרות המוצר ב-Wix

1. **היכנס לעורך Wix**
2. **עבור ל-Wix Stores > ניהול מוצרים**
3. **בחר את הפיצה הרלוונטית**
4. **בדוק את "אפשרויות המוצר" (Product Options)**

```
הגדרות נכונות:
✓ אפשרויות מוצר: מופעל
✓ סוג: בחירה מרובה (Multiple Choice)
✓ חובה: לא
✓ השפעה על מחיר: כן (+₪5 לכל תוספת)
```

### פתרון 2: הגדרת האפליקציה

1. **כנס ל-Wix Dashboard**
2. **עבור ל"האפליקציה שלי" (My App)**
3. **הגדרות > חנות**

```
וודא שמופעל:
✓ הצג אפשרויות מוצר
✓ אפשר התאמה אישית
✓ הצג וריאציות מוצר
```

### פתרון 3: עדכון תצוגת המובייל באתר

```javascript
// הוסף קוד ב-Wix Velo לוודא שהתוספות מופיעות
import wixWindow from 'wix-window';

$w.onReady(function () {
    // בדוק אם זה מובייל או אפליקציה
    if (wixWindow.formFactor === "Mobile" || wixWindow.viewMode === "Mobile") {
        // וודא שאלמנט התוספות גלוי
        $w('#productOptions').show();
        $w('#toppingsSection').expand();
    }
});
```

### פתרון 4: יצירת Product Options נכונות

**שלב 1: הגדרת התוספות**
```
שם האפשרות: תוספות לפיצה
סוג: תיבות סימון (Checkboxes)

אפשרויות:
□ גבינה נוספת (+₪5)
□ פטריות (+₪5)
□ זיתים (+₪5)
□ בצל (+₪5)
□ פלפלים (+₪5)
□ תירס (+₪5)
```

**שלב 2: הגדרת התמחור**
```
לכל אפשרות:
- הוסף מחיר: ₪5
- סוג תמחור: תוספת למחיר הבסיס
```

## 🔧 פתרונות חלופיים

### אפשרות 1: שימוש ב-Wix Forms
```javascript
// צור טופס מותאם אישית לתוספות
$w.onReady(function () {
    $w('#toppingsForm').onSubmit(() => {
        const selectedToppings = [];
        
        // אסוף את התוספות שנבחרו
        if ($w('#cheeseCheckbox').checked) selectedToppings.push('גבינה נוספת');
        if ($w('#mushroomsCheckbox').checked) selectedToppings.push('פטריות');
        // וכו'...
        
        // הוסף להערות ההזמנה
        const toppingsText = selectedToppings.join(', ');
        $w('#orderNotes').value = `תוספות: ${toppingsText}`;
    });
});
```

### אפשרות 2: שימוש ב-Custom Product Page
1. צור דף מוצר מותאם אישית
2. הוסף רכיבי Checkbox עבור התוספות
3. השתמש ב-Wix Velo לחישוב המחיר

```javascript
// קוד לחישוב מחיר דינמי
let basePrice = 45;
let toppingsPrice = 0;

export function calculateTotal() {
    const checkboxes = [
        $w('#extraCheese'),
        $w('#mushrooms'),
        $w('#olives'),
        $w('#onions'),
        $w('#peppers'),
        $w('#corn')
    ];
    
    toppingsPrice = checkboxes.filter(cb => cb.checked).length * 5;
    const totalPrice = basePrice + toppingsPrice;
    
    $w('#totalPrice').text = `₪${totalPrice}`;
    $w('#addToCartButton').label = `הוסף לסל - ₪${totalPrice}`;
}

// חבר את הפונקציה לכל checkbox
$w('#extraCheese').onChange(calculateTotal);
$w('#mushrooms').onChange(calculateTotal);
// וכו'...
```

## 📱 בדיקות ספציפיות לאפליקציה

### 1. **בדוק באפליקציית Preview**
- הורד את Wix App Preview
- בדוק איך המוצר נראה שם
- נסה להוסיף תוספות

### 2. **בדיקת Logs**
```javascript
// הוסף console logs
console.log('Product options:', $w('#productOptions').options);
console.log('Selected toppings:', selectedToppings);
```

### 3. **בדיקת תאימות**
- וודא שהאפליקציה מעודכנת
- בדוק בכמה מכשירים שונים
- נסה גם ב-iOS וגם ב-Android

## 🚨 פתרון מיידי - עד לתיקון

### הוסף הודעה באפליקציה:
```javascript
// הצג הודעה למשתמשי אפליקציה
import wixWindow from 'wix-window';

$w.onReady(function () {
    if (wixWindow.viewMode === "Mobile") {
        $w('#mobileNotice').text = 
            "להוספת תוספות - אנא ציינו בהערות להזמנה או התקשרו 03-1234567";
        $w('#mobileNotice').show();
    }
});
```

## 📞 תמיכת Wix

אם הבעיה נמשכת:
1. **פנה לתמיכת Wix** - יש להם תמיכה בעברית
2. **בדוק בפורום Wix** - ייתכן שאחרים נתקלו בבעיה
3. **שקול שדרוג** - ייתכן שזה דורש חבילה מתקדמת

## ✅ Checklist לפתרון

- [ ] בדוק שה-Product Options מוגדרות נכון
- [ ] וודא שהאפשרויות מופעלות להצגה במובייל
- [ ] בדוק שאין CSS שמסתיר את האלמנט במובייל
- [ ] נסה ב-Wix App Preview
- [ ] בדוק אם צריך לרענן את האפליקציה
- [ ] וודא שכל השינויים פורסמו
- [ ] בדוק גם ב-iOS וגם ב-Android

## 💡 טיפ חשוב

לפעמים השינויים לוקחים זמן להתעדכן באפליקציה. אחרי שינויים:
1. פרסם את האתר
2. המתן 15-30 דקות
3. סגור ופתח את האפליקציה מחדש
4. במקרה הצורך - נקה את המטמון של האפליקציה
