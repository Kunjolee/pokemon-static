import { useEffect, useState } from "react";

import { Layout } from "../../components/layouts";
import { NoFavorites } from "../../components/ui";
import { FavoritesPokemons } from "../../components/pokemon";

import { localFavorites } from "../../utils";
import { SmallPokemon } from "../../interfaces";

const FavoritesPage = () => {
  const [favoritesPokemon, setFavoritesPokemon] = useState<SmallPokemon[]>([]);

  useEffect(() => {
    setFavoritesPokemon(localFavorites.getPokemons())        
  }, []);
  
  return (
    <Layout title="Favorites - Pokemons">      
      { 
        favoritesPokemon.length === 0 
          ? ( <NoFavorites /> )
          : ( <FavoritesPokemons favoritesPokemon={favoritesPokemon} /> )        
      }      
    </Layout>
  )
}
export default FavoritesPage