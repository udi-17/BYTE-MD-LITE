import React, { useState } from 'react';
import styled from 'styled-components';
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

// Styled Components
const AppContainer = styled.div`
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.header`
  background: #d10a11;
  color: white;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const Subtitle = styled.p`
  margin: 10px 0 0 0;
  font-size: 1.2rem;
  opacity: 0.9;
`;

const MainContent = styled.main`
  display: flex;
  padding: 20px;
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

const MenuSection = styled.section`
  flex: 2;
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
`;

const CartSection = styled.section`
  flex: 1;
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  height: fit-content;
  position: sticky;
  top: 20px;
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const CategoryTab = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  background: ${props => props.active ? '#d10a11' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  font-size: 1rem;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#b00d0e' : '#e0e0e0'};
    transform: translateY(-2px);
  }
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const MenuCard = styled.div`
  border: 2px solid #f0f0f0;
  border-radius: 15px;
  padding: 15px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    border-color: #d10a11;
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(209, 10, 17, 0.2);
  }
`;

const MenuImage = styled.div`
  width: 100%;
  height: 180px;
  background: linear-gradient(45deg, #f7931e, #ff6b35);
  border-radius: 10px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

const MenuTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.3rem;
`;

const MenuDescription = styled.p`
  margin: 0 0 15px 0;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const MenuPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #d10a11;
  margin-bottom: 15px;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #d10a11;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #b00d0e;
    transform: translateY(-2px);
  }
`;

const CartTitle = styled.h2`
  color: #333;
  margin: 0 0 20px 0;
  text-align: center;
  font-size: 1.8rem;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const CartItemInfo = styled.div`
  flex: 1;
`;

const CartItemName = styled.div`
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const CartItemPrice = styled.div`
  color: #d10a11;
  font-weight: bold;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #f0f0f0;
  }
`;

const Quantity = styled.span`
  font-weight: bold;
  min-width: 30px;
  text-align: center;
`;

const CartTotal = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #eee;
  text-align: center;
`;

const TotalAmount = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #d10a11;
  margin-bottom: 20px;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 15px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #218838;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    transform: none;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  color: #666;
  padding: 40px 20px;
  font-size: 1.1rem;
`;

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
    <AppContainer>
      <Header>
        <Logo>גולנבואגר 🍔</Logo>
        <Subtitle>הטעם האמיתי של ישראל</Subtitle>
      </Header>

      <MainContent>
        <MenuSection>
          <CategoryTabs>
            {categories.map(category => (
              <CategoryTab
                key={category}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category === 'all' ? 'הכל' : category}
              </CategoryTab>
            ))}
          </CategoryTabs>

          <MenuGrid>
            {filteredItems.map(item => (
              <MenuCard key={item.id}>
                <MenuImage>{item.image}</MenuImage>
                <MenuTitle>{item.name}</MenuTitle>
                <MenuDescription>{item.description}</MenuDescription>
                <MenuPrice>₪{item.price.toFixed(2)}</MenuPrice>
                <AddButton onClick={() => addToCart(item)}>
                  הוסף לסל 🛒
                </AddButton>
              </MenuCard>
            ))}
          </MenuGrid>
        </MenuSection>

        <CartSection>
          <CartTitle>סל הקניות שלך</CartTitle>
          
          {cart.length === 0 ? (
            <EmptyCart>
              הסל שלך ריק<br />
              בחר פריטים מהתפריט
            </EmptyCart>
          ) : (
            <>
              {cart.map(item => (
                <CartItem key={item.id}>
                  <CartItemInfo>
                    <CartItemName>{item.name}</CartItemName>
                    <CartItemPrice>₪{(item.price * item.quantity).toFixed(2)}</CartItemPrice>
                  </CartItemInfo>
                  
                  <QuantityControls>
                    <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      -
                    </QuantityButton>
                    <Quantity>{item.quantity}</Quantity>
                    <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </QuantityButton>
                  </QuantityControls>
                </CartItem>
              ))}

              <CartTotal>
                <TotalAmount>סה"כ: ₪{getTotalPrice().toFixed(2)}</TotalAmount>
                <CheckoutButton onClick={handleCheckout}>
                  סיים הזמנה 💳
                </CheckoutButton>
              </CartTotal>
            </>
          )}
        </CartSection>
      </MainContent>
    </AppContainer>
  );
}

export default App;