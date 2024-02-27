import dotenv from "dotenv";

dotenv.config();

const { DISCORD_BOT_TOKEN, DISCORD_APPLICATION_ID, DISCORD_TEXT_CHANNELID } = process.env;

if (!DISCORD_BOT_TOKEN || !DISCORD_APPLICATION_ID || !DISCORD_TEXT_CHANNELID) {
  throw new Error("Missing environment variables");
}

export const config = {
  DISCORD_BOT_TOKEN,
  DISCORD_APPLICATION_ID,
  DISCORD_TEXT_CHANNELID
};
