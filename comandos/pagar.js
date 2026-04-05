const fs = require("fs");

module.exports = {
  name: "pagar",

  run: (message, args) => {

    const valor = parseInt(args[0]);

    if (!valor || valor <= 0) {
      return message.reply("❌ Digite um valor válido.");
    }

    const dados = JSON.parse(fs.readFileSync("dados.json"));

    if (!dados.users[message.author.id]) {
      return message.reply("❌ Você não tem dados no banco.");
    }

    const user = dados.users[message.author.id];

    // 🧾 verifica se tem dívida
    if (!user.divida || user.divida <= 0) {
      return message.reply("✅ Você não tem nenhuma dívida.");
    }

    // 💸 verifica dinheiro
    if (user.carteira < valor) {
      return message.reply("❌ Você não tem dinheiro suficiente.");
    }

    // 🧠 não pode pagar mais que deve
    const valorFinal = Math.min(valor, user.divida);

    user.carteira -= valorFinal;
    user.divida -= valorFinal;

    fs.writeFileSync("dados.json", JSON.stringify(dados, null, 2));

    message.reply(`💸 Você pagou ${valorFinal} da sua dívida!`);
  }
};