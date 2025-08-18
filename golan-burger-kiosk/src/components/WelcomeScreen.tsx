import React, { useEffect } from 'react';
import { useKiosk } from '../context/KioskContext';

export function WelcomeScreen() {
  const { state, dispatch } = useKiosk();

  useEffect(() => {
    // Auto-advance after 3 seconds if no interaction
    const timer = setTimeout(() => {
      dispatch({ type: 'SET_STEP', payload: 'menu' });
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleStart = () => {
    dispatch({ type: 'SET_STEP', payload: 'menu' });
  };

  const handleLanguageChange = (lang: 'he' | 'en') => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang });
  };

  return (
    <div className="welcome-screen">
      <div className="language-selector">
        <button
          className={`lang-btn ${state.language === 'he' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('he')}
        >
          עברית
        </button>
        <button
          className={`lang-btn ${state.language === 'en' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('en')}
        >
          English
        </button>
      </div>

      <div className="welcome-content">
        <div className="logo">
          <h1>🍔 Golan Burger</h1>
          <h2>{state.language === 'he' ? 'גולן בורגר' : 'Golan Burger'}</h2>
        </div>

        <div className="welcome-message">
          <h3>
            {state.language === 'he' 
              ? 'ברוכים הבאים למסעדת גולן בורגר!' 
              : 'Welcome to Golan Burger!'}
          </h3>
          <p>
            {state.language === 'he'
              ? 'געו במסך כדי להתחיל להזמין'
              : 'Touch the screen to start ordering'}
          </p>
        </div>

        <button className="start-button" onClick={handleStart}>
          <span>
            {state.language === 'he' ? 'התחל הזמנה' : 'Start Order'}
          </span>
          <div className="start-icon">👆</div>
        </button>
      </div>

      <div className="footer-info">
        <p>
          {state.language === 'he'
            ? 'המבורגרים טריים • מכינים לפי הזמנה • איכות פרימיום'
            : 'Fresh Burgers • Made to Order • Premium Quality'}
        </p>
      </div>
    </div>
  );
}