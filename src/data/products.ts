
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  stockCount: number;
  isNewArrival: boolean;
  description: string;
  specifications: Record<string, string>;
  features: string[];
}

export const products: Product[] = [
  // Makeup & Beauty
  {
    id: '1',
    name: 'Lakme Absolute Matte Lipstick - Red Rush',
    price: 350,
    originalPrice: 450,
    category: 'Makeup & Beauty',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400',
      'https://images.unsplash.com/photo-1592327986060-5d9b6905e71c?w=400',
      'https://images.unsplash.com/photo-1583241800098-4b5fb38c4bf6?w=400',
    ],
    rating: 4.5,
    reviews: 1234,
    inStock: true,
    stockCount: 25,
    isNewArrival: false,
    description: 'Get gorgeous matte lips that last all day with Lakme Absolute Matte Lipstick. This long-lasting formula provides intense color payoff with a comfortable matte finish.',
    specifications: {
      'Brand': 'Lakme',
      'Shade': 'Red Rush',
      'Finish': 'Matte',
      'Weight': '3.7g',
      'Country of Origin': 'India',
    },
    features: [
      'Long-lasting matte finish',
      'Intense color payoff',
      'Comfortable wear for 8+ hours',
      'Cruelty-free formula',
      'Available in 12 stunning shades',
    ],
  },
  {
    id: '2',
    name: 'Maybelline New York Colossal Kajal',
    price: 199,
    originalPrice: 249,
    category: 'Makeup & Beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
      'https://images.unsplash.com/photo-1583241800098-4b5fb38c4bf6?w=400',
    ],
    rating: 4.3,
    reviews: 856,
    inStock: true,
    stockCount: 45,
    isNewArrival: true,
    description: 'Intense black kajal with long-lasting formula. Perfect for Indian eyes with smudge-proof finish.',
    specifications: {
      'Brand': 'Maybelline',
      'Color': 'Deep Black',
      'Type': 'Kajal Pencil',
      'Weight': '0.35g',
    },
    features: [
      'Smudge-proof formula',
      'Intense black color',
      '12-hour wear',
      'Easy application',
    ],
  },
  {
    id: '3',
    name: 'Nykaa SKINgenius Foundation',
    price: 699,
    originalPrice: 899,
    category: 'Makeup & Beauty',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    ],
    rating: 4.2,
    reviews: 432,
    inStock: true,
    stockCount: 30,
    isNewArrival: false,
    description: 'Medium to full coverage foundation perfect for Indian skin tones. Lightweight and breathable.',
    specifications: {
      'Brand': 'Nykaa',
      'Shade': 'Warm Beige',
      'Coverage': 'Medium to Full',
      'Volume': '30ml',
    },
    features: [
      'Suits Indian skin tones',
      'SPF 20 protection',
      'Oil-free formula',
      'Long-lasting coverage',
    ],
  },

  // Electronics
  {
    id: '4',
    name: 'boAt Airdopes 131 Wireless Earbuds',
    price: 1299,
    originalPrice: 1999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400',
    ],
    rating: 4.2,
    reviews: 3456,
    inStock: true,
    stockCount: 50,
    isNewArrival: true,
    description: 'True wireless earbuds with superior sound quality and long battery life. Perfect for workouts and daily use.',
    specifications: {
      'Brand': 'boAt',
      'Battery Life': '20 Hours',
      'Connectivity': 'Bluetooth 5.0',
      'Water Resistance': 'IPX4',
    },
    features: [
      'True wireless stereo',
      'Voice assistant compatible',
      'Sweat and water resistant',
      'Instant voice assistant',
    ],
  },
  {
    id: '5',
    name: 'Fire-Boltt Ninja Call Pro Smartwatch',
    price: 2499,
    originalPrice: 3999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
    ],
    rating: 4.0,
    reviews: 2145,
    inStock: true,
    stockCount: 35,
    isNewArrival: false,
    description: 'Full-featured smartwatch with calling facility, health monitoring, and sports tracking.',
    specifications: {
      'Brand': 'Fire-Boltt',
      'Display': '1.69" HD',
      'Battery': '7 Days',
      'Water Resistance': 'IP67',
    },
    features: [
      'Bluetooth calling',
      'Health monitoring',
      '100+ sports modes',
      'Always-on display',
    ],
  },
  {
    id: '6',
    name: 'Ambrane 10000mAh Power Bank',
    price: 899,
    originalPrice: 1299,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1609592669991-53833df0b5b4?w=400',
    images: [
      'https://images.unsplash.com/photo-1609592669991-53833df0b5b4?w=400',
      'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400',
    ],
    rating: 4.4,
    reviews: 1876,
    inStock: true,
    stockCount: 60,
    isNewArrival: false,
    description: 'High-capacity power bank with fast charging technology. Perfect for travel and daily use.',
    specifications: {
      'Brand': 'Ambrane',
      'Capacity': '10000mAh',
      'Input/Output': 'Type-C & USB',
      'Fast Charging': '18W',
    },
    features: [
      'Dual USB output',
      'Fast charging support',
      'LED battery indicator',
      'Compact design',
    ],
  },

  // Home Decor
  {
    id: '7',
    name: 'Philips LED Warm White Desk Lamp',
    price: 1199,
    originalPrice: 1699,
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400',
    ],
    rating: 4.6,
    reviews: 543,
    inStock: true,
    stockCount: 25,
    isNewArrival: false,
    description: 'Adjustable LED desk lamp with warm white light. Perfect for study and work.',
    specifications: {
      'Brand': 'Philips',
      'Power': '9W LED',
      'Color Temperature': '2700K',
      'Adjustable': 'Yes',
    },
    features: [
      'Energy efficient LED',
      '360-degree rotation',
      'Touch controls',
      'Eye-care lighting',
    ],
  },
  {
    id: '8',
    name: 'Decorative Ceramic Vase Set',
    price: 799,
    originalPrice: 1299,
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    ],
    rating: 4.3,
    reviews: 267,
    inStock: true,
    stockCount: 40,
    isNewArrival: true,
    description: 'Beautiful ceramic vase set of 3 pieces. Perfect for modern home decoration.',
    specifications: {
      'Material': 'Ceramic',
      'Set': '3 Pieces',
      'Color': 'White & Gold',
      'Height': '15cm, 20cm, 25cm',
    },
    features: [
      'Premium ceramic finish',
      'Modern design',
      'Set of 3 different sizes',
      'Gold accent details',
    ],
  },

  // Gym & Fitness
  {
    id: '9',
    name: 'Strauss Yoga Mat Anti-Skid',
    price: 699,
    originalPrice: 1299,
    category: 'Gym & Fitness',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    ],
    rating: 4.4,
    reviews: 892,
    inStock: true,
    stockCount: 55,
    isNewArrival: false,
    description: 'Premium quality yoga mat with excellent grip and cushioning. Perfect for yoga and fitness.',
    specifications: {
      'Brand': 'Strauss',
      'Material': 'NBR Foam',
      'Size': '183cm x 61cm',
      'Thickness': '10mm',
    },
    features: [
      'Anti-skid surface',
      'Extra thick cushioning',
      'Eco-friendly material',
      'Carry strap included',
    ],
  },
  {
    id: '10',
    name: 'Kore Adjustable Dumbbells Set',
    price: 1599,
    originalPrice: 2499,
    category: 'Gym & Fitness',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    ],
    rating: 4.5,
    reviews: 678,
    inStock: true,
    stockCount: 20,
    isNewArrival: true,
    description: 'Adjustable dumbbells set perfect for home workouts. High-quality PVC coating.',
    specifications: {
      'Brand': 'Kore',
      'Weight': '5kg to 15kg',
      'Material': 'PVC Coated Iron',
      'Adjustable': 'Yes',
    },
    features: [
      'Adjustable weight',
      'Non-slip grip',
      'Durable PVC coating',
      'Space-saving design',
    ],
  },

  // Bags
  {
    id: '11',
    name: 'Wildcraft Laptop Backpack',
    price: 1899,
    originalPrice: 2999,
    category: 'Bags',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      'https://images.unsplash.com/photo-1521944405259-1baaa3b4c5d8?w=400',
    ],
    rating: 4.3,
    reviews: 1234,
    inStock: true,
    stockCount: 45,
    isNewArrival: false,
    description: 'Spacious laptop backpack with multiple compartments. Perfect for office and travel.',
    specifications: {
      'Brand': 'Wildcraft',
      'Capacity': '30 Liters',
      'Laptop Size': 'Up to 15.6"',
      'Material': 'Polyester',
    },
    features: [
      'Padded laptop compartment',
      'Multiple pockets',
      'Ergonomic design',
      'Water-resistant',
    ],
  },
  {
    id: '12',
    name: 'Lavie Handbag for Women',
    price: 1299,
    originalPrice: 1999,
    category: 'Bags',
    image: 'https://images.unsplash.com/photo-1521944405259-1baaa3b4c5d8?w=400',
    images: [
      'https://images.unsplash.com/photo-1521944405259-1baaa3b4c5d8?w=400',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    ],
    rating: 4.2,
    reviews: 567,
    inStock: true,
    stockCount: 30,
    isNewArrival: true,
    description: 'Elegant handbag for women with premium synthetic leather finish.',
    specifications: {
      'Brand': 'Lavie',
      'Material': 'Synthetic Leather',
      'Color': 'Brown',
      'Closure': 'Zip',
    },
    features: [
      'Premium synthetic leather',
      'Multiple compartments',
      'Adjustable strap',
      'Elegant design',
    ],
  },

  // Books
  {
    id: '13',
    name: 'The Alchemist by Paulo Coelho',
    price: 299,
    originalPrice: 399,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
    ],
    rating: 4.7,
    reviews: 5432,
    inStock: true,
    stockCount: 100,
    isNewArrival: false,
    description: 'A classic tale of self-discovery and following your dreams. One of the most inspiring books ever written.',
    specifications: {
      'Author': 'Paulo Coelho',
      'Pages': '163',
      'Language': 'English',
      'Publisher': 'HarperCollins',
    },
    features: [
      'International bestseller',
      'Inspiring story',
      'Easy to read',
      'Life-changing book',
    ],
  },
  {
    id: '14',
    name: 'Atomic Habits by James Clear',
    price: 449,
    originalPrice: 599,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
    images: [
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    ],
    rating: 4.8,
    reviews: 3456,
    inStock: true,
    stockCount: 75,
    isNewArrival: true,
    description: 'A revolutionary guide to building good habits and breaking bad ones. Transform your life one habit at a time.',
    specifications: {
      'Author': 'James Clear',
      'Pages': '320',
      'Language': 'English',
      'Publisher': 'Random House',
    },
    features: [
      'Practical strategies',
      'Evidence-based methods',
      'Easy to implement',
      'Life-changing insights',
    ],
  },
];

export const getProductsByCategory = (category: string) => {
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.rating >= 4.2).slice(0, 6);
};

export const getNewArrivals = () => {
  return products.filter(product => product.isNewArrival);
};

export const searchProducts = (query: string) => {
  return products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );
};
