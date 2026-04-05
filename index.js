require("dotenv").config(); // 🔥 sempre no topo

const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");

const { Client, GatewayIntentBits } = require("discord.js");

// 🤖 Cliente Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const prefix = "!";
const DB_PATH = path.join(__dirname, "dados.json");

// 📂 cria banco automático
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(
    DB_PATH,
    JSON.stringify({ users: {}, canaisBanco: {} }, null, 2)
  );
}

// 🔄 Função segura pra ler banco
function getDados() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH));
  } catch (err) {
    console.error("❌ Erro ao ler dados.json:", err);
    return { users: {}, canaisBanco: {} };
  }
}

// 🌐 Servidor web (Render)
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("CoinVault online 🚀");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`🌐 Servidor web rodando na porta ${PORT}`);
});

// 🔍 DEBUG GLOBAL
process.on("unhandledRejection", (err) => {
  console.error("❌ ERRO GLOBAL:", err);
});

client.on("error", (err) => {
  console.error("❌ ERRO DO CLIENT:", err);
});

// 🤖 Bot pronto
client.once("ready", () => {
  console.log(`✅ Bot logado como ${client.user.tag}`);
});

// 📩 Comandos
client.on("messageCreate", async (message) => {
  try {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;

    const dados = getDados();
    const canalPermitido = dados.canaisBanco?.[message.guild.id];

    // 🚫 bloqueia fora do canal permitido
    if (canalPermitido && message.channel.id !== canalPermitido) {
      return;
    }

    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const cmd = args.shift().toLowerCase();

    const caminho = path.join(__dirname, "comandos", `${cmd}.js`);

    if (!fs.existsSync(caminho)) {
      return message.reply("❌ Comando não encontrado.");
    }

    const comando = require(caminho);

    if (typeof comando.run !== "function") {
      return message.reply("❌ Comando inválido.");
    }

    await comando.run(message, args);

  } catch (error) {
    console.error("❌ Erro geral:", error);
    message.reply("❌ Ocorreu um erro ao executar o comando.");
  }
});

// 🚀 LOGIN
(async () => {
  try {
    if (!process.env.TOKEN) {
      throw new Error("❌ TOKEN não definido no .env");
    }

    console.log("🔄 Tentando logar...");
    await client.login(process.env.TOKEN);

  } catch (err) {
    console.error("❌ ERRO AO LOGAR:", err);
  }
})();