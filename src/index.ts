/**
 * 環境変数と実行モードの取得
 */
import 'dotenv/config';
const ENV = process.env;
const MODE = process.argv[2] || `PRD`;

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
	],
});

/**
 * クライアントが準備完了時のイベント
 */
client.on(Events.ClientReady, async (client) => {
	console.log(`${client.user.username}が起動したよ！`);
});

/**
 * メッセージ受信時のイベント
 */

client.on(Events.MessageCreate, async (msg) => {
	// Bot やシステム系は除外
	if (!msg.inGuild() || msg.author.bot || msg.system) return;

	const ch = msg.channel;
	if (ch.isSendable()) {
		await ch.send(`受信: ${msg.content}`);
	}
});

/**
 * Discord Botの起動
 */
client.login(ENV.DISCORD_BOT_API_TOKEN);