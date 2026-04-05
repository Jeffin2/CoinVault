const fs = require("fs");

module.exports.run = (message) => {
  const dados = JSON.parse(fs.readFileSync("dados.json"));
  const id = message.author.id;

  const user = dados.users[id];

  if (!user || user.banco <= 0) {
    return message.reply("Nada para sacar.");
  }

  const valor = user.banco;

  user.carteira += valor;
  user.banco = 0;

  user.extrato.push(`+R$${valor} (saque total)`);

  message.reply(`💸 Sacou tudo: R$${valor}`);

  fs.writeFileSync("dados.json", JSON.stringify(dados, null, 2));
};