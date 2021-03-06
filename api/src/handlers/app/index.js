const axios = require('axios');
const {Type, Pokemon} = require('../db')
const {API, API_TYPE} = require('../../constants')

async function getTypes(){
    const responser = await axios.get(API_TYPE)
    const typesbd = await Promise.all(responser.data.results.map(t=>{
        return Type.findOrCreate({where:{name:t.name}})
    }))
    
    // const results = responser.data.results;
        
    // results.map( types => {
    //     Type.findOrCreate(
    //         { where:{
    //             name: types.name
    //             }, 
    //         defaults: { 
    //             name: types.name
    //             }
    //         })
    // });
}

async function getDBPokemonsFullInfo(){
    return await Pokemon.findAll(
        {include: {
            model: Type, attributes: ["name", "id"],
            through: { attributes: []}
            }}
            )
}


async function getApiPokemonsFullInfo(){
    const Url = await axios.get(API); //brings the FIRST 20 pokemons from the api
    const UrlNext = await axios.get(Url.data.next); //brings the LAST 20 pokemons from the api
    const resultsPokemon = Url.data.results.concat(UrlNext.data.results);   
            
    const Pokemons =  await Promise.all(
        resultsPokemon.map(async (pokemon) => {
            const pokeInfo = await axios.get(pokemon.url);
            const pokeData = pokeInfo.data;
            let poke= {
                id: pokeData.id,
                image: pokeData.sprites.front_default,
                name: pokeData.name,
                types: pokeData.types.map(types => types.type.name),
                health: pokeData.stats[0].base_stat,
                strength: pokeData.stats[1].base_stat,
                defense: pokeData.stats[2].base_stat,
                speed: pokeData.stats[5].base_stat,
                height: pokeData.height,
                weight: pokeData.weight
            }
            return poke;
        })
        ); 
    return Pokemons;
}

async function getAllPokemons() {
    const pokeApi = await getApiPokemonsFullInfo();
    const pokeDb = await getDBPokemonsFullInfo();
    const everyPokemons = pokeApi.concat(pokeDb);
    return everyPokemons;
}

module.exports={getTypes, getDBPokemonsFullInfo, getAllPokemons, getApiPokemonsFullInfo}