import { Grid } from "@nextui-org/react"

import { SmallPokemon } from "../../interfaces/"
import { PokemonCard } from "./"

interface Props {
  favoritesPokemon: SmallPokemon[]
}

const FavoritesPokemons = ({ favoritesPokemon }: Props) => {
  return (
    <Grid.Container gap={2} css={{marginTop: "1rem"}} justify="flex-start">

      {favoritesPokemon.map((el) => (
        <PokemonCard pokemon={el} key={el.id}/>               
      ))}
      
    </Grid.Container>             
  )
}
export default FavoritesPokemons