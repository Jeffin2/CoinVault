const fs = require("fs");

module.exports.run = (message) => {
  const dados = JSON.parse(fs.readFileSync("dados.json"));
  const id = message.author.id;

  if (!dados.users[id]) {
    dados.users[id] = {
      carteira: 0,
      banco: 0,
      emprestimo: 0,
      ultimoTrabalho: 0,
      extrato: []
    };
  }

  const user = dados.users[id];

  message.reply(
    `💰 Carteira: R$${user.carteira}\n🏦 Banco: R$${user.banco}\n📉 Dívida: R$${user.emprestimo}`
  );

  fs.writeFileSync("dados.json", JSON.stringify(dados, null, 2));
};