import {Client,GatewayIntentBits} from 'discord.js'
import * as dotenv from 'dotenv'
import Request from "./requests.js"
import canvas from 'canvas'

dotenv.config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]

})

client.on("ready", () => {
    console.log("bot on")

})

const sendPoke = async (pokemon, prefix, message) => {

    if (prefix === "!poke") {

        const infosPoke = await Request.getPokemon(pokemon)

        if (infosPoke === "err") {
            return  message.channel.send(
                'pokemon not found'
            )

        } else {

            let pokeCanvas = {}
            pokeCanvas.create = canvas.createCanvas(475, 550)
            pokeCanvas.context = pokeCanvas.create.getContext('2d')
            pokeCanvas.context.font = '30px sans-serif'
            pokeCanvas.context.filStyle = "#000001"

            await canvas.loadImage("src/pokeTypes/background.png")
                .then(async (i) => {
                    pokeCanvas.context.drawImage(i, 0, 0, 475, 550)
                    pokeCanvas.context.beginPath()
                    pokeCanvas.context.stroke()
                    pokeCanvas.context.fill()

                    await canvas.loadImage(`${infosPoke.sprites.other["official-artwork"].front_default}`)
                        .then(async (i) => {
                            pokeCanvas.context.drawImage(i, 0, 0, 475, 475)

                        })

                    await canvas.loadImage(`src/pokeTypes/${infosPoke.types["0"].type.name}.png`)
                        .then(async (i) => {
                            pokeCanvas.context.drawImage(i, 415, 480, 50, 50)

                        })

                    infosPoke.types["1"] ?
                        await canvas.loadImage(`src/pokeTypes/${infosPoke.types["1"].type.name}.png`)
                        .then(async (i) => {
                            pokeCanvas.context.drawImage(i, 355, 480, 50, 50)

                        }) :
                        null

                    pokeCanvas.context.fillStyle = 'rgba(153, 19, 84, 0.72)'
                    pokeCanvas.context.fillRect(50, 490, 250, 30)

                    pokeCanvas.context.fillStyle = '#000001'
                    pokeCanvas.context.fillText(`${infosPoke.name.toUpperCase()}`, 50, 515);
                    pokeCanvas.context.beginPath();
                    pokeCanvas.context.arc(521, 200, 119, 0, Math.PI * 2, true);
                    pokeCanvas.context.closePath();
                    pokeCanvas.context.fillRect()
                    pokeCanvas.context.clip();

                    const pokeImage = pokeCanvas.create.toBuffer()

                    message.channel.send({
                        files: [pokeImage]
                    })
                 
                })
        }
    }

}

client.on('messageCreate', async message => {
    if (message.author.bot) {
        return
    }
    const [prefix, pokemon] = message.content.split(" ")

    sendPoke(pokemon, prefix, message)

})


client.login(process.env.TOKEN)