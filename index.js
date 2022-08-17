let Discord = require("discord.js");
let client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

client.on("interactionCreate", async interaction => {
if(!interaction.isButton()) return;
if(interaction.customId == "help") await interaction.reply({content: `This bot is a verification bot for Strawberry Shortcake. It does not involve any malicious stuff in any way, you can also see the source code here: https://github.com/AnimeCoder303/struberry`, ephemeral: true});
if(interaction.customId == "verify") {
let fetch = require("node-fetch");
await interaction.deferReply({ephemeral: true});
let {QRCode, QRListener} = require("@discordjs/verification");

await interaction.editReply({content: "Look at your DMs!"});
await interaction.user.send({embeds: [new Discord.MessageEmbed().setDescription("**Preparing verification..**").setColor("YELLOW")]})
  let c = new QRCode().setVerificationUser(interaction.user).setPeriod(120000);
  await interaction.user.send({embeds: [new Discord.MessageEmbed().setDescription(`**Hello! Are you human? Let's find out!**
\`Please scan the QR Code below using the discord mobile app to verify!\``).addField("Additional notes:", `Do not share this QR Code with anybody!
This code grants access to this server once.
You will be notified when you have been verified.`).setImage("attachment://qr.png").setFooter("Verification period: 2 minutes")], files: [new Discord.MessageAttachment(c.toAttachment(), "qr.png")]})
  new QRListener().on("scan", async scanner => {
    if(scanner.id == interaction.user.id) {
      if(scanner.process.isSucessful()) {await interaction.user.send({embeds: [new Discord.MessageEmbed().setTitle("You have been verified!").setDescription(`You passed the verification successfully. You can now access ${interaction.guild.name}!`).setColor("GREEN")]});interaction.member.roles.add("1009113643725631539")}
      else {
          const embed = new Discord.MessageEmbed()
        .setColor("#ff2222")
        .setTitle(`You have failed verification!`)
        .setDescription(`You have unfortunately failed to pass the verification in \`${interaction.guild.name}\`.
       **Reason:** \`Failed to verify! [${scanner.faliure.getFaliureReason()}]\`
        You can go back to #${interaction.channel.name} to start a new verification process by clicking on the Verify button again.`)
        
      }
    }
  })
}
})

client.login(process.env.token)
