import React, { useState, useEffect } from 'react';
import { useKiosk } from '../context/KioskContext';
import { CheckCircle, Loader } from 'lucide-react';

export function PaymentScreen() {
  const { state, dispatch } = useKiosk();
  const [paymentStatus, setPaymentStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Simulate payment processing
    const timer = setTimeout(() => {
      setPaymentStatus('success');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (paymentStatus === 'success') {
      const countdownTimer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            dispatch({ type: 'SET_STEP', payload: 'complete' });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownTimer);
    }
  }, [paymentStatus, dispatch]);

  if (paymentStatus === 'processing') {
    return (
      <div className="payment-screen processing">
        <div className="payment-content">
          <div className="payment-animation">
            <Loader size={64} className="spinner" />
          </div>
          
          <h2>{state.language === 'he' ? 'מעבד תשלום...' : 'Processing Payment...'}</h2>
          <p>
            {state.language === 'he' 
              ? 'אנא המתינו, התשלום מעובד'
              : 'Please wait while we process your payment'
            }
          </p>
          
          <div className="order-info">
            <div className="order-number">
              <span>{state.language === 'he' ? 'מספר הזמנה:' : 'Order Number:'}</span>
              <span className="number">{state.orderNumber}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="payment-screen success">
        <div className="payment-content">
          <div className="success-animation">
            <CheckCircle size={64} className="success-icon" />
          </div>
          
          <h2>{state.language === 'he' ? 'התשלום הושלם בהצלחה!' : 'Payment Successful!'}</h2>
          <p>
            {state.language === 'he' 
              ? 'ההזמנה שלכם התקבלה ומעובדת'
              : 'Your order has been received and is being prepared'
            }
          </p>
          
          <div className="order-info">
            <div className="order-number">
              <span>{state.language === 'he' ? 'מספר הזמנה:' : 'Order Number:'}</span>
              <span className="number">{state.orderNumber}</span>
            </div>
          </div>

          <div className="redirect-info">
            <p>
              {state.language === 'he' 
                ? `מעבר אוטומטי בעוד ${countdown} שניות...`
                : `Redirecting in ${countdown} seconds...`
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}