import React, { useState } from 'react';
import { useKiosk } from '../context/KioskContext';
import { menuData } from '../data/menu';
import { MenuItem } from '../types';
import { ShoppingCart, Star } from 'lucide-react';

export function MenuScreen() {
  const { state, dispatch, getCartItemCount, getCartTotal } = useKiosk();
  const [selectedCategory, setSelectedCategory] = useState('burgers');

  const currentCategory = menuData.find(cat => cat.id === selectedCategory);

  const handleItemClick = (item: MenuItem) => {
    dispatch({ type: 'SELECT_ITEM', payload: item });
    if (item.customizations && item.customizations.length > 0) {
      dispatch({ type: 'SET_STEP', payload: 'customize' });
    } else {
      // Add directly to cart if no customizations
      const cartItem = {
        id: `${item.id}-${Date.now()}`,
        menuItem: item,
        quantity: 1,
        customizations: {},
        totalPrice: item.price
      };
      dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    }
  };

  const handleViewCart = () => {
    dispatch({ type: 'SET_STEP', payload: 'cart' });
  };

  return (
    <div className="menu-screen">
      <header className="menu-header">
        <div className="header-content">
          <div className="logo-small">
            <h2>🍔 {state.language === 'he' ? 'גולן בורגר' : 'Golan Burger'}</h2>
          </div>
          <div className="language-toggle">
            <button
              className={state.language === 'he' ? 'active' : ''}
              onClick={() => dispatch({ type: 'SET_LANGUAGE', payload: 'he' })}
            >
              עברית
            </button>
            <button
              className={state.language === 'en' ? 'active' : ''}
              onClick={() => dispatch({ type: 'SET_LANGUAGE', payload: 'en' })}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <div className="menu-content">
        <aside className="category-sidebar">
          <h3>{state.language === 'he' ? 'קטגוריות' : 'Categories'}</h3>
          {menuData.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">
                {state.language === 'he' ? category.nameHeb : category.name}
              </span>
            </button>
          ))}
        </aside>

        <main className="items-grid">
          <div className="category-title">
            <h2>
              {currentCategory && (state.language === 'he' ? currentCategory.nameHeb : currentCategory?.name)}
            </h2>
          </div>
          
          <div className="items-container">
            {currentCategory?.items.map(item => (
              <div
                key={item.id}
                className="menu-item"
                onClick={() => handleItemClick(item)}
              >
                {item.popular && (
                  <div className="popular-badge">
                    <Star size={16} fill="currentColor" />
                    <span>{state.language === 'he' ? 'פופולרי' : 'Popular'}</span>
                  </div>
                )}
                
                <div className="item-image">
                  <img src={item.image} alt={state.language === 'he' ? item.nameHeb : item.name} />
                </div>
                
                <div className="item-info">
                  <h3 className="item-name">
                    {state.language === 'he' ? item.nameHeb : item.name}
                  </h3>
                  <p className="item-description">
                    {state.language === 'he' ? item.descriptionHeb : item.description}
                  </p>
                  <div className="item-price">
                    ₪{item.price}
                  </div>
                  {item.customizations && item.customizations.length > 0 && (
                    <div className="customizable-badge">
                      {state.language === 'he' ? 'ניתן להתאמה אישית' : 'Customizable'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {getCartItemCount() > 0 && (
        <div className="cart-summary" onClick={handleViewCart}>
          <div className="cart-info">
            <ShoppingCart size={24} />
            <span className="cart-count">{getCartItemCount()}</span>
            <span className="cart-text">
              {state.language === 'he' ? 'עגלת קניות' : 'Cart'}
            </span>
          </div>
          <div className="cart-total">
            ₪{getCartTotal().toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}