const Discord = require('discord.js');

exports.run = async(client, message, args) => {
  if (!/^\d{4}$/.test(args[0])) return message.channel.send("4 haneli bir etiket belirtmelisin! **Örn:** `9999`");
  let members = client.users.filter(m => m.discriminator === args[0]).map(m => m.username);
  let total = members.length;
  members = members.length > 0 ? members.slice().join('\n') : 'Bulunamadı!';
  message.channel.send(`# Belirttiğin  ${args[0]}  etiketine sahip toplam total kişi bulundu! (İsimleri aşağıda) \n\n${members}\n\n# NOT: Sadece botun bulunduğu sunuculardaki kullanıcılar arasından seçer.`, {code: 'md', split: true})
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['etiket'],
  permLevel: 0
};

exports.help = { 
  name: 'discrim', 
  description: 'Botun üyeleri arasından belirtilen etikete sahip olanları listeler.',
  usage: 'discrim',
  kategori: 'kullanıcı'
};