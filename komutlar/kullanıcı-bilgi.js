const Discord = require("discord.js");
const moment = require("moment");
const db = require("quick.db");
const humanizeDuration = require("humanize-duration")

exports.run = async (client, message, args) => {

  let üye;
  if (message.mentions.members.first()) üye = message.mentions.members.first()
  else if (args[0]) üye = message.guild.members.get(args[0])
  else üye = message.member
  
  let kullanıcı = üye.user

    const aylar = {
      
        "01": "Ocak",
        "02": "Şubat",
        "03": "Mart",
        "04": "Nisan",
        "05": "Mayıs",
        "06": "Haziran",
        "07": "Temmuz",
        "08": "Ağustos",
        "09": "Eylül",
        "10": "Ekim",
        "11": "Kasım",
        "12": "Aralık"
    }
    
    let oluşturma = `${humanizeDuration(Date.now() - kullanıcı.createdAt, {largest: 2, round: true}).replace("seconds", "saniye").replace("minute", "dakika").replace("minutes", "dakika").replace("hour", "saat").replace("hours", "saat").replace("day", "gün").replace("week", "hafta").replace("month", "ay").replace("year", "yıl").replace("haftas", "hafta").replace("güns", "gün").replace("ays", "ay").replace("yıls", "yıl").replace("dakikas", "dakika").replace("saats", "saat")} önce [\`${moment(kullanıcı.createdAt).format('DD')} ${aylar[moment(kullanıcı.createdAt).format('MM')]} ${moment(kullanıcı.createdAt).format('YY')} @ ${moment(kullanıcı.createdAt).format('HH:mm')}\`]`
    let katılım = `${humanizeDuration(Date.now() - üye.joinedAt, {largest: 2, round: true}).replace("seconds", "saniye").replace("minute", "dakika").replace("minutes", "dakika").replace("hour", "saat").replace("hours", "saat").replace("day", "gün").replace("week", "hafta").replace("month", "ay").replace("year", "yıl").replace("haftas", "hafta").replace("güns", "gün").replace("ays", "ay").replace("yıls", "yıl").replace("dakikas", "dakika").replace("saats", "saat")} önce [\`${moment(kullanıcı.joinedAt).format('DD')} ${aylar[moment(kullanıcı.joinedAt).format('MM')]} ${moment(kullanıcı.joinedAt).format('YY')} @ ${moment(kullanıcı.joinedAt).format('HH:mm')}\`]`
    let boost = `${humanizeDuration(Date.now() - kullanıcı.premiumSince, {largest: 2, round: true}).replace("seconds", "saniye").replace("minute", "dakika").replace("minutes", "dakika").replace("hour", "saat").replace("hours", "saat").replace("day", "gün").replace("week", "hafta").replace("month", "ay").replace("year", "yıl").replace("haftas", "hafta").replace("güns", "gün").replace("ays", "ay").replace("yıls", "yıl").replace("dakikas", "dakika").replace("saats", "saat")} önce [\`${moment(kullanıcı.premiumSince).format('DD')}/${aylar[moment(kullanıcı.premiumSince).format('MM')]}/${moment(kullanıcı.premiumSince).format('YY')} @ ${moment(kullanıcı.premiumSince).format('HH:mm')}\`]`
    
    let uyarılar = await db.fetch(`${kullanıcı.id}.uyarılar`)

    const durum = (kullanıcı.presence.status == "online" ? "Çevrimiçi <:online:645902723983736842>":  (kullanıcı.presence.status == "offline" ? "Çevrimdışı <:offline:645902723761307649>": (kullanıcı.presence.status == "idle" ? "Boşta <:idle:645902723933274142>": (kullanıcı.presence.status == "dnd" ? "Rahatsız etmeyin <:dnd:645902723988062229>": ("Görünmez <:offline:645902723761307649>")))))
    
    let oynuyor;
    if (kullanıcı.presence.game) oynuyor = "\nOynuyor: " + kullanıcı.presence.game.name
    if (kullanıcı.presence.game && kullanıcı.presence.game.name === "Custom Status") oynuyor = "\nCustom Status: " + kullanıcı.presence.game.state
    if (kullanıcı.presence.game && kullanıcı.presence.game.name === "Spotify") oynuyor = "\nSpotify üzerinden dinliyor: " + kullanıcı.presence.game.details + " - " + kullanıcı.presence.game.state
    if (kullanıcı.presence.game && kullanıcı.presence.game.name === "Twitch") oynuyor = "\nTwitch üzerinden izliyor: " + kullanıcı.presence.game.details + " - " + kullanıcı.presence.game.state
    if (kullanıcı.presence.game && kullanıcı.presence.game.name === "YouTube") oynuyor = "\nYouTube üzerinden izliyor: " + kullanıcı.presence.game.details + " - " + kullanıcı.presence.game.state
  
    let nick;
    if (kullanıcı.username !== üye.displayName) nick = üye.displayName
    
    let sunucuda;
    if (message.guild.members.has(kullanıcı === true)) sunucuda = "evet"
  
    let rozetler;
    { 
    }
    const kullanıcıBilgi = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(kullanıcı.avatarURL)
        .setURL(kullanıcı.displayAvatarURL)
        .setDescription(`**Kullanıcı Hakkında**\nID: \`${kullanıcı.id}\` \nProfil: ${kullanıcı} \nDurum: ${durum} \nOluşturma tarihi: ${oluşturma} ${kullanıcı.presence.game ? oynuyor: ""} ${rozetler ? rozetler: ""}` + `${sunucuda = "evet" ? `\n\n**Üyelik Bilgileri** ${nick ? "\nSunucudaki takma adı: " + nick: ""} \nKatılım tarihi: ${katılım} \nRolleri (${üye.roles.filter(r => r.name !== "@everyone").size}): ${üye.roles.filter(r => r.name !== "@everyone").map(r => r).join(' ') ? üye.roles.filter(r => r.name !== "@everyone").map(r => r).join(' ') : `Bulunmuyor`} ${kullanıcı.premium ? "\n\n**Booster** \n" + boost + "tarihinden beri yükseltiyor": ""}`: ""}`)
    message.channel.send(kullanıcıBilgi);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kullanıcıbilgi", "profil", "kullanıcı-bilgi"],
    permLevel: 0,
    category: "bilgi"
};

exports.help = {
    name: "kullanıcı-bilgi",
    description: "Kullanıcı hakkında bilgi almanızı sağlar",
    usage: "kullanıcı-bilgi <@kullanıcı>"
};