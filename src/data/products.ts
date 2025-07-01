export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  badge?: string;
  discount?: string;
  category?: string;
  subcategory?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Basket With Handles",
    price: 160,
    image: "https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://via.placeholder.com/600x800?text=Basket+2",
      "https://via.placeholder.com/600x800?text=Basket+3"
    ],
    badge: "NEW",
    category: "home-decor",
    subcategory: "storage"
  },
  {
    id: 2,
    name: "Flower Vase",
    price: 170,
    originalPrice: 210,
    image: "https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://via.placeholder.com/600x800?text=Vase+2",
      "https://via.placeholder.com/600x800?text=Vase+3"
    ],
    badge: "NEW",
    discount: "-19%",
    category: "vases",
    subcategory: "ceramic-vases"
  },
  {
    id: 3,
    name: "Deco Accessory",
    price: 15,
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://via.placeholder.com/600x800?text=Deco+2",
      "https://via.placeholder.com/600x800?text=Deco+3"
    ],
    category: "home-decor",
    subcategory: "decorative"
  },
  {
    id: 4,
    name: "Wall Clock",
    price: 110,
    image: "https://images.pexels.com/photos/745018/pexels-photo-745018.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/745018/pexels-photo-745018.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://via.placeholder.com/600x800?text=Clock+2",
      "https://via.placeholder.com/600x800?text=Clock+3"
    ],
    badge: "NEW",
    category: "home-decor",
    subcategory: "clocks"
  },
  {
    id: 5,
    name: "Newspaper Storage",
    price: 90,
    image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://via.placeholder.com/600x800?text=Storage+2",
      "https://via.placeholder.com/600x800?text=Storage+3"
    ],
    category: "furniture",
    subcategory: "storage"
  },
  {
    id: 6,
    name: "Pottery Vase",
    price: 85,
    image: "https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://via.placeholder.com/600x800?text=Pottery+2",
      "https://via.placeholder.com/600x800?text=Pottery+3"
    ],
    category: "vases",
    subcategory: "ceramic-vases"
  },
  {
    id: 7,
    name: "Rose Holdback",
    price: 24,
    originalPrice: 30,
    image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://via.placeholder.com/600x800?text=Holdback+2",
      "https://via.placeholder.com/600x800?text=Holdback+3"
    ],
    discount: "-20%",
    category: "home-decor",
    subcategory: "curtain-accessories"
  },
  {
    id: 8,
    name: "Table Lamp",
    price: 240,
    image: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://via.placeholder.com/600x800?text=Lamp+2",
      "https://via.placeholder.com/600x800?text=Lamp+3"
    ],
    badge: "NEW",
    category: "lighting",
    subcategory: "table-lamps"
  },
  {
    id: 9,
    name: "Ceramic Tea Pot",
    price: 45,
    image: "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://via.placeholder.com/600x800?text=Tea+Pot+2",
      "https://via.placeholder.com/600x800?text=Tea+Pot+3"
    ],
    badge: "NEW",
    category: "pots",
    subcategory: "tea-pots"
  },
  {
    id: 10,
    name: "Modern Tea Pot",
    price: 65,
    originalPrice: 80,
    image: "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://via.placeholder.com/600x800?text=Tea+Pot+2",
      "https://via.placeholder.com/600x800?text=Tea+Pot+3"
    ],
    discount: "-19%",
    category: "pots",
    subcategory: "tea-pots"
  },
  {
    id: 11,
    name: "Glass Tea Pot",
    price: 55,
    image: "https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://via.placeholder.com/600x800?text=Glass+2",
      "https://via.placeholder.com/600x800?text=Glass+3"
    ],
    category: "pots",
    subcategory: "tea-pots"
  },
  {
    id: 12,
    name: "Vintage Tea Pot",
    price: 75,
    image: "https://images.pexels.com/photos/1793036/pexels-photo-1793036.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/1793036/pexels-photo-1793036.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://via.placeholder.com/600x800?text=Vintage+2",
      "https://via.placeholder.com/600x800?text=Vintage+3"
    ],
    badge: "NEW",
    category: "pots",
    subcategory: "tea-pots"
  },
  {
    id: 13,
    name: "Pendant Light",
    price: 180,
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://via.placeholder.com/600x800?text=Pendant+2",
      "https://via.placeholder.com/600x800?text=Pendant+3"
    ],
    category: "lighting",
    subcategory: "pendant-lights"
  },
  {
    id: 14,
    name: "Floor Lamp",
    price: 320,
    image: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://via.placeholder.com/600x800?text=Floor+2",
      "https://via.placeholder.com/600x800?text=Floor+3"
    ],
    badge: "NEW",
    category: "lighting",
    subcategory: "floor-lamps"
  },
  {
    id: 15,
    name: "Decorative Mirror",
    price: 125,
    image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://via.placeholder.com/600x800?text=Mirror+2",
      "https://via.placeholder.com/600x800?text=Mirror+3"
    ],
    category: "home-decor",
    subcategory: "mirrors"
  },
  {
    id: 16,
    name: "Ceramic Flower Pot",
    price: 35,
    image: "https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://via.placeholder.com/600x800?text=Flower+2",
      "https://via.placeholder.com/600x800?text=Flower+3"
    ],
    category: "pots",
    subcategory: "flower-pots"
  }
];
