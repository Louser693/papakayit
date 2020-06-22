const ayarlar = require('../ayarlar.json');
const Discord = require('discord.js');

var prefix = ayarlar.prefix;

exports.run = (client, message, args) => {
    const mesaj = args.slice(0).join(' ');
   if (message.author.id !== "659453648044163103") return message.channel.send
    if(mesaj.length < 1) return message.reply("prefix+duyur : mesaj  ")
      try {
        message.guild.members.forEach(m=> {
         
        m.send(mesaj)
        console.log(`${m.user.tag} Kişiye Yollandı.`)
         
          }) 
        message.channel.send("Mesaj Başarıyla Gönderildi.")
          }
        catch(e) {
        return console.log(``)
       
      } 
    
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'dm',
  description: 'dm mesajı atar.',
  usage: 'duyur'
};