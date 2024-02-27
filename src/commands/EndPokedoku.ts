import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("endpokedoku")
  .setDescription("Replies with Pong!");

export async function execute(interaction: CommandInteraction) {

  
  return interaction.reply("The guessing game has come to an end... for today! Here are the results: ");


}


