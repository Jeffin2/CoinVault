const fs = require("fs");

module.exports = {
  name: "roubar",

  run: (message) => {

    const alvo = message.mentions.users.first();

    if (!alvo) {
      return message.reply("❌ Marque alguém para roubar.");
    }

    if (alvo.id === message.author.id) {
      return message.reply("❌ Você não pode roubar a si mesmo.");
    }

    const dados = JSON.parse(fs.readFileSync("dados.json"));

    // cria usuários se não existirem
    if (!dados.users[message.author.id]) {
      dados.users[message.author.id] = { carteira: 0, banco: 0, divida: 0 };
    }

    if (!dados.users[alvo.id]) {
      dados.users[alvo.id] = { carteira: 0, banco: 0, divida: 0 };
    }

    const ladrao = dados.users[message.author.id];
    const vitima = dados.users[alvo.id];

    if (vitima.carteira <= 0) {
      return message.reply("❌ Essa pessoa não tem dinheiro na carteira.");
    }

    // 🎲 chance de 25%
    const chance = Math.random();

    if (chance < 0.25) {
      // ✅ sucesso

      const valorRoubado = Math.floor(Math.random() * vitima.carteira) + 1;

      vitima.carteira -= valorRoubado;
      ladrao.carteira += valorRoubado;

      fs.writeFileSync("dados.json", JSON.stringify(dados, null, 2));

      message.reply(`🤑 Você roubou ${valorRoubado} de ${alvo.username}!`);
    } else {
      // ❌ falha

      const multa = 100;

      if (ladrao.carteira < multa) {
        ladrao.carteira = 0;
      } else {
        ladrao.carteira -= multa;
      }

      fs.writeFileSync("dados.json", JSON.stringify(dados, null, 2));

      message.reply(`🚔 Você foi pego! Pagou uma multa de ${multa}.`);
    }
  }
};