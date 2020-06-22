const Discord = require('discord.js');
const db = require('quick.db');
const djstürkiye = require('../ayarlar.json');

exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bu komutu kullanabilmek için `Yönetici` iznine sahip olmalısın!')
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || djstürkiye.prefix;
  let özellik = await db.fetch(`kayitisimtemizleyici_${message.guild.id}`);
  let yashinu = args[0];
  if(!yashinu || yashinu !== "aç" && yashinu !== "kapat" && yashinu !== "ac") return message.reply(`İsim temizleme özelliğinin açık mı kapalı mı olacağını belirtmelisin! \n\`Örn:\` ${prefix}kayıt-isim-temizleyici aç/kapat`)

  if(yashinu === "aç" || yashinu === "ac") {
    if(özellik) return message.reply('İsim temizleyici zaten aktif! Kayıt olan kullanıcılar isimlerinde alfabe dışı karakter kullanamazlar.')
    await db.set(`kayitisimtemizleyici_${message.guild.id}`, "acik")
    message.reply(`Kayıt isim temizleyici başarıyla aktif edildi! Kayıt olan kullanıcılar isimlerinde alfabe dışı karakter kullanamayacaklar.`)
    return
  }

  if(yashinu === "kapat") {
    if(!özellik) return message.reply('İsim temizleyici zaten kapalı! Kayıt olan kullanıcılar isimlerinde alfabe dışı karakter kullanabilirler.')
    await db.delete(`kayitisimtemizleyici_${message.guild.id}`)
    message.reply(`Kayıt isim temizleyici başarıyla devre dışı bırakıldı! Kayıt olan kullanıcılar isimlerinde alfabe dışı karakter kullanabilirler.`)
    return
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['isim-temizleyici'],
  permLevel: 0
};

exports.help = {
  name: 'isim-temizleyici',
  description: 'Kayıt isim temizleyici - Kayıt sistemi // Yashinu',
  usage: 'isim-temizleyici aç/kapat',
  kategori: 'yetkili'
};