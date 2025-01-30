const crypto = require('crypto');

// Fungsi untuk menghasilkan kode produk acak
const generateProductCode = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
};

// Daftar produk
const products = [
  {
    name: 'DISNEY 1 BULAN',
    code: generateProductCode(),
    price: 21000, // Harga disimpan sebagai angka tanpa titik
    stock: 10,
    sold: 0,
    description: 'Bebas'
  },
  {
    name: 'BESTATION',
    code: generateProductCode(),
    price: 8000,
    stock: 10,
    sold: 0,
    description: 'FULL GARANSI'
  },
  {
    name: 'PRIME SHARING',
    code: generateProductCode(),
    price: 7000,
    stock: 50,
    sold: 0,
    description: 'AMAZON PRIME VIDIO'
  },
  {
    name: 'VIDIO SHARING',
    code: generateProductCode(),
    price: 10000,
    stock: 10,
    sold: 0,
    description: 'VID SHARING'
  },
  {
    name: 'WETV 1 BULAN',
    code: generateProductCode(),
    price: 5000,
    stock: 10,
    sold: 0,
    description: 'WETV SHARING'
  },
  {
    name: 'CANVA PRO 1 BULAN',
    code: generateProductCode(),
    price: 600,
    stock: 58,
    sold: 0,
    description: 'VIA INVITE'
  },
  {
    name: 'YOUTUBE PREMIUM 1 BULAN',
    code: generateProductCode(),
    price: 1200,
    stock: 6,
    sold: 0,
    description: 'KIRIM EMAIL KE ADMIN'
  },
  {
    name: 'NETFLIX 1P2U',
    code: generateProductCode(),
    price: 13000,
    stock: 10,
    sold: 0,
    description: 'FULL GARANSI'
  }
];

module.exports = { products };

