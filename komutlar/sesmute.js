const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const ms = require("ms");


exports.run = async(client, message, args) => {
  let üye = message.mentions.users.first();
  let süre = args.slice(1).join(' ')
  .replace('gün'.toLowerCase(), 'd')
  .replace('saat'.toLowerCase(), 'h')
  .replace('dakika'.toLowerCase(), 'm')
  .replace('saniye'.toLowerCase(), 's');
  
  if(args[0] === "toplu" || args[0] === "tüm") {
    if (!message.member.roles.get("716059089007935509"))
    if (!message.member.roles.get("708758809711214642"))

    if (!message.member.roles.get("716054523273281537"))

  return message.channel.send('Bu komutu kullanabilmek için: <@&716054523273281537> adlı role sahip olmalısın.');
    if(!message.member.voiceChannel) return message.reply('Bir ses kanalında değilsin!')
    if(süre) {
      message.member.voiceChannel.members.forEach(x => x.setMute(true));
      message.reply('Belirtilen süre kadar kanalındaki üyeler susturuldu!')
      setTimeout(function(){
        message.member.voiceChannel.members.forEach(x => x.setMute(false));
        message.channel.send(`${message.member.displayName} adlı kişi tarafından atılan toplu susturma, süresi dolduğu için kaldırıldı!`);
      }, ms(süre));
    } else {
      message.member.voiceChannel.members.forEach(x => x.setMute(true));
      message.reply('Kanalındaki üyeler başarıyla susturuldu!')
    }
    return
  }
  
  if(args[0] === "toplukaldır" || args[0] === "tümkaldır") {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Bu özelliği kullanabilmek için `Yönetici` iznine sahip olmalısın!");
    if(!message.member.voiceChannel) return message.reply('Bir ses kanalında değilsin!')
    message.member.voiceChannel.members.forEach(x => x.setMute(false));
    message.reply('Bulunduğun kanaldaki tüm kullanıcıların susturulmalarını kaldırdım!')
    return
  }
  
  if(!üye) return message.reply('**Ses kanalında susturulacak bir kullanıcı belirtmelisin!**')
  if(!message.guild.member(üye).voiceChannel) return message.reply('**Belirtilen kullanıcı bir ses kanalında değil!**')
  if(message.guild.member(üye).voiceChannel && !message.guild.member(üye).voiceChannel.permissionsFor(message.author).has('MUTE_MEMBERS')) return message.reply(`**Belirttiğin kullanıcının ses kanalında susturma yetkisine sahip değilsin!**`)
  
  if(süre) {
    message.guild.member(üye).setMute(true);
      setTimeout(function(){
        message.guild.member(üye).setMute(false);
        message.channel.send(`\`${message.guild.member(üye).displayName}\`  adlı kişinin ses mute süresi dolduğu için ses mutesi kaldırıldı!`);
      }, ms(süre));
  } else {
    message.guild.member(üye).mute ? message.guild.member(üye).setMute(false) : message.guild.member(üye).setMute(true)
    message.reply('Belirtilen kullanıcıya başarıyla işlem uyguladım!')
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ses-mute", "sesmute", "seslimute"],
  permLevel: 0
};

exports.help = {
  name: "sesmute",
  description: "Belirtilen ses kanalını/ses kanalındaki kullanıcıyı susturur.",
  usage: "sesmute @kullanıcı/tüm <süre>",
  kategori: "yetkili"
};