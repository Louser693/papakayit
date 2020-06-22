const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client,message,args) => {

const asd2 = message.mentions.roles.first() || args.slice(0).join(' ')
if(!asd2) return message.channel.send(new Discord.RichEmbed().setColor('BLACK').setDescription('Lütfen rol etiketleyin'))

db.set(`muteyetkilirol2_${message.guild.id}`, asd2.id)
message.channel.send(new Discord.RichEmbed().setColor('BLACK').setDescription(`Başarıyla mute yetkili rolü **${asd2}** olarak ayarlandı!`))
}

exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 2,
aliases: []
}

exports.help = {
name: 'mute-yetkili-rols' ,
category:'Mod'   
}