 const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const filter = m => m.content.includes('discord');
module.exports.run = async (client, message, args) => {
const msg = message;
const reactionFilter = (reaction, user) => {
    return ['✅'].includes(reaction.emoji.name) && user.id === msg.mentions.members.first().id;
}
if (!msg.mentions.users.first()) return message.channel.send(new Discord.RichEmbed().setDescription(`Gitmek İstediğin Kullanıcıyı Etiketlemelisin.`) .setColor("RANDOM")).then(m => m.delete(5000));
if (msg.mentions.users.first().id ==='701523404552929302')  return message.channel.send(new Discord.RichEmbed() .setDescription(` Birdaha Bunu Deneme..`) .setColor("AQUA")).then(m => m.delete(3000));
/// channel
msg.channel.send( new Discord.RichEmbed() .setDescription(`${msg.author} Adlı Kullanıcı Bulunduğunuz Sesli Kanalına Gelmek İstiyor Kabul Ediyor Musunuz?`) .setColor("RANDOM").setAuthor(`${message.guild.name}` ,`${message.guild.iconURL}`) ).then(async (asd) => {
    await asd.react("✅");
    asd.awaitReactions(reactionFilter, {
       max: 1,
       time: 15000,
       errors: ['time']
    }).then(async (c) => {
 if (!msg.guild.member(msg.mentions.users.first()).voiceChannel){
 msg.channel.send(new Discord.RichEmbed() .setDescription(`Kullanıcı İsteği Kabul Etti Fakat Bir Ses Kanalında Değil..`).setColor("BLACK"));
 return; 
 }  
await msg.member.setVoiceChannel(msg.guild.member(msg.mentions.users.first()).voiceChannelID).then(msg => msg.delete());
  })
  .catch(async(e) =>{
  await asd.delete();
    })
})
}
 module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "admin",
  permLevel: 0
};

module.exports.help = {
  name: 'git',
  description: '',
  usage: ''
}