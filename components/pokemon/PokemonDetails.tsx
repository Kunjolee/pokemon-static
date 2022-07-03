import { useState, useEffect } from "react"
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react"

import confetti from "canvas-confetti"

import { Pokemon } from "../../interfaces"
import { localFavorites } from "../../utils"

interface Props {
  pokemon: Pokemon
}

const PokemonDetails = ({ pokemon }: Props ) => {  
  const [isInFavorites, setIsInFavorites] = useState(false);

  const handleToggleFavorites = () => {

    const {name, id} = pokemon;

    localFavorites.toggleFavorites({
      name,
      id,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`
    })

    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;
    
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    })

  }

  useEffect(() => {    
    setIsInFavorites(localFavorites.existInFavorites(pokemon.id))
  }, []);


  return (
    <Grid.Container css={{ marginTop: '5px'}} gap={ 2 }  >
      <Grid xs={12} sm={4}>
        <Card isHoverable css={{ padding: '30px' }}>
          <Card.Body>
            <Card.Image
              src={pokemon.sprites.other?.dream_world.front_default || './notFound.png'}
              alt={pokemon.name}
              width='100%'
              height={ 200 }
            />
          </Card.Body>
        </Card>
      </Grid>
      <Grid xs={12} sm={8} >          
        <Card>
          <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text h1 transform='capitalize'>{ pokemon.name }</Text>
            <Button
              bordered={ isInFavorites ? false : true } 
              color="secondary"
              onClick={ handleToggleFavorites }
            >
              {
                isInFavorites ? "In Favorites" : "Add to favorites"
              }              
            </Button>
          </Card.Header>
          <Card.Body>
            <Text size={ 30 }>Sprites: </Text>
            <Container display='flex' direction='row' gap={ 0 }>
              <Image 
                src={ pokemon.sprites.front_default }
                alt={ pokemon.name }
                width={ 100 }
                height={ 100 }
              />
              <Image 
                src={ pokemon.sprites.back_default }
                alt={ pokemon.name }
                width={ 100 }
                height={ 100 }
              />
              <Image 
                src={ pokemon.sprites.front_shiny }
                alt={ pokemon.name }
                width={ 100 }
                height={ 100 }
              />
              <Image 
                src={ pokemon.sprites.back_shiny }
                alt={ pokemon.name }
                width={ 100 }
                height={ 100 }
              />
            </Container>
          </Card.Body>
        </Card> 
      </Grid>
    </Grid.Container>      
  )
}
export default PokemonDetails