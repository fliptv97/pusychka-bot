const { Telegraf } = require('telegraf');

// Constants
const HP_INFO_FOR_CLASSES = require('./constants/hp-info-for-classes');

// Helpers
const upperFirst = require('./utils/upper-first');

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => {
  ctx.reply('Привет! Я — Пусечка, уникальный помощник одной группы путешественников');
});
bot.help(ctx => {
  ctx.reply('Not implemented');
});
bot.command('hp', ctx => {
  try {
    let [charClass, lvl, mod] = ctx.update.message.text.split(' ').slice(1);

    charClass = charClass.toLowerCase();
    lvl = Number.parseInt(lvl, 10);
    mod = Number.parseInt(mod, 10);

    const hpInfo = HP_INFO_FOR_CLASSES[charClass];

    if (!hpInfo) {
      ctx.reply(`Класс '${charClass}' не был обнаружен в системе'`);

      return;
    }

    const hp = hpInfo.hitDie + (hpInfo.defaultHPForLevel * (lvl - 1)) + (mod * lvl);

    ctx.reply(
      `${upperFirst(charClass)} ${lvl}-го уровня с модификатором `
      + `телосложения ${mod} обладает ${hp} хитов`
    );
  } catch (err) {
    console.error(err);

    ctx.reply('Ой-ёй, что-то пошло не по плану...');
  }
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
