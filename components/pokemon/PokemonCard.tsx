import { Card, Row, Text, Grid } from "@nextui-org/react"
import { useRouter } from "next/router"
import { SmallPokemon } from "../../interfaces"

interface PokemonCardProps {
  pokemon: SmallPokemon
}

const PokemonCard = ( { pokemon }: PokemonCardProps ) => {

  const router = useRouter();

  const handleClick = (): void => {
    router.push(`pokemon/${ pokemon.id }`)
  }

  return (
    <Grid xs={ 6 } sm={ 3 } md={ 2 } xl={ 1 } key={ pokemon.id }>
      <Card 
        isPressable 
        isHoverable
        onClick={ handleClick }
      >
        <Card.Body css={{ p: 1 }}>
          <Card.Image 
            src={pokemon.img}
            width="100%"
            height={ 140 }                      
          />
        </Card.Body>  
        <Card.Footer>
          <Row justify="space-between">
            <Text>{ pokemon.name }</Text>
            <Text># { pokemon.id }</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  )
}
export default PokemonCard