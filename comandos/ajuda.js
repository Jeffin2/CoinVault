module.exports = {
  name: "ajuda",
  run: (message, args) => {

    const opcao = args[0]?.toLowerCase();

    // 📌 ajuda geral
    if (!opcao) {
      return message.reply(
`📖 **Ajuda - CoinVault**

Use:
!ajuda comandos → lista de comandos
!ajuda definir → como definir canal do banco`
      );
    }

    // 📌 lista de comandos
    if (opcao === "comandos") {
      return message.reply(
`💰 **Comandos do CoinVault**

!saldo → ver seu dinheiro
!trabalhar → ganhar dinheiro
!depositar [valor] → guardar no banco
!depositartudo → guardar tudo
!sacar [valor] → tirar do banco
!sacartudo → sacar tudo
!emprestimo [valor] → pegar dinheiro emprestado
!extrato → ver histórico
!setcanal → definir canal do banco`
      );
    }

    // 📌 definir canal
    if (opcao === "definir" || opcao === "sala") {
      return message.reply(
`🏦 **Definir canal do banco**

Use:
!setcanal

👉 Execute no canal que deseja usar para o banco.`
      );
    }

    // ❌ opção inválida
    message.reply("Opção inválida. Use !ajuda");
  }
};