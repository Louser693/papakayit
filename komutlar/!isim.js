const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {

  let hata = new Discord.RichEmbed()
  .setColor(`#000001`)
  .setDescription(`Bu komutu kullanabilmek için <@&721017288051916830> rolüne sahip olmalısın.`)
  .setFooter(`${message.author.tag}`, message.author.avatarURL)
  if (!message.member.roles.has('721017288051916830'))  if (!message.member.roles.has('716059089007935509')) return message.channel.send(hata).then(msg => msg.delete(5000)).then(() => message.react('717488536407769159'));

  let kişi = message.mentions.users.first()
  let isim = args.slice(1).join("")
  let yaş = args.slice(2).join("")
  let isimkayıt = isim.match(/\D+/)
  if (!kişi) return message.react('717488536407769159')
  if (!isim) return message.react('717488536407769159')
  if (!yaş) return message.react('717488536407769159')
  let member = message.guild.member(kişi)
  member.setNickname(`𝕵 ${isimkayıt} | ${yaş}`)
  let kayıt = new Discord.RichEmbed()
  .setColor(`#000001`)
  .setDescription(`${kişi} kişisinin isimi \`𝕵 ${isimkayıt} | ${yaş}\` olarak kaydedildi.`)
  .setFooter(`${message.author.tag}`, message.author.avatarURL)
  return message.channel.send(kayıt).then(msg => msg.delete(5000)).then(() => message.react('719124160189562930'));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['nick'],
  permLevel: 0
};

exports.help = {
  name: 'isim',
};