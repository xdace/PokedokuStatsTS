import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("startpokedoku")
  .setDescription("Replies with Pong!");

export async function execute(interaction: CommandInteraction) {

  
  return interaction.reply("Let the guessing game begin!");


}


