import { Telegraf } from 'telegraf';
import { config } from 'dotenv';

// Constants
import { HP_INFO_FOR_CLASSES } from './constants/hp-info-for-classes';

// Helpers
import { upperFirst } from './utils';

config({
  path: '../.env'
});

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(ctx => {
  ctx.reply('Привет! Я — Пусечка, уникальный помощник одной группы путешественников');
});

bot.help(ctx => {
  ctx.reply('В процессе разработки');
});

bot.command('hp', ctx => {
  try {
    const [characterClass, level, modifier] = ctx.update.message.text.split(' ').slice(1);

    if (!characterClass || !level || !modifier) {
      ctx.reply('Некорректные данные на входе');

      return;
    }

    const parsedLevel = Number.parseInt(level, 10);
    const parsedModifier = Number.parseInt(modifier, 10);

    const hpInfo = HP_INFO_FOR_CLASSES[characterClass];

    if (!hpInfo) {
      ctx.reply(`Класс '${characterClass.toLowerCase()}' не был обнаружен в системе`);

      return;
    }

    const hp = hpInfo.hitDie + (hpInfo.defaultHPForLevel * (parsedLevel - 1)) + (parsedModifier * parsedLevel);

    ctx.reply(
      `${upperFirst(characterClass.toLowerCase())} ${parsedLevel}-го уровня с модификатором `
      + `телосложения ${parsedModifier} обладает ${hp} хитов`
    );
  } catch (err) {
    console.error(err);

    ctx.reply('Ой-ёй, что-то пошло не по плану...');
  }
});

bot.launch()
  .catch((error) => {
    console.error(error)
  });

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
