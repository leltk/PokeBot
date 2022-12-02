import {pokeApi} from "./pokeApi.js"

    export default class Request {
    
     static async getPokemon (name){
        let pokemon= {}
        const request= await  pokeApi.get(`/pokemon/${name}`)
        .then( res=> pokemon = res.data)
        .catch(err=> pokemon = "err")
        
        
        
        return pokemon
      
     }


}

