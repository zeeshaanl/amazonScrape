const request = require('request-promise');
const cheerio = require('cheerio');
const cron = require('node-cron');
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '872313025:AAF9KKoXG6pfFQe47QoBfi9H9rcDseVa5zc';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
let chatId;

bot.on('message', (msg) => {
  chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Script started');
  startCron();
});

let originalPrice = 0;

const notifyMe = (price) => {
  bot.sendMessage(chatId, `The new price is ${price}`);
}

const main = async (req, res) => {
  try {
    const amazonPage = await request({
      uri: "https://www.amazon.de/dp/B07R8JJ7KL",
      gzip: true
    });
    let $ = cheerio.load(amazonPage);
    const price = $("#priceblock_ourprice").text().trim();
    const priceWithoutCurrency = price.replace(/EUR/g, "").trim();
    if (priceWithoutCurrency !== originalPrice) {
      notifyMe(priceWithoutCurrency)
      originalPrice = priceWithoutCurrency;
    }
    console.log(priceWithoutCurrency);
  } catch (err) {
    console.log(err);
  }
};

// main();
console.log('running');

const startCron = () => {
  console.log('in start CRON');

  cron.schedule('50 * * * *', () => {
    console.log('in cron schedule');

    main();
  })
}

process.stdin.resume();

