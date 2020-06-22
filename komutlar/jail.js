const Discord = require('discord.js');

exports.run = async(client, message, args, ops, member, guild, user, logs) => {
  
 
 
    if (!message.member.roles.get("716059089007935509"))
if (!message.member.roles.get("716059089007935509"))
    if (!message.member.roles.get("716055840540328077"))

  return message.channel.send('Bu komutu kullanabilmek için: <@&716523409974100008> adlı role sahip olmalısın.');
    
    let vUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if(!vUser) return message.channel.send("**.jail @Kullanıcı <Sebep>**").then(msg => {

    msg.delete(5000), message.delete(5000)

  });
 
 let reason = args.slice(1).join(' ');
if(!reason) reason = "**Sebep Belirtilmedi.**"

  


    vUser.addRole('716065524546666587')
    vUser.removeRole('708631597049577523')
    vUser.removeRole('708631597049577523')
    vUser.removeRole('708631673662865448')

       vUser.removeRole('708623068595093535')
       vUser.removeRole('716523438486978560')

    vUser.removeRole('716523437107052574')

     const sChannel = message.guild.channels.find(c => c.id === "718133527224385547");
    let modlog = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`**${vUser}** adlı Kullanıcı **${reason}** sebebiyle hapishaneye atıldı `)
.setImage(`https://media.discordapp.net/attachments/690259920028958899/690265009065951259/ragnargif.gif`)
      .setFooter(`Komutu Kullanan Yetkili : ${message.author.tag}`);
    sChannel.send(modlog);
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["idam", "jail", "hapishane", "cezalı", "jailat", "hapisat"],
};

exports.help = {
  name: 'jail',
  description: 'Kullanıcı İçin Doğrulandı Rolünü Verir.',
  usage: 'erkek'
};