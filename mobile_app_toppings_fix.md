# תיקון בעיית התוספות באפליקציה

## 🔍 סיבות אפשריות לבעיה

### 1. **חוסר ברכיב UI באפליקציה**
- ייתכן שהרכיב לבחירת תוספות לא הוטמע באפליקציה
- הרכיב קיים אך מוסתר או לא זמין

### 2. **בעיית API**
- ה-API לא מקבל פרמטר של תוספות מהאפליקציה
- שם השדה שונה בין האתר לאפליקציה
- בעיית Validation ב-Backend

### 3. **בעיית תצורה**
- התוספות לא מוגדרות כזמינות באפליקציה
- הרשאות שונות בין אתר לאפליקציה

## 🛠️ שלבי הבדיקה והתיקון

### שלב 1: בדיקת ה-API
```javascript
// בדוק את הקריאה לAPI מהאפליקציה
// דוגמה לקריאה נכונה:
const orderData = {
    productId: "pizza_123",
    size: "family",
    quantity: 1,
    toppings: [
        { id: "extra_cheese", name: "גבינה נוספת", price: 5 },
        { id: "mushrooms", name: "פטריות", price: 5 }
    ],
    totalPrice: 55
};

// שלח את הנתונים
fetch('https://api.tonispizzas.com/orders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Platform': 'mobile-app' // חשוב לזהות שזה מהאפליקציה
    },
    body: JSON.stringify(orderData)
});
```

### שלב 2: בדיקת ה-Backend
```php
// דוגמה ל-PHP - וודא שה-API מקבל תוספות
function createOrder($request) {
    $data = json_decode($request->getBody(), true);
    
    // וודא שהשדה toppings קיים ונקרא נכון
    if (isset($data['toppings']) && is_array($data['toppings'])) {
        foreach ($data['toppings'] as $topping) {
            // עבד את התוספות
            $orderItem->addTopping($topping['id'], $topping['price']);
        }
    }
}
```

### שלב 3: הוספת UI לאפליקציה (React Native דוגמה)
```jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const ToppingsSelector = ({ onToppingsChange }) => {
    const [selectedToppings, setSelectedToppings] = useState([]);
    
    const toppings = [
        { id: 'extra_cheese', name: 'גבינה נוספת', price: 5, icon: '🧀' },
        { id: 'mushrooms', name: 'פטריות', price: 5, icon: '🍄' },
        { id: 'olives', name: 'זיתים', price: 5, icon: '🫒' },
        { id: 'onion', name: 'בצל', price: 5, icon: '🧅' },
        { id: 'peppers', name: 'פלפלים', price: 5, icon: '🌶️' },
        { id: 'corn', name: 'תירס', price: 5, icon: '🌽' }
    ];
    
    const toggleTopping = (topping) => {
        let newToppings;
        if (selectedToppings.find(t => t.id === topping.id)) {
            newToppings = selectedToppings.filter(t => t.id !== topping.id);
        } else {
            newToppings = [...selectedToppings, topping];
        }
        setSelectedToppings(newToppings);
        onToppingsChange(newToppings);
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>בחר תוספות (₪5 לתוספת)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {toppings.map(topping => (
                    <TouchableOpacity
                        key={topping.id}
                        style={[
                            styles.toppingItem,
                            selectedToppings.find(t => t.id === topping.id) && styles.selected
                        ]}
                        onPress={() => toggleTopping(topping)}
                    >
                        <Text style={styles.icon}>{topping.icon}</Text>
                        <Text style={styles.name}>{topping.name}</Text>
                        <Text style={styles.price}>+₪{topping.price}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = {
    container: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    toppingItem: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 15,
        marginRight: 10,
        alignItems: 'center',
        minWidth: 100,
    },
    selected: {
        borderColor: '#4caf50',
        backgroundColor: '#e8f5e9',
    },
    icon: {
        fontSize: 30,
        marginBottom: 5,
    },
    name: {
        fontSize: 14,
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4caf50',
    },
};
```

### שלב 4: בדיקת הקונפיגורציה
```json
// config.json באפליקציה
{
    "features": {
        "pizzaToppings": {
            "enabled": true,  // וודא שזה true
            "maxToppings": 10,
            "pricePerTopping": 5
        }
    },
    "api": {
        "endpoints": {
            "createOrder": "/api/v2/orders",  // וודא שזה אותו endpoint
            "getToppings": "/api/v2/toppings"
        }
    }
}
```

## 📱 בדיקות נוספות

### 1. **בדיקת Network**
- השתמש ב-Chrome DevTools או בכלי דומה
- בדוק את ה-Request שנשלח מהאפליקציה
- השווה ל-Request מהאתר

### 2. **בדיקת Logs**
```javascript
// הוסף לוגים באפליקציה
console.log('Selected toppings:', selectedToppings);
console.log('Order payload:', JSON.stringify(orderData, null, 2));
```

### 3. **בדיקת Database**
```sql
-- בדוק אם התוספות נשמרות בDB
SELECT o.*, ot.* 
FROM orders o
LEFT JOIN order_toppings ot ON o.id = ot.order_id
WHERE o.platform = 'mobile-app'
ORDER BY o.created_at DESC
LIMIT 10;
```

## 🔧 פתרונות מהירים

### פתרון 1: הוספת תוספות כ-Hidden Field
אם אין אפשרות לשנות את האפליקציה מיד:
```javascript
// הוסף את התוספות לשדה הערות
const orderNotes = `תוספות: ${selectedToppings.map(t => t.name).join(', ')}`;
```

### פתרון 2: WebView לדף התוספות
```javascript
// טען את דף התוספות מהאתר ב-WebView
<WebView
    source={{ uri: 'https://tonispizzas.com/toppings-selector' }}
    onMessage={(event) => {
        const toppings = JSON.parse(event.nativeEvent.data);
        handleToppingsSelection(toppings);
    }}
/>
```

### פתרון 3: Feature Flag
```javascript
// הפעל את התוספות רק למשתמשים מסוימים לבדיקה
if (user.betaFeatures.includes('pizza-toppings')) {
    showToppingsSelector();
}
```

## 📋 Checklist לבדיקה

- [ ] וודא שרכיב התוספות מופיע באפליקציה
- [ ] בדוק שה-API מקבל את שדה התוספות
- [ ] וודא שהתוספות נשמרות ב-Database
- [ ] בדוק שהתוספות מופיעות בהזמנה
- [ ] וודא שהמחיר מחושב נכון עם התוספות
- [ ] בדוק שהתוספות מופיעות בקבלה/חשבונית
- [ ] וודא שהמטבח מקבל את רשימת התוספות

## 🚀 המלצות לעתיד

1. **סנכרון בין פלטפורמות** - וודא שכל שינוי באתר מתעדכן גם באפליקציה
2. **בדיקות אוטומטיות** - הוסף בדיקות שבודקות את התוספות
3. **Monitoring** - הוסף מעקב על הזמנות עם תוספות
4. **A/B Testing** - בדוק אם התוספות מעלות את ההכנסות

## 📞 תמיכה

אם הבעיה נמשכת:
1. פנה למפתח האפליקציה
2. בדוק את הלוגים בצד השרת
3. וודא שאין בעיות תאימות בין גרסאות

---

**הערה:** חשוב לבדוק את הבעיה גם במכשירים שונים (iOS/Android) ובגרסאות שונות של האפליקציה.