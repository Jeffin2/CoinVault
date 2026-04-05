const fs = require("fs");

module.exports.run = (message) => {
  const dados = JSON.parse(fs.readFileSync("dados.json"));
  const id = message.author.id;

  const user = dados.users[id];

  if (!user || user.extrato.length === 0) {
    return message.reply("Sem histórico.");
  }

  const ultimos = user.extrato.slice(-10).join("\n");

  message.reply(`📊 Últimas transações:\n${ultimos}`);
};