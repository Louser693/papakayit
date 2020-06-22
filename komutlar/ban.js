const Discord = require('discord.js');
const db = require('quick.db');
const client = new Discord.Client();

exports.run = (client, message, args, bot) => {
 if(!message.member.roles.get("716059089007935509"))  if(!message.member.roles.get("716059089007935509")) return message.channel.send("Bu Komutu Kullanbilmek İçin <@&716059089007935509> Yetkisine Sahip Olmanız Gerekir. :x:").then(msg => msg.delete(9000))
  let guild = message.guild
  let reason = args.slice(1).join(' ');
     let user = message.guild.member(message.mentions.users.first());  
      const member = message.guild.member(user);
  if (reason.length < 1) return message.reply('**.ban @Kullanıcı <Sebep>**');
  if (message.mentions.users.size < 1) return message.reply('Kimi banlayacağını yazmalısın.').catch(console.error);
  if (!message.guild.member(user).bannable) return message.reply('Yetkilileri banlayamam.');
if (!reason) reason = "Sebep Belirtilmedi."
  if(user.roles.find('id', '642838932140064798')) return message.reply("**Bu Kişi Banlanmaz.**").then(msg => {
    msg.delete(9000), message.delete(9000)
    });  

if(user.roles.find('id', '716055840540328077')) return message.reply("**Bu Kişi Banlanmaz.**").then(msg => {
    msg.delete(9000), message.delete(9000)
    });  

if(user.roles.find('id', '716059089007935509')) return message.reply("**Bu Kişi Banlanmaz.**").then(msg => {
    msg.delete(9000), message.delete(9000)
    });  

 

  message.guild.ban(user, 2);
 if(message.author.bot || message.channel.type === "dm") return;
  const embed = new Discord.RichEmbed() 
  message.channel.send(`${user} adlı kullanıcı **${reason}** Sebebiyle Yasaklandı. `, new Discord.Attachment("https://cdn.discordapp.com/attachments/718561851499216906/718567482608320543/giphy-1.gif"))
  member.send(`**${message.author}** Adlı Kullanıcı Tarafından **${message.guild.name}** Sunucusundan **"${reason}"** Sebebiyle Yasaklandınız.`, new Discord.Attachment("https://cdn.discordapp.com/attachments/718561851499216906/718567482608320543/giphy-1.gif"))


const sChannel = message.guild.channels.find(c=> c.id ==="708642195703595079")
  let modlog = new Discord.RichEmbed()
    .setColor(0x000000)   
    .setTitle('YASAKLAMA İŞLEMİ') 
    .setTimestamp()
    .setDescription(`\`<@${user.id}>\` Kullanıcısı <@${message.author.id}> Tarafından **${reason}** Gerekçesiyle Sunucudan Yasaklandı.`)
    .setFooter('PAPA', message.author.avatarURL)
   sChannel.send(modlog)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ban'],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'ban [kullanıcı] [sebep]'
};
