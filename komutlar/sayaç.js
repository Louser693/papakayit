const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
 
exports.run = async (client, message, args) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply('Bu komutu kullanabilmek için `Sunucuyu Yönet` iznine sahip olmalısın')
  const sayacsayi = await db.fetch(`sayac_${message.guild.id}`);
  const sayackanall = await db.fetch(`sayacK_${message.guild.id}`);
  const sayackanal = message.mentions.channels.first()

  if(args[0] === "sıfırla" || args[0] === "kapat" || args[0] === "durdur") {
    if(!sayacsayi) return message.channel.send(`:x: Ayarlanmayan şeyi sıfırlayamazsın.`)
    db.delete(`sayac_${message.guild.id}`)
    db.delete(`sayacK_${message.guild.id}`)
    message.channel.send(`Sayaç başarıyla sıfırlandı! :white_check_mark:`)
    return
  }
   
  if(sayackanall) {
      if (!client.channels.get(sayackanall)) {
        db.delete(`sayac_${message.guild.id}`);
        db.delete(`sayacK_${message.guild.id}`);
        return
      }
     message.channel.send(`:x: Sayaç kanalı zaten ayarlı! \nDevredışı bırakmak için: \`${prefix}sayaç sıfırla\` yazmalısın.`)
    return
  }  
  if(!args[0] || !sayackanal || isNaN(args[0]) || args[0] <= message.guild.memberCount) return message.channel.send(`:x: Gerekli yerleri düzgün doldurmalısın! =>  \`${prefix}sayaç <sayı> #kanal\``)
  db.set(`sayac_${message.guild.id}`, args[0])
  db.set(`sayacK_${message.guild.id}`, sayackanal.id)
  message.channel.send(`Sayaç ayarlandı. ✅`)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sayac', 'sayaç-ayarla', 'sayac-ayarla'],
  permLevel: 0
};
 
exports.help = {
  name: 'sayaç',
  description: 'Sunucuya girip çıkanları sayaç halinde belirtilen kanala gönderir.',
  usage: 'sayaç <sayı> <#kanal>/sıfırla',
  kategori: 'yetkili'
};