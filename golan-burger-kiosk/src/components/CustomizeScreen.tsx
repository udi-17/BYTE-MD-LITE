import React, { useState } from 'react';
import { useKiosk } from '../context/KioskContext';
import { ArrowLeft, Plus, Minus } from 'lucide-react';

export function CustomizeScreen() {
  const { state, dispatch, addToCart } = useKiosk();
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<{[key: string]: string[]}>({});
  
  if (!state.selectedItem) return null;

  const item = state.selectedItem;

  const handleCustomizationChange = (customizationId: string, optionId: string, isMultiple: boolean) => {
    setSelectedCustomizations(prev => {
      const current = prev[customizationId] || [];
      
      if (isMultiple) {
        // Multiple selection - toggle option
        if (current.includes(optionId)) {
          return {
            ...prev,
            [customizationId]: current.filter(id => id !== optionId)
          };
        } else {
          return {
            ...prev,
            [customizationId]: [...current, optionId]
          };
        }
      } else {
        // Single selection - replace
        return {
          ...prev,
          [customizationId]: [optionId]
        };
      }
    });
  };

  const calculateTotalPrice = () => {
    let total = item.price * quantity;
    
    item.customizations?.forEach(customization => {
      const selectedOptions = selectedCustomizations[customization.id] || [];
      selectedOptions.forEach(optionId => {
        const option = customization.options.find(opt => opt.id === optionId);
        if (option) {
          total += option.price * quantity;
        }
      });
    });
    
    return total;
  };

  const canAddToCart = () => {
    return item.customizations?.every(customization => {
      if (customization.required) {
        const selected = selectedCustomizations[customization.id];
        return selected && selected.length > 0;
      }
      return true;
    }) ?? true;
  };

  const handleAddToCart = () => {
    if (!canAddToCart()) return;

    const cartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity,
      customizations: selectedCustomizations,
      totalPrice: calculateTotalPrice()
    };

    addToCart(cartItem);
    dispatch({ type: 'SET_STEP', payload: 'menu' });
  };

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 'menu' });
  };

  return (
    <div className="customize-screen">
      <header className="customize-header">
        <button className="back-btn" onClick={handleBack}>
          <ArrowLeft size={24} />
          <span>{state.language === 'he' ? 'חזרה' : 'Back'}</span>
        </button>
        <h2>{state.language === 'he' ? 'התאמה אישית' : 'Customize Your Order'}</h2>
      </header>

      <div className="customize-content">
        <div className="item-summary">
          <div className="item-image">
            <img src={item.image} alt={state.language === 'he' ? item.nameHeb : item.name} />
          </div>
          <div className="item-details">
            <h3>{state.language === 'he' ? item.nameHeb : item.name}</h3>
            <p>{state.language === 'he' ? item.descriptionHeb : item.description}</p>
            <div className="base-price">₪{item.price}</div>
          </div>
        </div>

        <div className="customizations">
          {item.customizations?.map(customization => (
            <div key={customization.id} className="customization-group">
              <div className="customization-header">
                <h4>{state.language === 'he' ? customization.nameHeb : customization.name}</h4>
                {customization.required && (
                  <span className="required-badge">
                    {state.language === 'he' ? 'חובה' : 'Required'}
                  </span>
                )}
              </div>
              
              <div className="customization-options">
                {customization.options.map(option => {
                  const isSelected = selectedCustomizations[customization.id]?.includes(option.id) || false;
                  
                  return (
                    <button
                      key={option.id}
                      className={`option-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleCustomizationChange(
                        customization.id, 
                        option.id, 
                        customization.type === 'multiple'
                      )}
                    >
                      <div className="option-info">
                        <span className="option-name">
                          {state.language === 'he' ? option.nameHeb : option.name}
                        </span>
                        {option.price > 0 && (
                          <span className="option-price">+₪{option.price}</span>
                        )}
                      </div>
                      <div className={`option-selector ${customization.type}`}>
                        {isSelected && <div className="selected-indicator" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="quantity-selector">
          <h4>{state.language === 'he' ? 'כמות' : 'Quantity'}</h4>
          <div className="quantity-controls">
            <button
              className="quantity-btn"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus size={20} />
            </button>
            <span className="quantity-display">{quantity}</span>
            <button
              className="quantity-btn"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="customize-footer">
        <div className="total-price">
          <span>{state.language === 'he' ? 'סה"כ:' : 'Total:'}</span>
          <span className="price">₪{calculateTotalPrice().toFixed(2)}</span>
        </div>
        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={!canAddToCart()}
        >
          {state.language === 'he' ? 'הוסף לעגלה' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}