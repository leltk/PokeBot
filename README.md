# PokeBot
Is a discord bot. The bot returns a messge with pokemon image, name and types.

## Register your app at https://discord.com/developers/applications
You need the app key to run, if you don't have one.

## dotenv 
 Rename .env-example to .env open the file and paste your token


## Run with yarn dev 
![yarn dev](/src/md/dev.png)
 
## !poke
!poke is the prefix, you can give the pokemon id or pokemon name.

![yarn dev](/src/md/test.png)

![yarn dev](/src/md/test_name.png)

![yarn dev](/src/md/test2.png)

## Image generation 
The folder pokeTypes have the types and the background,
the images of the types I downloaded from this link http://www.rw-designer.com/icon-set/pokemon-types
credits to @Bobcat. The downloads are done with a webscrap script, the link has types of fake pokemons, so I deleted those types,
pokemons come from the poke api https://pokeapi.co

###  Canvas
 discord accept canvas, like html canvas, first the background is placed first, then the pokemon is placed, we use the position of the pixels to relocate, after that we have to get the name and also place it on the canvas and position it, so the types, as the other parts do not collide, the only The rule here is that the background is placed first, then the image is assembled and sent as an attachment.
