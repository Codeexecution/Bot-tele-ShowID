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
                    { text: 'Donasi', url: 'https://example.com/donate' } // Ganti dengan tautan donasi Anda
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
        const days = Math.floor(uptime / (60 * 60 * 24));
        const hours = Math.floor((uptime % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((uptime % (60 * 60)) / 60);

        const uptimeMessage = `⏰ Bot telah aktif selama:\n` +
                              `*${days} hari, ${hours} jam, dan ${minutes} menit*.`;
        bot.sendMessage(chatId, uptimeMessage, { parse_mode: 'Markdown' });
    } else if (data === '/premium') {
        const premiumMessage = `*Note Premium*\n\n` +
                               `🔮 Tidak menerima pesan source code ilegal\n` +
                               `🔮 Dilarang menjual beli kan source code apa bila ketahuan garansi akan hangus\n` +
                               `🔮 Happy enjoy to Note premium\n\n` +
                               `📌 Untuk informasi lebih lanjut atau berlangganan, silakan pilih salah satu tombol di bawah.`;

        const premiumOptions = {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Berlangganan', url: 'https://example.com/subscription' }, // Ganti dengan URL berlangganan Anda
                        { text: 'Info Detail', callback_data: '/premium_details' }
                    ]
                ]
            }
        };

        bot.sendMessage(chatId, premiumMessage, premiumOptions);
    } else if (data === '/premium_details') {
        const premiumDetailsMessage = `*Detail Fitur Premium:*\n\n` +
                                      `✨ Akses penuh ke semua fitur premium\n` +
                                      `✨ Dukungan pelanggan prioritas\n` +
                                      `✨ Update eksklusif fitur baru\n\n` +
                                      `👉 Klik tombol *Berlangganan* untuk memulai.`;

        bot.sendMessage(chatId, premiumDetailsMessage, { parse_mode: 'Markdown' });
    }

    bot.answerCallbackQuery(callbackQuery.id);
});
