import { Client, GatewayIntentBits, Partials } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import { deployCommands } from "./deploy-commands";
import { PokeDokuStats } from "./pokedokuStats/pokedokuStats";

export const bot = new PokeDokuStats(config.DISCORD_BOT_TOKEN);

