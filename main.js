const TelegramBot = require('node-telegram-bot-api');

// Ganti dengan token API bot Anda
const token = '7942592653:AAH-wGHcdutFoqhTp-rItVI1rCRK1vlkpUk';

// Buat instance bot
const bot = new TelegramBot(token, { polling: true });

// Event ketika bot menerima perintah /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id; // Mengambil User ID

    // Mendapatkan waktu dan tanggal saat ini
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const currentTime = now.toLocaleDateString('id-ID', options);

    const welcomeMessage = `☺️ *Halo ${msg.from.first_name}!*\n\n` +
                           `👋 Selamat datang di bot kami.\nBot Telegram gratis ini dirancang untuk memberikan layanan informasi dan interaksi sederhana. Dengan fitur seperti pesan sambutan, daftar perintah interaktif, dan informasi premium, bot ini memudahkan pengguna untuk mengakses layanan dengan cepat dan efisien. Ideal untuk komunitas atau bisnis kecil yang ingin menyediakan otomatisasi tanpa biaya tambahan.\n\n` +
                           `🔍 ID Anda : \`${userId}\`\n` +
                           `🌍 Waktu saat ini : ${currentTime}\n\n` +
                           `🔥 Gunakan tombol di bawah ini untuk menjelajahi fitur bot kami.`;

    const replyOptions = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Help', callback_data: '/help' },
                    { text: 'Uptime', callback_data: '/uptime' }
                ],
                [
                    { text: 'Premium', callback_data: '/premium' }
                ],
                [
                    { text: 'Report Bug', url: 'https://t.me/+iq1HFC5X4BZhYWVl' } // Ganti dengan tautan undangan grup Anda
                ]
            ]
        }
    };

    bot.sendMessage(chatId, welcomeMessage, replyOptions);
});

// Handler untuk tombol yang diklik
bot.on('callback_query', (callbackQuery) => {
    const message = callbackQuery.message;
    const chatId = message.chat.id;
    const data = callbackQuery.data;

    if (data === '/help') {
        const helpMessage = `*Daftar Perintah:*\n\n` +
                            `📦 */start* - Memulai bot\n` +
                            `📦 */help* - Melihat daftar perintah bot ini\n` +
                            `📦 */uptime* - Melihat waktu aktif bot\n` +
                            `📦 */premium* - Informasi tentang fitur premium`;

        bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
    } else if (data === '/uptime') {
        const uptime = process.uptime();
        const uptimeMessage = `⏰ Bot telah aktif selama *${Math.floor(uptime / 60)} menit*.`;
        bot.sendMessage(chatId, uptimeMessage, { parse_mode: 'Markdown' });
    } else if (data === '/premium') {
        const premiumMessage = `*Fitur Premium:*\n\n` +
                               `💳 Akses ke fitur eksklusif\n` +
                               `💳 Dukungan prioritas\n` +
                               `💳 Request commands seusai konsumen!\n\n` +
                               `📌 Untuk informasi lebih lanjut atau berlangganan, silakan ketik /start pilih button Report Bug`;
        bot.sendMessage(chatId, premiumMessage, { parse_mode: 'Markdown' });
    }

    bot.answerCallbackQuery(callbackQuery.id);
});
