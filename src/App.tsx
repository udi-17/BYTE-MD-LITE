import React, { useState } from 'react';
import './App.css';

// Types
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "גולנבואגר קלאסי",
      description: "המבורגר בקר טרי עם חסה, עגבניה, בצל וגבינה צהובה",
      price: 32.90,
      image: "🍔",
      category: "המבורגרים"
    },
    {
      id: 2,
      name: "גולנבואגר כפול",
      description: "שני קציצות בקר עם גבינה כפולה וכל התוספות",
      price: 45.90,
      image: "🍔🍔",
      category: "המבורגרים"
    },
    {
      id: 3,
      name: "גולנבואגר צ'יזבורגר",
      description: "המבורגר עם גבינה צהובה נמסה וטעימה",
      price: 35.90,
      image: "🧀🍔",
      category: "המבורגרים"
    },
    {
      id: 4,
      name: "צ'יפס גולנבואגר",
      description: "צ'יפס קריספי וחם עם מלח ים",
      price: 18.90,
      image: "🍟",
      category: "תוספות"
    },
    {
      id: 5,
      name: "שתייה קלה",
      description: "קוקה קולה, ספרייט או פפסי - בחירתך",
      price: 12.90,
      image: "🥤",
      category: "שתייה"
    },
    {
      id: 6,
      name: "מילקשייק וניל",
      description: "מילקשייק קרם וניל עשיר וטעים",
      price: 22.90,
      image: "🥤",
      category: "שתייה"
    },
    {
      id: 7,
      name: "סלט גולנבואגר",
      description: "סלט טרי עם חסה, עגבניות, מלפפונים ורוטב מיוחד",
      price: 28.90,
      image: "🥗",
      category: "סלטים"
    },
    {
      id: 8,
      name: "נאגטס עוף",
      description: "נאגטס עוף טעימים עם רוטב דבש חרדל",
      price: 25.90,
      image: "🍗",
      category: "תוספות"
    }
  ];

  const categories = ['all', ...Array.from(new Set(menuItems.map(item => item.category)))];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    alert('תודה על הזמנתך! הזמנתך תהיה מוכנה בעוד 10 דקות 🎉');
    setCart([]);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="logo">גולנבואגר 🍔</h1>
        <p className="subtitle">הטעם האמיתי של ישראל</p>
      </header>

      <main className="main-content">
        <section className="menu-section">
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category}
                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category === 'all' ? 'הכל' : category}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="menu-card">
                <div className="menu-image">{item.image}</div>
                <h3 className="menu-title">{item.name}</h3>
                <p className="menu-description">{item.description}</p>
                <div className="menu-price">₪{item.price.toFixed(2)}</div>
                <button className="add-button" onClick={() => addToCart(item)}>
                  הוסף לסל 🛒
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="cart-section">
          <h2 className="cart-title">סל הקניות שלך</h2>
          
          {cart.length === 0 ? (
            <div className="empty-cart">
              הסל שלך ריק<br />
              בחר פריטים מהתפריט
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">₪{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                  
                  <div className="quantity-controls">
                    <button 
                      className="quantity-button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-total">
                <div className="total-amount">סה"כ: ₪{getTotalPrice().toFixed(2)}</div>
                <button className="checkout-button" onClick={handleCheckout}>
                  סיים הזמנה 💳
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;