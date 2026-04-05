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

  const agora = Date.now();
  const cooldown = 45 * 60 * 1000;

  if (agora - user.ultimoTrabalho < cooldown) {
    const tempo = Math.ceil((cooldown - (agora - user.ultimoTrabalho)) / 60000);
    return message.reply(`⏳ Espere ${tempo} minutos para trabalhar novamente.`);
  }

  const ganho = Math.floor(Math.random() * 100) + 50;

  user.carteira += ganho;
  user.ultimoTrabalho = agora;

  user.extrato.push(`+R$${ganho} (trabalho)`);

  message.reply(`💼 Você trabalhou e ganhou R$${ganho}`);

  fs.writeFileSync("dados.json", JSON.stringify(dados, null, 2));
};