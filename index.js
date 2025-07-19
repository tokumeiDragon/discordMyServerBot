/**
 * 環境変数と実行モードの取得
 */
require(`dotenv`).config();
const ENV = process.env;
const MODE = process.argv[2] || `PRD`;

/**
 * 外部ライブラリ読込
 */
const Discord = require(`discord.js`);  // Discord.js


/**
 * Discord Botのイベントハンドラ
 */
const client = new Discord.Client({ intents: Object.values(Discord.GatewayIntentBits) })
client.on(`ready`, async function (client) {
	console.log(`${client.user.username}が起動したよ！`);
});

client.on(`messageCreate`, async message => {

	// システムメッセージなら抜ける
	if (message.system) return;

	// 
	console.log(message);

});
// ログイン
client.login(ENV.DISCORD_BOT_API_TOKEN);