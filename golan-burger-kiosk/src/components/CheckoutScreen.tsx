import React, { useState } from 'react';
import { useKiosk } from '../context/KioskContext';
import { ArrowLeft, CreditCard, Smartphone, Banknote } from 'lucide-react';

export function CheckoutScreen() {
  const { state, dispatch, getCartTotal } = useKiosk();
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'cash' | 'mobile' | null>(null);
  const [orderType, setOrderType] = useState<'here' | 'takeaway'>('here');

  const totalWithTax = getCartTotal() * 1.17;

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 'cart' });
  };

  const handlePayment = () => {
    if (!selectedPayment) return;
    
    // Generate order number
    const orderNumber = `GB${Date.now().toString().slice(-6)}`;
    dispatch({ type: 'SET_ORDER_NUMBER', payload: orderNumber });
    dispatch({ type: 'SET_STEP', payload: 'payment' });
  };

  const paymentMethods = [
    {
      id: 'card',
      name: state.language === 'he' ? 'כרטיס אשראי' : 'Credit Card',
      icon: <CreditCard size={32} />,
      description: state.language === 'he' ? 'ויזה, מאסטרכארד, אמריקן אקספרס' : 'Visa, Mastercard, American Express'
    },
    {
      id: 'mobile',
      name: state.language === 'he' ? 'תשלום נייד' : 'Mobile Payment',
      icon: <Smartphone size={32} />,
      description: state.language === 'he' ? 'אפל פיי, גוגל פיי, ביט' : 'Apple Pay, Google Pay, Bit'
    },
    {
      id: 'cash',
      name: state.language === 'he' ? 'מזומן' : 'Cash',
      icon: <Banknote size={32} />,
      description: state.language === 'he' ? 'תשלום במזומן בקופה' : 'Pay with cash at counter'
    }
  ];

  return (
    <div className="checkout-screen">
      <header className="checkout-header">
        <button className="back-btn" onClick={handleBack}>
          <ArrowLeft size={24} />
          <span>{state.language === 'he' ? 'חזרה' : 'Back'}</span>
        </button>
        <h2>{state.language === 'he' ? 'אישור הזמנה' : 'Checkout'}</h2>
      </header>

      <div className="checkout-content">
        <div className="order-type-section">
          <h3>{state.language === 'he' ? 'איך תרצה לקבל את ההזמנה?' : 'How would you like to receive your order?'}</h3>
          <div className="order-type-options">
            <button
              className={`order-type-btn ${orderType === 'here' ? 'selected' : ''}`}
              onClick={() => setOrderType('here')}
            >
              <span className="order-type-icon">🍽️</span>
              <div className="order-type-text">
                <h4>{state.language === 'he' ? 'לאכול כאן' : 'Dine In'}</h4>
                <p>{state.language === 'he' ? 'נביא לכם לשולחן' : 'We\'ll bring it to your table'}</p>
              </div>
            </button>
            <button
              className={`order-type-btn ${orderType === 'takeaway' ? 'selected' : ''}`}
              onClick={() => setOrderType('takeaway')}
            >
              <span className="order-type-icon">🥡</span>
              <div className="order-type-text">
                <h4>{state.language === 'he' ? 'איסוף עצמי' : 'Takeaway'}</h4>
                <p>{state.language === 'he' ? 'תאספו בדלפק' : 'Pick up at counter'}</p>
              </div>
            </button>
          </div>
        </div>

        <div className="payment-section">
          <h3>{state.language === 'he' ? 'בחר אמצעי תשלום' : 'Choose Payment Method'}</h3>
          <div className="payment-methods">
            {paymentMethods.map(method => (
              <button
                key={method.id}
                className={`payment-btn ${selectedPayment === method.id ? 'selected' : ''}`}
                onClick={() => setSelectedPayment(method.id as 'card' | 'cash' | 'mobile')}
              >
                <div className="payment-icon">{method.icon}</div>
                <div className="payment-info">
                  <h4>{method.name}</h4>
                  <p>{method.description}</p>
                </div>
                <div className="payment-selector">
                  {selectedPayment === method.id && <div className="selected-indicator" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="order-summary">
          <h3>{state.language === 'he' ? 'סיכום הזמנה' : 'Order Summary'}</h3>
          <div className="summary-items">
            {state.cart.map(item => (
              <div key={item.id} className="summary-item">
                <span className="item-qty">{item.quantity}x</span>
                <span className="item-name">
                  {state.language === 'he' ? item.menuItem.nameHeb : item.menuItem.name}
                </span>
                <span className="item-price">₪{item.totalPrice.toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="summary-totals">
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
              <span>₪{totalWithTax.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-footer">
        <div className="total-display">
          <span className="total-label">{state.language === 'he' ? 'סה"כ:' : 'Total:'}</span>
          <span className="total-amount">₪{totalWithTax.toFixed(2)}</span>
        </div>
        <button
          className="pay-btn"
          onClick={handlePayment}
          disabled={!selectedPayment}
        >
          {selectedPayment === 'cash' 
            ? (state.language === 'he' ? 'אשר הזמנה' : 'Confirm Order')
            : (state.language === 'he' ? 'המשך לתשלום' : 'Proceed to Payment')
          }
        </button>
      </div>
    </div>
  );
}