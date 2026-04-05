const fs = require("fs");

module.exports.run = (message, args) => {
  const valor = parseInt(args[0]);

  if (isNaN(valor) || valor <= 0) {
    return message.reply("Digite um valor válido.");
  }

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

  user.carteira += valor;
  user.emprestimo += valor;

  user.extrato.push(`+R$${valor} (empréstimo)`);

  message.reply(`💳 Você pegou um empréstimo de R$${valor}`);

  fs.writeFileSync("dados.json", JSON.stringify(dados, null, 2));
};