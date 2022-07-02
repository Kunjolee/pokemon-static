import { SmallPokemon } from "../interfaces";

const toggleFavorites = (pokemon: SmallPokemon) => {

  let pokemons: SmallPokemon[] = JSON.parse( localStorage.getItem("favoritesPokemon") || "[]" );
   
  pokemons.find((el) => el.id === pokemon.id ) 
    ? pokemons = pokemons.filter( (poke) => poke.id !== pokemon.id )
    : pokemons.push( pokemon )     


  localStorage.setItem("favoritesPokemon" , JSON.stringify( pokemons ))
}


const existInFavorites = (id: number): boolean => {
  let res: boolean = false;

  const pokemons: SmallPokemon[] = JSON.parse( localStorage.getItem("favoritesPokemon") || "[]" );
  pokemons.find( (el) => el.id === id ) 
    ? res = true
    : res = false

  return res;
}

const getPokemons = (): SmallPokemon[] => {
  return JSON.parse(localStorage.getItem("favoritesPokemon") || "[]")
}

export default {
  toggleFavorites,
  existInFavorites,
  getPokemons
}