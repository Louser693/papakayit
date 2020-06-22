const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın!`);
  
  if(!args[0]) return message.reply(`:x: Rol verilecek kullanıcıların, adında bulunması gereken tagı giriniz! => \`${ayarlar.prefix}tag-yetki [tag] @rol/rol id\``)
  let role = message.mentions.roles.first() || message.guild.roles.get(args[1])
  if(!role) return message.reply(`:x: Kullanıcı adında tag bulunan kullanıcılara verilecek rolü belirtiniz! => \`${ayarlar.prefix}tag-yetki [tag] @rol/rol id\``)
  
  try {
    let rolveriliyor = await message.channel.send(`Kullanıcı adında tag olup, belirtilen role sahip olmayan kişi sayısı: ${message.guild.members.filter(x => (x.user.username).includes(args[0]) && !x.roles.has(role.id)).size} \nRolleri veriliyor...`);
    await message.guild.members.filter(x => (x.user.username).includes(args[0]) && !x.roles.has(role.id)).forEach(a => a.addRole(role.id));
    await rolveriliyor.edit(`Belirtilen taga sahip kullanıcılara **(${message.guild.members.filter(x => (x.user.username).includes(args[0]) && !x.roles.has(role.id)).size} kişiye)**  \`${message.guild.roles.get(role.id).name}\`  rolünü başarıyla verdim!`);
  } catch(err) { 
      message.reply("İşlem başarısız. Yetkilerimi kontrol ediniz.")
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tag-yetki',
  description: 'Belirtilen taga sahip kullanıcılara belirtilen rolü verir.',
  usage: 'tag-yetki [tag] [rol]'
};