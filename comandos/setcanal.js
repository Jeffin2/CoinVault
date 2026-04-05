const fs = require("fs");

module.exports = {
  name: "setcanal",

  run: (message) => {

    // ❌ não permite usar em DM
    if (!message.guild) {
      return message.reply("Esse comando só funciona em servidores.");
    }

    // 🔒 só administrador pode usar
    if (!message.member.permissions.has("Administrator")) {
      return message.reply("❌ Você precisa ser administrador para usar isso.");
    }

    // 📂 lê banco de dados
    const dados = JSON.parse(fs.readFileSync("dados.json"));

    // 🛠️ cria estrutura se não existir
    if (!dados.canaisBanco) {
      dados.canaisBanco = {};
    }

    // 💰 salva canal do banco
    dados.canaisBanco[message.guild.id] = message.channel.id;

    // 💾 salva no arquivo
    fs.writeFileSync("dados.json", JSON.stringify(dados, null, 2));

    // ✅ confirmação
    message.reply("🏦 Este canal foi definido como o canal do banco!");
  }
};