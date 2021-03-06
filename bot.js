const http = require("http");
const express = require("express");
const app = express();
const request = require("request");
const moment = require("moment");
const db = require("quick.db");
const Jimp = require("jimp");
const path = require('path');

app.get("/", (request, response) => {
  response.sendStatus(200)
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me`);
}, 10000);

const Discord = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");

const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");

require("./util/eventLoader")(client);

const log = message => {
  console.log(`${message}`);
};
var prefix = ayarlar.prefix;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});
client.login(ayarlar.token);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("guildMemberAdd", async(member) => {
  let otorol = await db.fetch(`otorol_${member.guild.id}`)
  let otorolkanal = await db.fetch(`otorolkanal_${member.guild.id}`)
  if(!otorol) return
  await(member.addRole(member.guild.roles.get(otorol).id))
  if(otorolkanal && client.channels.has(otorolkanal)) {
    await client.channels.get(otorolkanal).send(`<a:giris:658315640368660510>  \`${member.user.tag}\`  Sunucuya Katıldı!  \`${member.guild.roles.get(otorol).name}\`  rolü başarıyla verildi. <a:tik:658039918005714981> Sunucu şu anda  \`${member.guild.members.size}\`  kişi!`)
  }
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("guildMemberAdd", async(member) => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  if(sayac) {
    let kanalid = await db.fetch(`sayacK_${member.guild.id}`);
    const skanal = member.guild.channels.get(kanalid)
    if(skanal) {
      skanal.send(`<a:giris:658315640368660510> \`${member.user.tag}\`  aramıza katıldı! Sunucu şuanda **${member.guild.memberCount}** kişi! **${sayac}** kişi olmamıza son **${sayac - member.guild.memberCount}** kişi kaldı.`)
      if(member.guild.memberCount >= sayac) {
        db.delete(`sayac_${member.guild.id}`);
        db.delete(`sayacK_${member.guild.id}`);
        skanal.send(`Tebrikler! Sunucudaki kişi sayısı, belirlenen sayaç sayısına (${member.guild.memberCount}) ulaştı. Tekrar ayarlamak isterseniz; \`${prefix}sayaç\``)
      }
    }
  }
})

client.on("guildMemberRemove", async(member) => {
    let sayac = await db.fetch(`sayac_${member.guild.id}`);
    if(sayac) {
      let kanalid = await db.fetch(`sayacK_${member.guild.id}`);
      const skanal = member.guild.channels.get(kanalid)
      if(skanal) {
        skanal.send(`<a:cikis:658315642360954893>  \`${member.user.tag}\`  aramızdan ayrıldı! Sunucu şuanda **(${member.guild.memberCount})** kişi! **${sayac}** kişi olmamıza son **${sayac - member.guild.memberCount}** kişi kaldı.`)
      }
    }
  })  

//////////////////////////////////////////


////////////////////////////////////////////////////////
client.on("message", msg => {
  db.fetch(`reklam_${msg.channel.id}`).then(i => {
    if (i == "acik") {
      const reklam = [
        "oç",
        "amk",
        "ananı sikiyim",
        "ananıskm",
        "piç",
        "amk",
        "amsk",
        "sikim",
        "sikiyim",
        "orospu çocuğu",
        "piç kurusu",
        "kahpe",
        "orospu",
        "mal",
        "sik",
        "yarrak",
        "am",
        "amcık",
        "amık",
        "yarram",
        "sikimi ye",
        "mk",
        "mq",
        "aq",
        "ak",
        "amq",
        "sunucu",
        "discord",
        "dc",
        ".com",
        ".net",
        ".xyz",
        ".tk",
        ".pw",
        ".io",
        ".me",
        ".gg",
        "www.",
        "https",
        "http",
        ".gl",
        ".org",
        ".com.tr",
        ".biz",
        "net",
        ".rf.gd",
        ".az",
        ".party"
      ];
      if (reklam.some(word => msg.content.includes(word))) {
        try {
          if (!msg.member.hasPermission("ADMINISTRATOR")) {
            msg.delete();

            return msg => msg.delete(3000);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else if (i == "kapali") {
    }
    if (!i) return;
  });
});

const humanizeDuration = require("humanize-duration")

////////////////////////////////////////////////////////////////////


client.on("guildMemberAdd", async(member) => {

 
  try {
    let embed= new Discord.RichEmbed()
    await(member.addRole("721001158134595674"))
    await member.setNickname(`✧ İsim Yaş`);
    await client.channels.get("708479407622455296").send(` <a:maviyildiz:715991810794717294> Welcome <a:maviyildiz:715991810794717294> \n <a:kirmiziyildiz:715991772819357717> Sunucumuza Hoşgeldin **${member}**, Seninle **${member.guild.memberCount}** Kişiyiz!\n <a:kirmiziyildiz:715991772819357717> Kaydının yapılması için sesli odaya gelip ses vermen gerekli.\n <a:kirmiziyildiz:715991772819357717> **Bu Kullanıcı: **${new Date().getTime() - member.user.createdAt.getTime() < 45*24*60*60*1000 ? "Tehlikeli Görünüyor!" : "Güvenli Görünüyor! <:__:720685327232008217> "} \n <a:kirmiziyildiz:715991772819357717> <@&721017288051916830> rolündeki yetkililer seninle ilgilenecektir.`, new Discord.Attachment("https://media.giphy.com/media/L0TyAVeqAGKlVf1m06/giphy.gif"))
    if(!member.roles.has("721001158134595674")) {
      member.addRole("721001158134595674")

    }

  } catch(err) { console.log(err) }

})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("message", message => {
  if (message.content.startsWith("!say")) {
    message.channel.send(
      `Sunucumuzun Mevcut Sayisi : **${message.guild.memberCount}**`
    );
  }
});

client.on("message", msg => {
  if (msg.content === "!tag") {
    msg.channel.send("`𝕵`");
  }
});
client.on("message", msg => {
  if (msg.content === ".banasevgilibul") {
    msg.channel.send("Buldum Geldimi ?");
  }
});

client.on("message", msg => {
  if (msg.content === "sa") {
    msg.channel.send("As");
  }
});
client.on("message", msg => {
  if (msg.content === "Sa") {
    msg.channel.send("As");
  }
});


client.on("message", message => {
  if (message.content.startsWith("!link")) {
    message.channel.send(`https://discord.gg/AC9kHCb`);
  }
});




client.on("guildBanAdd", async(guild, user) => {
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
  let aresbanlimit = await db.fetch(`banlimit_${guild.id}`)
  let areskullanıcıban = await db.fetch(`banlimitkullanici_${guild.id}_${entry.executor.id}`)
  
    if(aresbanlimit) {
      if(entry.executor.id !== guild.owner.user.id) {
        if(entry.executor.bot) return
        await db.add(`banlimitkullanici_${guild.id}_${entry.executor.id}`, 1)
        client.channels.get("689782494153015340").send(`\`${user.id}\` - \`${user.tag}\` kişisi ${entry.executor} tarafından **${entry.reason ? entry.reason : "girilmedi"}** nedeni ile yasaklandı! \n${entry.executor} Banları: ${areskullanıcıban}`)
        if(areskullanıcıban >= aresbanlimit) {
          client.channels.get("689782494153015340").send(`${entry.executor} kişisi ban limiti doldurdu ve rolü alındı!`)
          try {
            guild.member(entry.executor).roles.filter(a => a.hasPermission('BAN_MEMBERS')).forEach(x => guild.member(entry.executor).removeRole(x.id))
            guild.owner.user.send(`Sunucundan bir yetkili ban limitine ulaştı ve ban yetkisi olan rolleri alındı! İşte bilgileri => \n\n\`Kullanıcı:\`  ${entry.executor} | ${entry.executor.id} \n\`Discord'a ve Sunucuya Katılım Tarihi:\` \n• **Discord:** ${moment(entry.executor.createdAt).format('DD/MM/YYYY | HH:mm:ss')} • **Sunucu:** ${moment(guild.member(entry.executor).joinedAt).format('DD/MM/YYYY | HH:mm:ss')}`)
          } catch(err) { }
          db.delete(`banlimitkullanici_${guild.id}_${entry.executor.id}`)
        }
      }
    }
})

////////////////// TAG ALIP ÇIKARANA DM ///////////////////





client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    let tag = "𝕵"; //tagınız
    let sunucu = "708314774298951710"; //sunucu ID
    let kanal = "718133527224385547"; //log kanal id
    let rol = "721003621738872852"; // rol ID
    if (
      
      newUser.username.includes(tag) &&
      !client.guilds
        .get(sunucu)
        .members.get(newUser.id)
        .roles.has(rol)
    ) {
      client.channels
        .get(kanal)
        .send(
          `**${newUser}(<${newUser.id}) "__${tag}__" tagını aldığı için Ekibimize Katıldı!**\n **:tada: Aramıza Katıldı!**`
        );
      client.guilds
        .get(sunucu)
        .members.get(newUser.id)
        .addRole(rol);
      
    }
    if (
      !newUser.username.includes(tag) &&
      client.guilds
        .get(sunucu)
        .members.get(newUser.id)
        .roles.has(rol)
    ) {
      client.guilds
        .get(sunucu)
        .members.get(newUser.id)
        .removeRole(rol);
      client.channels
        .get(kanal)
        .send(
          `**${newUser}(<${newUser.id}) "__${tag}__" tagını çıkardığı için Ekibimizden Ayrıldı!** \n ** ${newUser} Üzdün Dostum**`
        );
    }
  }
});

///////////////////////////////////////////////////////////////
