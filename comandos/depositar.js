const fs = require("fs");

module.exports.run = (message, args) => {
  const valor = parseInt(args[0]);

  if (isNaN(valor) || valor <= 0) {
    return message.reply("Digite um valor válido.");
  }

  const dados = JSON.parse(fs.readFileSync("dados.json"));
  const id = message.author.id;

  const user = dados.users[id];

  if (!user || user.carteira < valor) {
    return message.reply("Dinheiro insuficiente.");
  }

  user.carteira -= valor;
  user.banco += valor;

  user.extrato.push(`-R$${valor} (depósito)`);

  message.reply(`🏦 Depositou R$${valor}`);

  fs.writeFileSync("dados.json", JSON.stringify(dados, null, 2));
};