const Discord = require("discord.js")
module.exports.run = async (client, message, args) => {
 if(!message.member.roles.get("721003971312877638")) if(!message.member.roles.get("721000231130628228"))  if(!message.member.roles.get("708631597049577523"))  return;
  const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let tag = "𝕵" 
    let count = 0;
   
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
      const emoji = client.emojis.find(emoji => emoji.name === "kirmiziyildiz")
      const emoji3 = client.emojis.find(emoji => emoji.name === "maviyildiz");
  
  const amerikanembed = new Discord.RichEmbed()
  .setColor("black")
        .setDescription(` ${emoji} Sunucuda **${message.guild.memberCount}** kişi bulunmaktadır.\n\n${emoji3} Taglı üyede **${message.guild.members.filter(m => m.user.username.includes(tag)).size}** kişi bulunmaktadır.\n\n${emoji} Ses kanallarında **${count}** kişi bulunmaktadır.`)
  message.channel.sendEmbed(amerikanembed)
  message.react(emoji)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['info'],
  permLevel: 0
};
exports.help = {
  name: 'say',
  description: 'kullanıcıyı susturur.',
  usage: '.say'
};