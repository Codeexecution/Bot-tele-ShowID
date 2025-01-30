process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; // Untuk mengabaikan warning TLS (jika ada)
process.emitWarning = () => {}; // Nonaktifkan semua warning

const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.js');
const { products } = require('./stok');
const { handleBuyCommand } = require('./buy.js');
const { handleDoneCommand } = require('./d.js');
const { handlePaymentCommand } = require('./payment.js');

// Membuat bot dengan token dari config.js
const bot = new TelegramBot(config.token, { polling: true });

// Command /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name;

  const startMessage = `
𝓣𝓮𝓻𝓲𝓶𝓪𝓴𝓪𝓼𝓲𝓱 𝓭𝓪𝓷 𝓼𝓮𝓵𝓪𝓶𝓪𝓽 𝓭𝓪𝓽𝓪𝓷𝓰 𝓭𝓲 𝓼𝓽𝓸𝓻𝓮 𝓲𝓷𝓲

📌 *List perintah*:
✅ *Cek stok ketik /stok*
✅ *Buy stok ketik /buy*
✅ *Payment untuk pembayaran ketik /payment*

✨ *Jika masih kurang paham, boleh tanyakan mimin ya!*`;
  bot.sendMessage(chatId, startMessage, { parse_mode: 'Markdown' });
});

// Command /stok
bot.onText(/\/stok/, (msg) => {
  const chatId = msg.chat.id;

  let responseMessage = '🛍️ *CARA PEMBELIAN PRODUK*\n\n・Cek stok dengan /stok\n・Cara pembelian produk /buy\n・Ingat setiap produk ada kode produk ya!\n\n📦 *Daftar Produk*:\n';
  products.forEach(product => {
    responseMessage += `
╭──〔 *${product.name}* 〕─
┊・🔑| Kode: ${product.code}
┊・💵| Harga: ${product.price.toLocaleString('id-ID')}
┊・📦| Sisa Stok: ${product.stock}
┊・📈| Terjual: ${product.sold}
╰───────────
`;
  });

  bot.sendMessage(chatId, responseMessage, { parse_mode: 'Markdown' });
});

// Command /buy
bot.onText(/\/buy/, (msg) => {
  handleBuyCommand(msg, bot);
});

// Command /d
bot.onText(/\/d/, (msg) => {
  handleDoneCommand(msg, bot);
});

// Command /payment
bot.onText(/\/payment/, (msg) => {
  handlePaymentCommand(msg, bot);
});

// Menyambut member baru
bot.on('new_chat_members', (msg) => {
  const chatId = msg.chat.id;
  const newMembers = msg.new_chat_members.map(member => member.first_name).join(', ');

  const welcomeMessage = `
ೋ━━━━━━━━━━━━ೋ
🎉  *Selamat Datang!*  🎉
ೋ━━━━━━━━━━━━ೋ

Halo *${newMembers}*! 👋

🎊 Silahkan ketik /start untuk melihat menu grup

📌 *List perintah*:
✅ *Cek stok ketik /stok*
✅ *Buy stok ketik /buy*
✅ *Payment untuk pembayaran ketik /payment*

✨ *Jika masih kurang paham boleh tanyakan mimin ya dan untuk stok yang tidak ada boleh tanyakan mimin juga.*
ೋ━━━━━━━━━━━━ೋ
`;

  bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
});

// Mengucapkan selamat tinggal pada member yang keluar
bot.on('left_chat_member', (msg) => {
  const chatId = msg.chat.id;
  const leftMember = msg.left_chat_member.first_name;

  const goodbyeMessage = `
ೋ━━━━━━━━━━━━ೋ
👋 *Selamat Tinggal!* 👋
ೋ━━━━━━━━━━━━ೋ

Sampai jumpa, *${leftMember}*! 😢

✨ See You!
ೋ━━━━━━━━━━━━ೋ
`;

  bot.sendMessage(chatId, goodbyeMessage, { parse_mode: 'Markdown' });
});
