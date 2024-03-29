export interface Product {
  id: string;
  category: Category;
  name: string;
  price: string;
  discountedPrice: string;
  isFeatured: boolean;
  newArrivals:boolean;
  size: Size;
  color: Color;
  images: Image[]
};

export interface Image {
  id: string;
  url: string;
}

export interface Billboard {
  map(arg0: (item: any) => void): import("react").ReactNode;
  id: string;
  label: string;
  imageUrl: string;
};

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
  imageUrl: string;
};

export interface Size {
  id: string;
  name: string;
  value: string;
};

export interface Color {
  id: string;
  name: string;
  value: string;
};


