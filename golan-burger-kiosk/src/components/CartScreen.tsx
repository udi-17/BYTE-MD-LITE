import React from 'react';
import { useKiosk } from '../context/KioskContext';
import { ArrowLeft, Plus, Minus, Trash2 } from 'lucide-react';

export function CartScreen() {
  const { state, dispatch, removeFromCart, updateCartItem, getCartTotal } = useKiosk();

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 'menu' });
  };

  const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    const cartItem = state.cart.find(item => item.id === cartItemId);
    if (!cartItem) return;

    const basePrice = cartItem.menuItem.price;
    let customizationPrice = 0;

    cartItem.menuItem.customizations?.forEach(customization => {
      const selectedOptions = cartItem.customizations[customization.id] || [];
      selectedOptions.forEach(optionId => {
        const option = customization.options.find(opt => opt.id === optionId);
        if (option) {
          customizationPrice += option.price;
        }
      });
    });

    const updatedItem = {
      ...cartItem,
      quantity: newQuantity,
      totalPrice: (basePrice + customizationPrice) * newQuantity
    };

    updateCartItem(cartItemId, updatedItem);
  };

  const handleCheckout = () => {
    dispatch({ type: 'SET_STEP', payload: 'checkout' });
  };

  const getCustomizationText = (cartItem: any) => {
    const customizations: string[] = [];
    
    cartItem.menuItem.customizations?.forEach((customization: any) => {
      const selectedOptions = cartItem.customizations[customization.id] || [];
      if (selectedOptions.length > 0) {
        const optionNames = selectedOptions.map((optionId: string) => {
          const option = customization.options.find((opt: any) => opt.id === optionId);
          return option ? (state.language === 'he' ? option.nameHeb : option.name) : '';
        }).filter(Boolean);
        
        if (optionNames.length > 0) {
          const customizationName = state.language === 'he' ? customization.nameHeb : customization.name;
          customizations.push(`${customizationName}: ${optionNames.join(', ')}`);
        }
      }
    });
    
    return customizations.join(' • ');
  };

  if (state.cart.length === 0) {
    return (
      <div className="cart-screen empty">
        <header className="cart-header">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={24} />
            <span>{state.language === 'he' ? 'חזרה' : 'Back'}</span>
          </button>
          <h2>{state.language === 'he' ? 'עגלת הקניות' : 'Your Cart'}</h2>
        </header>

        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h3>{state.language === 'he' ? 'העגלה ריקה' : 'Your cart is empty'}</h3>
          <p>
            {state.language === 'he' 
              ? 'הוסף פריטים מהתפריט כדי להתחיל'
              : 'Add items from the menu to get started'}
          </p>
          <button className="continue-shopping" onClick={handleBack}>
            {state.language === 'he' ? 'המשך קניות' : 'Continue Shopping'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-screen">
      <header className="cart-header">
        <button className="back-btn" onClick={handleBack}>
          <ArrowLeft size={24} />
          <span>{state.language === 'he' ? 'חזרה' : 'Back'}</span>
        </button>
        <h2>{state.language === 'he' ? 'עגלת הקניות' : 'Your Cart'}</h2>
      </header>

      <div className="cart-content">
        <div className="cart-items">
          {state.cart.map(cartItem => (
            <div key={cartItem.id} className="cart-item">
              <div className="item-image">
                <img 
                  src={cartItem.menuItem.image} 
                  alt={state.language === 'he' ? cartItem.menuItem.nameHeb : cartItem.menuItem.name} 
                />
              </div>
              
              <div className="item-details">
                <h4 className="item-name">
                  {state.language === 'he' ? cartItem.menuItem.nameHeb : cartItem.menuItem.name}
                </h4>
                
                {getCustomizationText(cartItem) && (
                  <p className="item-customizations">
                    {getCustomizationText(cartItem)}
                  </p>
                )}
                
                <div className="item-price">
                  ₪{cartItem.totalPrice.toFixed(2)}
                </div>
              </div>

              <div className="item-controls">
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity - 1)}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity">{cartItem.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(cartItem.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>{state.language === 'he' ? 'סה"כ פריטים:' : 'Subtotal:'}</span>
            <span>₪{getCartTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>{state.language === 'he' ? 'מע"מ (17%):' : 'Tax (17%):'}</span>
            <span>₪{(getCartTotal() * 0.17).toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>{state.language === 'he' ? 'סה"כ לתשלום:' : 'Total:'}</span>
            <span>₪{(getCartTotal() * 1.17).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="cart-footer">
        <button className="continue-shopping" onClick={handleBack}>
          {state.language === 'he' ? 'המשך קניות' : 'Continue Shopping'}
        </button>
        <button className="checkout-btn" onClick={handleCheckout}>
          {state.language === 'he' ? 'המשך לתשלום' : 'Proceed to Checkout'}
        </button>
      </div>
    </div>
  );
}