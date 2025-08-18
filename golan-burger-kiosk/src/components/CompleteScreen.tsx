import React, { useEffect } from 'react';
import { useKiosk } from '../context/KioskContext';
import { CheckCircle } from 'lucide-react';

export function CompleteScreen() {
  const { state, dispatch } = useKiosk();

  useEffect(() => {
    // Auto-reset after 10 seconds
    const timer = setTimeout(() => {
      dispatch({ type: 'RESET_ORDER' });
    }, 10000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleNewOrder = () => {
    dispatch({ type: 'RESET_ORDER' });
  };

  return (
    <div className="complete-screen">
      <div className="complete-content">
        <div className="success-animation">
          <CheckCircle size={80} className="success-icon" />
        </div>
        
        <h1>{state.language === 'he' ? 'תודה על ההזמנה!' : 'Thank You for Your Order!'}</h1>
        
        <div className="order-details">
          <div className="order-number-large">
            <span className="label">{state.language === 'he' ? 'מספר הזמנה' : 'Order Number'}</span>
            <span className="number">{state.orderNumber}</span>
          </div>
          
          <div className="preparation-info">
            <h3>{state.language === 'he' ? 'ההזמנה שלכם בהכנה' : 'Your Order is Being Prepared'}</h3>
            <p>
              {state.language === 'he' 
                ? 'זמן הכנה משוער: 8-12 דקות'
                : 'Estimated preparation time: 8-12 minutes'
              }
            </p>
          </div>

          <div className="pickup-instructions">
            <div className="instruction-card">
              <span className="instruction-icon">📢</span>
              <div className="instruction-text">
                <h4>{state.language === 'he' ? 'איך לקבל את ההזמנה?' : 'How to collect your order?'}</h4>
                <p>
                  {state.language === 'he' 
                    ? 'נקרא למספר ההזמנה שלכם כשההזמנה תהיה מוכנה. אנא המתינו באזור ההמתנה.'
                    : 'We will call your order number when ready. Please wait in the waiting area.'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="order-summary-final">
            <h4>{state.language === 'he' ? 'סיכום ההזמנה' : 'Order Summary'}</h4>
            <div className="summary-items">
              {state.cart.map(item => (
                <div key={item.id} className="summary-item">
                  <span className="item-qty">{item.quantity}x</span>
                  <span className="item-name">
                    {state.language === 'he' ? item.menuItem.nameHeb : item.menuItem.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="new-order-btn" onClick={handleNewOrder}>
          {state.language === 'he' ? 'הזמנה חדשה' : 'New Order'}
        </button>

        <div className="footer-message">
          <p>
            {state.language === 'he' 
              ? 'תודה שבחרתם בגולן בורגר! נתראה בפעם הבאה 🍔'
              : 'Thank you for choosing Golan Burger! See you next time 🍔'
            }
          </p>
        </div>
      </div>
    </div>
  );
}