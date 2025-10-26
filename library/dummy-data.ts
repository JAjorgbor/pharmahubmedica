export interface IProduct {
  _id: string
  image: string
  productName: string
  productSlug: string
  productId: string
  category: string
  price: number
  updatedAt: string
  createdAt: string
  inStock: boolean
  visible: boolean
}

export const products: IProduct[] = [
  {
    _id: '1',
    image: 'https://dummyimage.com/600x400/009688/fff&text=Pain+Relief',
    productName: 'Ibuprofen 200mg Tablets',
    productSlug: 'ibuprofen-200mg-tablets',
    productId: 'PHR001',
    category: 'Pain Relief',
    price: 6.99 * 1000,
    updatedAt: '2025-10-01T12:00:00Z',
    createdAt: '2025-09-15T09:30:00Z',
    inStock: true,
    visible: true,
  },
  {
    _id: '2',
    image: 'https://dummyimage.com/600x400/3f51b5/fff&text=Vitamins',
    productName: 'Vitamin C 1000mg',
    productSlug: 'vitamin-c-1000mg',
    productId: 'PHR002',
    category: 'Vitamins & Supplements',
    price: 12.5 * 1000,
    updatedAt: '2025-10-02T08:45:00Z',
    createdAt: '2025-09-16T10:00:00Z',
    inStock: true,
    visible: true,
  },
  {
    _id: '3',
    image: 'https://dummyimage.com/600x400/8bc34a/fff&text=First+Aid',
    productName: 'Adhesive Bandages Pack',
    productSlug: 'adhesive-bandages-pack',
    productId: 'PHR003',
    category: 'First Aid',
    price: 3.99 * 1000,
    updatedAt: '2025-10-03T14:10:00Z',
    createdAt: '2025-09-17T08:20:00Z',
    inStock: true,
    visible: true,
  },
  {
    _id: '4',
    image: 'https://dummyimage.com/600x400/f44336/fff&text=Cold+Flu',
    productName: 'Cold & Flu Relief Capsules',
    productSlug: 'cold-flu-relief-capsules',
    productId: 'PHR004',
    category: 'Cold & Flu',
    price: 8.49 * 1000,
    updatedAt: '2025-10-04T11:25:00Z',
    createdAt: '2025-09-18T07:00:00Z',
    inStock: true,
    visible: true,
  },
  {
    _id: '5',
    image: 'https://dummyimage.com/600x400/9c27b0/fff&text=Personal+Care',
    productName: 'Aloe Vera Moisturizing Lotion',
    productSlug: 'aloe-vera-moisturizing-lotion',
    productId: 'PHR005',
    category: 'Personal Care',
    price: 7.25 * 1000,
    updatedAt: '2025-10-05T15:40:00Z',
    createdAt: '2025-09-19T09:50:00Z',
    inStock: true,
    visible: true,
  },
  {
    _id: '6',
    image: 'https://dummyimage.com/600x400/ff9800/fff&text=Vitamins',
    productName: 'Multivitamin Gummies',
    productSlug: 'multivitamin-gummies',
    productId: 'PHR006',
    category: 'Vitamins & Supplements',
    price: 14.99 * 1000,
    updatedAt: '2025-10-06T10:30:00Z',
    createdAt: '2025-09-20T11:10:00Z',
    inStock: true,
    visible: true,
  },
  {
    _id: '7',
    image: 'https://dummyimage.com/600x400/00bcd4/fff&text=Skin+Care',
    productName: 'Sunscreen SPF 50',
    productSlug: 'sunscreen-spf-50',
    productId: 'PHR007',
    category: 'Skin Care',
    price: 11.49 * 1000,
    updatedAt: '2025-10-07T13:00:00Z',
    createdAt: '2025-09-21T08:00:00Z',
    inStock: true,
    visible: true,
  },
  {
    _id: '8',
    image: 'https://dummyimage.com/600x400/4caf50/fff&text=Baby+Care',
    productName: 'Baby Wipes 80ct',
    productSlug: 'baby-wipes-80ct',
    productId: 'PHR008',
    category: 'Baby Care',
    price: 5.99 * 1000,
    updatedAt: '2025-10-08T09:15:00Z',
    createdAt: '2025-09-22T07:45:00Z',
    inStock: true,
    visible: true,
  },
  {
    _id: '9',
    image: 'https://dummyimage.com/600x400/cddc39/fff&text=Pain+Relief',
    productName: 'Acetaminophen 500mg',
    productSlug: 'acetaminophen-500mg',
    productId: 'PHR009',
    category: 'Pain Relief',
    price: 6.25 * 1000,
    updatedAt: '2025-10-09T12:00:00Z',
    createdAt: '2025-09-23T09:30:00Z',
    inStock: true,
    visible: true,
  },
  {
    _id: '10',
    image: 'https://dummyimage.com/600x400/ff5722/fff&text=Cold+Flu',
    productName: 'Cough Syrup for Adults',
    productSlug: 'cough-syrup-for-adults',
    productId: 'PHR010',
    category: 'Cold & Flu',
    price: 9.99 * 1000,
    updatedAt: '2025-10-10T14:25:00Z',
    createdAt: '2025-09-24T08:55:00Z',
    inStock: false,
    visible: false,
  },
  {
    _id: '11',
    image: 'https://dummyimage.com/600x400/607d8b/fff&text=First+Aid',
    productName: 'Antiseptic Cream 30g',
    productSlug: 'antiseptic-cream-30g',
    productId: 'PHR011',
    category: 'First Aid',
    price: 4.75 * 1000,
    updatedAt: '2025-10-11T10:40:00Z',
    createdAt: '2025-09-25T07:30:00Z',
    inStock: true,
    visible: true,
  },
  {
    _id: '12',
    image: 'https://dummyimage.com/600x400/795548/fff&text=Digestive+Health',
    productName: 'Probiotic Capsules',
    productSlug: 'probiotic-capsules',
    productId: 'PHR012',
    category: 'Digestive Health',
    price: 18.99 * 1000,
    updatedAt: '2025-10-12T11:50:00Z',
    createdAt: '2025-09-26T10:00:00Z',
    inStock: true,
    visible: true,
  },
  {
    _id: '13',
    image: 'https://dummyimage.com/600x400/e91e63/fff&text=Personal+Care',
    productName: 'Toothpaste Whitening 100ml',
    productSlug: 'toothpaste-whitening-100ml',
    productId: 'PHR013',
    category: 'Personal Care',
    price: 3.99 * 1000,
    updatedAt: '2025-10-13T09:10:00Z',
    createdAt: '2025-09-27T08:10:00Z',
    inStock: true,
    visible: true,
  },
  {
    _id: '14',
    image: 'https://dummyimage.com/600x400/9e9e9e/fff&text=Skin+Care',
    productName: 'Hydrating Face Wash',
    productSlug: 'hydrating-face-wash',
    productId: 'PHR014',
    category: 'Skin Care',
    price: 8.75 * 1000,
    updatedAt: '2025-10-14T13:25:00Z',
    createdAt: '2025-09-28T07:15:00Z',
    inStock: true,
    visible: true,
  },
  {
    _id: '15',
    image: 'https://dummyimage.com/600x400/673ab7/fff&text=Sexual+Wellness',
    productName: 'Lubricant Gel 100ml',
    productSlug: 'lubricant-gel-100ml',
    productId: 'PHR015',
    category: 'Sexual Wellness',
    price: 9.49 * 1000,
    updatedAt: '2025-10-15T15:40:00Z',
    createdAt: '2025-09-29T09:45:00Z',
    inStock: true,
    visible: true,
  },
  {
    _id: '16',
    image: 'https://dummyimage.com/600x400/ffeb3b/000&text=Vitamins',
    productName: 'Vitamin D3 2000IU',
    productSlug: 'vitamin-d3-2000iu',
    productId: 'PHR016',
    category: 'Vitamins & Supplements',
    price: 10.99 * 1000,
    updatedAt: '2025-10-16T11:00:00Z',
    createdAt: '2025-09-30T08:00:00Z',
    inStock: true,
    visible: true,
  },
  {
    _id: '17',
    image: 'https://dummyimage.com/600x400/4caf50/fff&text=Baby+Care',
    productName: 'Baby Shampoo 250ml',
    productSlug: 'baby-shampoo-250ml',
    productId: 'PHR017',
    category: 'Baby Care',
    price: 6.49 * 1000,
    updatedAt: '2025-10-17T10:20:00Z',
    createdAt: '2025-10-01T07:40:00Z',
    inStock: true,
    visible: true,
  },
  {
    _id: '18',
    image: 'https://dummyimage.com/600x400/2196f3/fff&text=Respiratory+Care',
    productName: 'Saline Nasal Spray',
    productSlug: 'saline-nasal-spray',
    productId: 'PHR018',
    category: 'Respiratory Care',
    price: 5.99 * 1000,
    updatedAt: '2025-10-18T09:50:00Z',
    createdAt: '2025-10-02T09:00:00Z',
    inStock: true,
    visible: true,
  },
  {
    _id: '19',
    image: 'https://dummyimage.com/600x400/ffc107/000&text=Pain+Relief',
    productName: 'Pain Relief Cream 50g',
    productSlug: 'pain-relief-cream-50g',
    productId: 'PHR019',
    category: 'Pain Relief',
    price: 7.99 * 1000,
    updatedAt: '2025-10-19T12:00:00Z',
    createdAt: '2025-10-03T08:30:00Z',
    inStock: true,
    visible: true,
  },
  {
    _id: '20',
    image: 'https://dummyimage.com/600x400/009688/fff&text=Medical+Devices',
    productName: 'Digital Thermometer',
    productSlug: 'digital-thermometer',
    productId: 'PHR020',
    category: 'Medical Devices',
    price: 13.5 * 1000,
    updatedAt: '2025-10-20T08:15:00Z',
    createdAt: '2025-10-04T09:10:00Z',
    inStock: true,
    visible: true,
  },
]

export interface ICategory {
  _id: string
  name: string
  slug: string
  description: string
  image: string
  products: number
  visible: boolean
  updatedAt: string
  createdAt: string
  subcategories: { name: string; slug: string }[]
}

export const categories: ICategory[] = [
  {
    _id: 'c1',
    name: 'Pain Relief',
    slug: 'pain-relief',
    description: 'Medications and creams to reduce pain and inflammation.',
    image: 'https://dummyimage.com/600x400/ffc107/000&text=Pain+Relief',
    products: 42,
    visible: true,
    subcategories: [
      { name: 'Analgesic Tablets', slug: 'analgesic-tablets' },
      { name: 'Pain Relief Creams', slug: 'pain-relief-creams' },
      { name: 'Joint & Muscle Rubs', slug: 'joint-muscle-rubs' },
    ],
    createdAt: '2025-10-23T21:00:00.000Z',
    updatedAt: '2025-10-23T21:00:00.000Z',
  },
  {
    _id: 'c2',
    name: 'Vitamins & Supplements',
    slug: 'vitamins-and-supplements',
    description:
      'Essential vitamins, minerals, and daily supplements for overall health.',
    image:
      'https://dummyimage.com/600x400/ffeb3b/000&text=Vitamins+%26+Supplements',
    products: 78,
    visible: false,
    subcategories: [
      { name: 'Multivitamins', slug: 'multivitamins' },
      { name: 'Mineral Supplements', slug: 'mineral-supplements' },
      { name: 'Herbal Supplements', slug: 'herbal-supplements' },
    ],
    createdAt: '2025-10-23T21:00:00.000Z',
    updatedAt: '2025-10-23T21:00:00.000Z',
  },
  {
    _id: 'c3',
    name: 'First Aid',
    slug: 'first-aid',
    description: 'Supplies and creams for minor cuts, burns, and injuries.',
    image: 'https://dummyimage.com/600x400/8bc34a/fff&text=First+Aid',
    products: 36,
    visible: true,
    subcategories: [
      { name: 'Bandages & Plasters', slug: 'bandages-plasters' },
      { name: 'Antiseptics', slug: 'antiseptics' },
      { name: 'Burn Creams', slug: 'burn-creams' },
    ],
    createdAt: '2025-10-23T21:00:00.000Z',
    updatedAt: '2025-10-23T21:00:00.000Z',
  },
  {
    _id: 'c4',
    name: 'Cold & Flu',
    slug: 'cold-and-flu',
    description: 'Relief products for cough, fever, and flu symptoms.',
    image: 'https://dummyimage.com/600x400/f44336/fff&text=Cold+%26+Flu',
    products: 51,
    visible: true,
    subcategories: [
      { name: 'Cough Syrups', slug: 'cough-syrups' },
      { name: 'Fever Reducers', slug: 'fever-reducers' },
      { name: 'Nasal Sprays', slug: 'nasal-sprays' },
    ],
    createdAt: '2025-10-23T21:00:00.000Z',
    updatedAt: '2025-10-23T21:00:00.000Z',
  },
  {
    _id: 'c5',
    name: 'Personal Care',
    slug: 'personal-care',
    description: 'Everyday hygiene and body care essentials.',
    image: 'https://dummyimage.com/600x400/9c27b0/fff&text=Personal+Care',
    products: 65,
    visible: false,
    subcategories: [
      { name: 'Oral Care', slug: 'oral-care' },
      { name: 'Deodorants', slug: 'deodorants' },
      { name: 'Bath & Body', slug: 'bath-body' },
    ],
    createdAt: '2025-10-23T21:00:00.000Z',
    updatedAt: '2025-10-23T21:00:00.000Z',
  },
  {
    _id: 'c6',
    name: 'Skin Care',
    slug: 'skin-care',
    description:
      'Moisturizers, sunscreens, and facial cleansers for healthy skin.',
    image: 'https://dummyimage.com/600x400/00bcd4/fff&text=Skin+Care',
    visible: true,
    products: 70,
    subcategories: [
      { name: 'Moisturizers', slug: 'moisturizers' },
      { name: 'Sunscreens', slug: 'sunscreens' },
      { name: 'Cleansers', slug: 'cleansers' },
    ],
    createdAt: '2025-10-23T21:00:00.000Z',
    updatedAt: '2025-10-23T21:00:00.000Z',
  },
  {
    _id: 'c7',
    name: 'Baby Care',
    slug: 'baby-care',
    description: 'Gentle and safe products for babies and infants.',
    image: 'https://dummyimage.com/600x400/4caf50/fff&text=Baby+Care',
    products: 58,
    visible: false,
    subcategories: [
      { name: 'Baby Lotion', slug: 'baby-lotion' },
      { name: 'Diapers', slug: 'diapers' },
      { name: 'Baby Powder', slug: 'baby-powder' },
    ],
    createdAt: '2025-10-23T21:00:00.000Z',
    updatedAt: '2025-10-23T21:00:00.000Z',
  },
  {
    _id: 'c8',
    name: 'Digestive Health',
    slug: 'digestive-health',
    description: 'Probiotics and aids for digestive balance and gut health.',
    image: 'https://dummyimage.com/600x400/795548/fff&text=Digestive+Health',
    products: 33,
    visible: true,
    subcategories: [
      { name: 'Probiotics', slug: 'probiotics' },
      { name: 'Antacids', slug: 'antacids' },
      { name: 'Laxatives', slug: 'laxatives' },
    ],
    createdAt: '2025-10-23T21:00:00.000Z',
    updatedAt: '2025-10-23T21:00:00.000Z',
  },
  {
    _id: 'c9',
    name: 'Sexual Wellness',
    slug: 'sexual-wellness',
    description:
      'Products promoting intimacy, safety, and reproductive health.',
    image: 'https://dummyimage.com/600x400/673ab7/fff&text=Sexual+Wellness',
    products: 24,
    visible: false,
    subcategories: [
      { name: 'Condoms', slug: 'condoms' },
      { name: 'Lubricants', slug: 'lubricants' },
      { name: 'Fertility Aids', slug: 'fertility-aids' },
    ],
    createdAt: '2025-10-23T21:00:00.000Z',
    updatedAt: '2025-10-23T21:00:00.000Z',
  },
  {
    _id: 'c10',
    name: 'Respiratory Care',
    slug: 'respiratory-care',
    description: 'Sprays and treatments for nasal and respiratory relief.',
    image: 'https://dummyimage.com/600x400/2196f3/fff&text=Respiratory+Care',
    products: 29,
    visible: true,
    subcategories: [
      { name: 'Inhalers', slug: 'inhalers' },
      { name: 'Nasal Drops', slug: 'nasal-drops' },
      { name: 'Steam Inhalants', slug: 'steam-inhalants' },
    ],
    createdAt: '2025-10-23T21:00:00.000Z',
    updatedAt: '2025-10-23T21:00:00.000Z',
  },
  {
    _id: 'c11',
    name: 'Medical Devices',
    slug: 'medical-devices',
    description:
      'Digital thermometers, blood pressure monitors, and other home-use devices.',
    image: 'https://dummyimage.com/600x400/009688/fff&text=Medical+Devices',
    products: 41,
    visible: false,
    subcategories: [
      { name: 'Thermometers', slug: 'thermometers' },
      { name: 'Blood Pressure Monitors', slug: 'blood-pressure-monitors' },
      { name: 'Glucometers', slug: 'glucometers' },
    ],
    createdAt: '2025-10-23T21:00:00.000Z',
    updatedAt: '2025-10-23T21:00:00.000Z',
  },
]

export interface IOrder {
  _id: string
  customerId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: Item[]
  totalAmount: number
  orderDate: string
  status: 'pending' | 'confirmed' | 'fulfilled' | 'cancelled'
  paymentStatus: 'paid' | 'pending' | 'refunded' | 'failed'

  notes?: string
  fulfillmentDate?: string
  referralId?: string
}

export interface Item {
  productId: number
  productName: string
  productImage: string
  quantity: number
  price: number
  totalPrice: number
}

export const orders: IOrder[] = [
  {
    _id: 'ORD-001',
    customerId: '3',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+1234567890',
    items: [
      {
        productId: 1,
        productName: 'Vitamin D3 1000 IU',
        productImage: '/vitamin-d3-supplement-bottle.jpg',
        quantity: 2,
        price: 12.99,
        totalPrice: 25.98,
      },
      {
        productId: 2,
        productName: 'Pain Relief Tablets',
        productImage: '/pain-relief-medicine-tablets.jpg',
        quantity: 1,
        price: 8.49,
        totalPrice: 8.49,
      },
    ],
    totalAmount: 34.47 * 1000,
    status: 'pending',
    paymentStatus: 'pending',
    orderDate: '2024-01-15T10:30:00Z',
    notes: 'Customer requested fast delivery',
  },
  {
    _id: 'ORD-002',
    customerId: '3',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+1234567891',
    items: [
      {
        productId: 3,
        productName: 'Digital Thermometer',
        productImage: '/digital-medical-thermometer.jpg',
        quantity: 1,
        price: 24.99,
        totalPrice: 24.99,
      },
    ],
    totalAmount: 24.99 * 1000,
    status: 'fulfilled',
    paymentStatus: 'paid',
    orderDate: '2024-01-14T15:45:00Z',
    fulfillmentDate: '2024-01-15T09:00:00Z',
  },
  {
    _id: 'ORD-003',
    customerId: '2',
    customerName: 'Dr. Sarah Johnson',
    customerEmail: 'doctor@example.com',
    customerPhone: '+1234567892',
    items: [
      {
        productId: 4,
        productName: 'Omega-3 Fish Oil',
        productImage: '/omega-3-capsules.png',
        quantity: 3,
        price: 19.99,
        totalPrice: 59.97,
      },
    ],
    totalAmount: 59.97 * 1000,
    status: 'confirmed',
    paymentStatus: 'paid',
    orderDate: '2024-01-13T12:20:00Z',
    referralId: 'REF-001',
  },
  {
    _id: 'ORD-004',
    customerId: '3',
    customerName: 'Mary Wilson',
    customerEmail: 'mary@example.com',
    customerPhone: '+1234567893',
    items: [
      {
        productId: 5,
        productName: 'Blood Pressure Monitor',
        productImage: '/digital-blood-pressure-monitor.png',
        quantity: 1,
        price: 49.99,
        totalPrice: 49.99,
      },
      {
        productId: 6,
        productName: 'Multivitamin Complex',
        productImage: '/multivitamin-tablets-bottle.jpg',
        quantity: 2,
        price: 16.99,
        totalPrice: 33.98,
      },
    ],
    totalAmount: 83.97 * 1000,
    status: 'cancelled',
    paymentStatus: 'refunded',
    orderDate: '2024-01-12T08:15:00Z',
    notes: 'Customer cancelled due to change of mind',
  },
  {
    _id: 'ORD-005',
    customerId: '3',
    customerName: 'Robert Brown',
    customerEmail: 'robert@example.com',
    customerPhone: '+1234567894',
    items: [
      {
        productId: 1,
        productName: 'Vitamin D3 1000 IU',
        productImage: '/vitamin-d3-supplement-bottle.jpg',
        quantity: 1,
        price: 12.99,
        totalPrice: 12.99,
      },
    ],
    totalAmount: 12.99 * 1000,
    status: 'fulfilled',
    paymentStatus: 'paid',
    orderDate: '2024-01-11T16:30:00Z',
    fulfillmentDate: '2024-01-12T11:00:00Z',
  },
]
