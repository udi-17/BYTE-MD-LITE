import React from 'react';
import { KioskProvider, useKiosk } from './context/KioskContext';
import { WelcomeScreen } from './components/WelcomeScreen';
import { MenuScreen } from './components/MenuScreen';
import { CustomizeScreen } from './components/CustomizeScreen';
import { CartScreen } from './components/CartScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { PaymentScreen } from './components/PaymentScreen';
import { CompleteScreen } from './components/CompleteScreen';
import './App.css';

function KioskApp() {
  const { state } = useKiosk();

  const renderCurrentScreen = () => {
    switch (state.currentStep) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'menu':
        return <MenuScreen />;
      case 'customize':
        return <CustomizeScreen />;
      case 'cart':
        return <CartScreen />;
      case 'checkout':
        return <CheckoutScreen />;
      case 'payment':
        return <PaymentScreen />;
      case 'complete':
        return <CompleteScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className={`kiosk-app ${state.language === 'he' ? 'rtl' : 'ltr'}`}>
      {renderCurrentScreen()}
    </div>
  );
}

function App() {
  return (
    <KioskProvider>
      <KioskApp />
    </KioskProvider>
  );
}

export default App;
