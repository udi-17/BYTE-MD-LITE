export interface MenuItem {
  id: string;
  name: string;
  nameHeb: string;
  description: string;
  descriptionHeb: string;
  price: number;
  image: string;
  category: string;
  customizations?: Customization[];
  popular?: boolean;
}

export interface Customization {
  id: string;
  name: string;
  nameHeb: string;
  type: 'single' | 'multiple';
  required: boolean;
  options: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  name: string;
  nameHeb: string;
  price: number;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations: { [key: string]: string[] };
  totalPrice: number;
}

export interface Category {
  id: string;
  name: string;
  nameHeb: string;
  icon: string;
  items: MenuItem[];
}

export type Language = 'he' | 'en';