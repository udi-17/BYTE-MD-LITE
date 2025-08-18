import { Category, MenuItem } from '../types';

export const menuData: Category[] = [
  {
    id: 'burgers',
    name: 'Burgers',
    nameHeb: 'המבורגרים',
    icon: '🍔',
    items: [
      {
        id: 'classic-burger',
        name: 'Classic Golan Burger',
        nameHeb: 'המבורגר גולן קלאסי',
        description: 'Our signature beef burger with lettuce, tomato, onion, and special sauce',
        descriptionHeb: 'המבורגר הבקר המיוחד שלנו עם חסה, עגבנייה, בצל ורוטב מיוחד',
        price: 45,
        image: '/images/classic-burger.jpg',
        category: 'burgers',
        popular: true,
        customizations: [
          {
            id: 'patty-size',
            name: 'Patty Size',
            nameHeb: 'גודל הקציצה',
            type: 'single',
            required: true,
            options: [
              { id: 'regular', name: 'Regular (120g)', nameHeb: 'רגיל (120 גרם)', price: 0 },
              { id: 'large', name: 'Large (180g)', nameHeb: 'גדול (180 גרם)', price: 8 },
              { id: 'xl', name: 'XL (240g)', nameHeb: 'ענק (240 גרם)', price: 15 }
            ]
          },
          {
            id: 'toppings',
            name: 'Extra Toppings',
            nameHeb: 'תוספות נוספות',
            type: 'multiple',
            required: false,
            options: [
              { id: 'cheese', name: 'Cheese', nameHeb: 'גבינה', price: 5 },
              { id: 'bacon', name: 'Bacon', nameHeb: 'בייקון', price: 8 },
              { id: 'avocado', name: 'Avocado', nameHeb: 'אבוקדו', price: 6 },
              { id: 'mushrooms', name: 'Mushrooms', nameHeb: 'פטריות', price: 4 }
            ]
          }
        ]
      },
      {
        id: 'spicy-burger',
        name: 'Spicy Golan Burger',
        nameHeb: 'המבורגר גולן חריף',
        description: 'Spicy beef burger with jalapeños, pepper jack cheese, and spicy mayo',
        descriptionHeb: 'המבורגר בקר חריף עם הלפיניו, גבינת פלפל וממרח חריף',
        price: 48,
        image: '/images/spicy-burger.jpg',
        category: 'burgers',
        customizations: [
          {
            id: 'spice-level',
            name: 'Spice Level',
            nameHeb: 'רמת חריפות',
            type: 'single',
            required: true,
            options: [
              { id: 'mild', name: 'Mild', nameHeb: 'עדין', price: 0 },
              { id: 'medium', name: 'Medium', nameHeb: 'בינוני', price: 0 },
              { id: 'hot', name: 'Hot', nameHeb: 'חריף', price: 0 },
              { id: 'extra-hot', name: 'Extra Hot', nameHeb: 'חריף במיוחד', price: 2 }
            ]
          }
        ]
      },
      {
        id: 'veggie-burger',
        name: 'Garden Veggie Burger',
        nameHeb: 'המבורגר ירקות',
        description: 'Plant-based patty with fresh vegetables and herb mayo',
        descriptionHeb: 'קציצה צמחית עם ירקות טריים וממרח עשבי תיבול',
        price: 42,
        image: '/images/veggie-burger.jpg',
        category: 'burgers'
      }
    ]
  },
  {
    id: 'sides',
    name: 'Sides',
    nameHeb: 'תוספות',
    icon: '🍟',
    items: [
      {
        id: 'fries',
        name: 'French Fries',
        nameHeb: 'צ\'יפס',
        description: 'Crispy golden french fries',
        descriptionHeb: 'צ\'יפס זהוב ופריך',
        price: 18,
        image: '/images/fries.jpg',
        category: 'sides',
        popular: true,
        customizations: [
          {
            id: 'size',
            name: 'Size',
            nameHeb: 'גודל',
            type: 'single',
            required: true,
            options: [
              { id: 'small', name: 'Small', nameHeb: 'קטן', price: 0 },
              { id: 'medium', name: 'Medium', nameHeb: 'בינוני', price: 5 },
              { id: 'large', name: 'Large', nameHeb: 'גדול', price: 10 }
            ]
          }
        ]
      },
      {
        id: 'onion-rings',
        name: 'Onion Rings',
        nameHeb: 'טבעות בצל',
        description: 'Crispy breaded onion rings',
        descriptionHeb: 'טבעות בצל פריכות בציפוי',
        price: 22,
        image: '/images/onion-rings.jpg',
        category: 'sides'
      }
    ]
  },
  {
    id: 'drinks',
    name: 'Drinks',
    nameHeb: 'משקאות',
    icon: '🥤',
    items: [
      {
        id: 'cola',
        name: 'Cola',
        nameHeb: 'קולה',
        description: 'Refreshing cola drink',
        descriptionHeb: 'משקה קולה מרענן',
        price: 12,
        image: '/images/cola.jpg',
        category: 'drinks',
        customizations: [
          {
            id: 'size',
            name: 'Size',
            nameHeb: 'גודל',
            type: 'single',
            required: true,
            options: [
              { id: 'small', name: 'Small (300ml)', nameHeb: 'קטן (300 מ"ל)', price: 0 },
              { id: 'medium', name: 'Medium (500ml)', nameHeb: 'בינוני (500 מ"ל)', price: 3 },
              { id: 'large', name: 'Large (700ml)', nameHeb: 'גדול (700 מ"ל)', price: 6 }
            ]
          }
        ]
      },
      {
        id: 'milkshake',
        name: 'Milkshake',
        nameHeb: 'מילקשייק',
        description: 'Creamy vanilla milkshake',
        descriptionHeb: 'מילקשייק וניל קרמי',
        price: 25,
        image: '/images/milkshake.jpg',
        category: 'drinks',
        customizations: [
          {
            id: 'flavor',
            name: 'Flavor',
            nameHeb: 'טעם',
            type: 'single',
            required: true,
            options: [
              { id: 'vanilla', name: 'Vanilla', nameHeb: 'וניל', price: 0 },
              { id: 'chocolate', name: 'Chocolate', nameHeb: 'שוקולד', price: 0 },
              { id: 'strawberry', name: 'Strawberry', nameHeb: 'תות', price: 0 },
              { id: 'oreo', name: 'Oreo', nameHeb: 'אוראו', price: 3 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    nameHeb: 'קינוחים',
    icon: '🍰',
    items: [
      {
        id: 'apple-pie',
        name: 'Apple Pie',
        nameHeb: 'פאי תפוחים',
        description: 'Warm apple pie with cinnamon',
        descriptionHeb: 'פאי תפוחים חם עם קינמון',
        price: 20,
        image: '/images/apple-pie.jpg',
        category: 'desserts'
      },
      {
        id: 'ice-cream',
        name: 'Ice Cream',
        nameHeb: 'גלידה',
        description: 'Premium vanilla ice cream',
        descriptionHeb: 'גלידת וניל פרימיום',
        price: 15,
        image: '/images/ice-cream.jpg',
        category: 'desserts',
        customizations: [
          {
            id: 'scoops',
            name: 'Number of Scoops',
            nameHeb: 'מספר כדורים',
            type: 'single',
            required: true,
            options: [
              { id: 'one', name: '1 Scoop', nameHeb: 'כדור אחד', price: 0 },
              { id: 'two', name: '2 Scoops', nameHeb: 'שני כדורים', price: 8 },
              { id: 'three', name: '3 Scoops', nameHeb: 'שלושה כדורים', price: 15 }
            ]
          }
        ]
      }
    ]
  }
];