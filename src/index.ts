/**
 * 環境変数と実行モードの取得
 */
import 'dotenv/config';
const ENV = process.env;
const MODE = process.argv[2] || `DEV`;

/**
 * 外部ライブラリ読込
 */
import {
	Client,
	GatewayIntentBits,
	Events,
} from 'discord.js';

/**
 * Discord Botのクライアントインスタンスを生成
 * 必要なIntentを指定して、Botの機能を有効化する
 */
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	]
});

/**
 * クライアントが準備完了時のイベント
 */
client.on(Events.ClientReady, async (client) => {
	if (MODE !== `DEV`) console.log(`${client.user.username}が起動したよ！`);
});

/**
 * メッセージ受信時のイベント
 */

client.on(Events.MessageCreate, async (message) => {

	// ガード節
	const endConditions = [
		!message.inGuild(),
		message.author.bot,
		message.system,
	];
	if (endConditions.some(e => e)) return;

	const channel = message.channel;
	if (channel.isSendable()) await channel.send(`受信: ${message.content}`);
});

/**
 * Discord Botの起動
 */
client.login(ENV.DISCORD_BOT_API_TOKEN);
