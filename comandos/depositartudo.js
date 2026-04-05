const fs = require("fs");

module.exports.run = (message) => {
  const dados = JSON.parse(fs.readFileSync("dados.json"));
  const id = message.author.id;

  const user = dados.users[id];

  if (!user || user.carteira <= 0) {
    return message.reply("Nada para depositar.");
  }

  const valor = user.carteira;

  user.banco += valor;
  user.carteira = 0;

  user.extrato.push(`-R$${valor} (depósito total)`);

  message.reply(`🏦 Depositou tudo: R$${valor}`);

  fs.writeFileSync("dados.json", JSON.stringify(dados, null, 2));
};