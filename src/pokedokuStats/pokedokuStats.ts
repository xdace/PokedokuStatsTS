import dotenv from "dotenv/config";

import * as fs from 'fs';
import {Client,  GatewayIntentBits, Partials, Collection, ActivityType, Message, Collector, MessageCollector, MessageType} from  "discord.js";
import { commands } from "../commands";
import { deployCommands } from "../deploy-commands";
import { PuzzleReader } from "./puzzleReader/puzzleReader";
import { Guesses, GuessingData } from "./models/guessingData";
import { measureMemory } from "vm";

export class PokeDokuStats {
    token : string = "";
    client : Client | undefined;
    collecter : MessageCollector | undefined;
    guesses : GuessingData[] = [];
    constructor(token : string)
    {
        this.token = token;
        this.client = new Client({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers],
            partials: [Partials.Channel, Partials.Message, Partials.Reaction]
        }); 

        this.client.once("ready", () => {
            console.log("Discord bot is ready! 🤖");
          });
          
          

          this.client.on("guildCreate", async (guild) => {
            await deployCommands({ guildId: guild.id });
          });
          
          this.client.on("interactionCreate", async (interaction) => {
            
            if (!interaction.isCommand()) {
              console.log("Kei Kommando!");
              return;
            }
            const { commandName } = interaction;

            if (commands[commandName as keyof typeof commands]) {
              console.log(commandName);
              commands[commandName as keyof typeof commands].execute(interaction);
            }
          });

          this.client.on("messageCreate", async (message) => this.onMessageCreate(message));

          this.client.login(token);
    }

    onMessageCreate(message : Message) {
        if(message.channelId == process.env.DISCORD_TEXT_CHANNELID && message.author.bot && message.content=="Let the guessing game begin!")
        {
          this.guesses = [];
          this.collecter = message.channel.createMessageCollector({filter: f => !f.author.bot});
          this.collecter.on("collect", async (message) => {
              if(this.checkIfMessageIsFirstAndImportent(message))
              {
                var curGuessingData = this.getGuessingDataFromMessage(message);
                this.guesses.push(curGuessingData);
                if(curGuessingData.guesses.length < 9)
                {
                  message.reply("Oh, today you did not guess all 9? Such a shame, which fields did you not guess? (reply to this message with the numbers of the fields according to your numpad)");
                }
              }
              if(message.type === MessageType.Reply)
              {
                var messageFromBefore = await message.channel.messages.fetch(message.reference?.messageId as string);
                if(messageFromBefore.author.bot)
                {
                  if(this.checkIfReplyIsRelevant(message))
                  {

                  }
                }
              }
          })
          

        }
        if(message.channelId == process.env.DISCORD_TEXT_CHANNELID && message.author.bot && message.content=="The guessing game has come to an end... for today! Here are the results: ")
        {
          if(this.collecter) {
            this.collecter.stop();
            this.collecter = undefined;
          }
        }

    }

    checkIfMessageIsFirstAndImportent(message: Message) :boolean {
      if(this.guesses.find(x => x.authorId == message.author.id))
        return false;

      if(!message.content.includes("%"))
        return false;
      

      return true;
    } 

    checkIfReplyIsRelevant(message: Message) : boolean {
      return true;
    }

    getGuessingDataFromMessage(message: Message) : GuessingData {
      return {
        author: message.author.displayName,
        authorId: message.author.id,
        guesses: this.getAllGuessesFromMessage(message)
      }
    }

    getAllGuessesFromMessage(message: Message) : Guesses[] {
      var allGuesses = message.content.split("%").filter(x => x.length > 0);
      if(allGuesses.length >9)
        allGuesses.pop();

      var guesses : Guesses[] = []
      var count = 1;
      allGuesses.forEach(guess => {
        var guessData = guess.split('\n');
        console.log(guessData);
        guesses.push({
          field: 0,
          guessingOrder: count,
          pokemon: guessData[guessData.length-3],
          prozent: guessData[guessData.length-1],
        })
        count++;
      })

      console.log(guesses);
      return guesses;
    }


}