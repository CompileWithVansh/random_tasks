const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

const products = [
  {
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio. Perfect for music lovers and professionals.',
    price: 2999,
    originalPrice: 4999,
    category: 'electronics',
    brand: 'SoundMax',
    images: [{ url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', publicId: 'headphones1' }],
    stock: 25,
    featured: true,
    tags: ['wireless', 'bluetooth', 'noise-cancelling'],
  },
  {
    name: 'Smart Fitness Watch Pro',
    description: 'Track your health with heart rate monitoring, GPS, sleep tracking, and 50+ workout modes. Water-resistant up to 50m.',
    price: 3499,
    originalPrice: 5999,
    category: 'electronics',
    brand: 'FitTech',
    images: [{ url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', publicId: 'watch1' }],
    stock: 40,
    featured: true,
    tags: ['smartwatch', 'fitness', 'health'],
  },
  {
    name: 'Premium Leather Backpack',
    description: 'Handcrafted genuine leather backpack with laptop compartment, multiple pockets, and anti-theft design. Perfect for work and travel.',
    price: 1899,
    originalPrice: 2499,
    category: 'accessories',
    brand: 'UrbanCraft',
    images: [{ url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', publicId: 'backpack1' }],
    stock: 15,
    featured: true,
    tags: ['leather', 'backpack', 'travel'],
  },
  {
    name: 'Running Shoes - Ultra Boost',
    description: 'Lightweight running shoes with responsive cushioning, breathable mesh upper, and durable rubber outsole. Ideal for daily runs.',
    price: 4299,
    originalPrice: 6999,
    category: 'footwear',
    brand: 'SprintX',
    images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', publicId: 'shoes1' }],
    stock: 30,
    featured: true,
    tags: ['running', 'sports', 'comfortable'],
  },
  {
    name: 'Minimalist Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness, color temperature control, and wireless charging base. Sleek aluminum design.',
    price: 1299,
    originalPrice: 1799,
    category: 'home',
    brand: 'LumiDesign',
    images: [{ url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', publicId: 'lamp1' }],
    stock: 20,
    tags: ['lamp', 'led', 'modern'],
  },
  {
    name: 'Classic Denim Jacket',
    description: 'Timeless denim jacket with a modern fit. Features button closure, chest pockets, and adjustable waist tabs. Versatile for any season.',
    price: 1599,
    originalPrice: 2299,
    category: 'clothing',
    brand: 'DenimCo',
    images: [{ url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500', publicId: 'jacket1' }],
    stock: 35,
    tags: ['denim', 'jacket', 'casual'],
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Compact waterproof speaker with 360° sound, 20-hour battery, and built-in microphone. Take your music anywhere.',
    price: 1799,
    originalPrice: 2999,
    category: 'electronics',
    brand: 'BassWave',
    images: [{ url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500', publicId: 'speaker1' }],
    stock: 50,
    tags: ['speaker', 'bluetooth', 'portable'],
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Extra thick 6mm yoga mat with non-slip surface, alignment lines, and carrying strap. Eco-friendly TPE material.',
    price: 899,
    originalPrice: 1299,
    category: 'sports',
    brand: 'ZenFit',
    images: [{ url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500', publicId: 'yogamat1' }],
    stock: 60,
    tags: ['yoga', 'fitness', 'eco-friendly'],
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Double-wall vacuum insulated bottle keeps drinks cold 24hrs or hot 12hrs. BPA-free, leak-proof cap. 750ml capacity.',
    price: 599,
    originalPrice: 899,
    category: 'accessories',
    brand: 'HydroElite',
    images: [{ url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500', publicId: 'bottle1' }],
    stock: 100,
    tags: ['bottle', 'insulated', 'eco'],
  },
  {
    name: 'Wireless Mechanical Keyboard',
    description: 'Compact 75% layout mechanical keyboard with hot-swappable switches, RGB backlighting, and multi-device Bluetooth connectivity.',
    price: 3999,
    originalPrice: 5499,
    category: 'electronics',
    brand: 'KeyForge',
    images: [{ url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500', publicId: 'keyboard1' }],
    stock: 18,
    featured: true,
    tags: ['keyboard', 'mechanical', 'wireless'],
  },
  {
    name: 'Oversized Graphic T-Shirt',
    description: 'Premium cotton oversized tee with unique abstract print. Relaxed fit, drop shoulders, and ribbed crew neck.',
    price: 699,
    originalPrice: 999,
    category: 'clothing',
    brand: 'StreetVibe',
    images: [{ url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', publicId: 'tshirt1' }],
    stock: 80,
    tags: ['tshirt', 'oversized', 'streetwear'],
  },
  {
    name: 'Ceramic Plant Pot Set',
    description: 'Set of 3 minimalist ceramic pots with bamboo saucers. Perfect for succulents and small plants. Matte finish in neutral tones.',
    price: 1099,
    originalPrice: 1499,
    category: 'home',
    brand: 'GreenSpace',
    images: [{ url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500', publicId: 'pots1' }],
    stock: 25,
    tags: ['plants', 'ceramic', 'decor'],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});

    // Create admin user
    await User.create({
      name: 'Admin',
      email: 'admin@shop.com',
      password: 'admin123',
      role: 'admin',
    });

    // Create test user
    await User.create({
      name: 'Test User',
      email: 'user@test.com',
      password: 'test123',
      role: 'user',
    });

    // Insert products
    await Product.insertMany(products);

    console.log('✅ Database seeded successfully!');
    console.log('Admin: admin@shopverse.com / admin123');
    console.log('User: vansh@test.com / test123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();
