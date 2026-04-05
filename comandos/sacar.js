const fs = require("fs");

module.exports.run = (message, args) => {
  const valor = parseInt(args[0]);

  if (isNaN(valor) || valor <= 0) {
    return message.reply("Digite um valor válido.");
  }

  const dados = JSON.parse(fs.readFileSync("dados.json"));
  const id = message.author.id;

  const user = dados.users[id];

  if (!user || user.banco < valor) {
    return message.reply("Saldo insuficiente.");
  }

  user.banco -= valor;
  user.carteira += valor;

  user.extrato.push(`+R$${valor} (saque)`);

  message.reply(`💸 Sacou R$${valor}`);

  fs.writeFileSync("dados.json", JSON.stringify(dados, null, 2));
};