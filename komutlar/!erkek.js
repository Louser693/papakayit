 const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db");

var prefix = ayarlar.prefix;

exports.run = async (bot, message, args) => {
  if(message.author.bot || message.channel.type === "dm") return;
  let guild = bot.guilds.get(`${ayarlar.sunucuid}`)
  let kadınRol = message.guild.roles.get('721000231130628228'); // kadın
  let kadınRol1 = message.guild.roles.get('721000231130628228'); // yedek kadın
  let sRol = message.guild.roles.get('721000231130628228'); // erkek
  let sRol1 = message.guild.roles.get('721000231130628228'); // yedek erkek
  let kRol = message.guild.roles.get('721001158134595674'); // Kayıtsız rolü
  if (!message.guild.member(message.author.id).hasPermission(8) && !message.member.roles.has(`721017288051916830`) && !message.member.roles.has(`716059089007935509`) && message.author.id !== `${ayarlar.sahip}`)  return message.channel.send(`  Üzgünüm, yetkin yok.`)   
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.channel.send(new Discord.RichEmbed().setDescription(`Kullanıcı bulunamadı.`).setTimestamp().setFooter(`Yetkili: ${message.author.tag}`, message.author.avatarURL).setColor('black'));
  if(rMember.roles.has(sRol.id && sRol1.id)) {
    setTimeout(() => {
	    rMember.removeRole(sRol.id)
        rMember.removeRole(sRol1.id)
        rMember.removeRole(kRol.id)
  	    message.react(`719124160189562930`)
   	    bot.channels.get("708479407622455296").send(new Discord.RichEmbed().setDescription(`${rMember} üyesinden ${sRol} rolü alındı. ${ayarlar.basarili}`).setTimestamp().setFooter(`Yetkili: ${message.author.tag}`, message.author.avatarURL).setColor('black'));
    }, 1000) 
  }
  await
  setTimeout(() => {
    (rMember.removeRole(kRol.id));
    (rMember.removeRole(kadınRol.id));
    (rMember.removeRole(kadınRol1.id));
    (rMember.addRole(sRol.id));
    (rMember.addRole(sRol1.id));
  }, 1000) 
  try{
    message.react(`719124160189562930`)
    await bot.channels.get("718133527224385547").send(new Discord.RichEmbed().setDescription(`<a:kirmiziyildiz:715991772819357717> ${rMember} aramıza **${sRol}** olarak katıldı.\n<a:alev:719123194874953768> Ailemiz büyümeye devam ederek **${guild.memberCount}** kişiye sahip oldu.`).setTimestamp().setColor('black')).then(m => m.delete(10000));
	bot.channels.get("708479407622455296").send(new Discord.RichEmbed().setDescription(`${rMember} üyesine ${sRol} rolü verildi. ${ayarlar.basarili}`).setTimestamp().setFooter(`Yetkili: ${message.author.tag}`, message.author.avatarURL).setColor('black'));
  }catch(e){
	console.log(`Kız kayıt hata.`)
	}
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['erkek','bay','e'],
  permLevel: "0"
};

exports.help = {
  name: "erkek",
  description: "erkek rolü verir.",
  usage: "erkek <mesaj>"
}; 