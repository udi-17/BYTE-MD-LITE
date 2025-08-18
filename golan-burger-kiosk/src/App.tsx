import React from 'react';
import './App.css';

function App() {
  return (
    <div className="kiosk-app">
      <div className="welcome-screen">
        <div className="welcome-content">
          <div className="logo">
            <h1>🍔 Golan Burger</h1>
            <h2>גולן בורגר</h2>
          </div>
          <div className="welcome-message">
            <h3>ברוכים הבאים למסעדת גולן בורגר!</h3>
            <p>געו במסך כדי להתחיל להזמין</p>
          </div>
          <button className="start-button">
            <span>התחל הזמנה</span>
            <div className="start-icon">👆</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
