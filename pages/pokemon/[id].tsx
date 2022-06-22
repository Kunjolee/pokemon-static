import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts'
import { Pokemon } from '../../interfaces/';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px'}} gap={ 2 }  >

        <Grid xs={4}>
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

        <Grid xs={8}>          
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>{ pokemon.name }</Text>
              <Button
                color='gradient'
                ghost
              >
                Add to favorites
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
    </Layout>
  )
}


export const getStaticPaths: GetStaticPaths = async (context) => {
  
  const pageIds: string[] = [...Array(151)].map((va, index) => ( `${index + 1}` ))
    
  return {
    paths: pageIds.map((id) => (
      {
        params: { id }
      }
    )),
    fallback: false
  }
}


// Recibo los parametros de getStaticPaths
export const getStaticProps: GetStaticProps = async ({ params }) => {

  let { id } = params as { id: string }  

  const { data } = await pokeApi.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${ id }`)  
  
  return {
    props: {
      pokemon: data
    }
  }
}

export default PokemonPage



// Rutas dinamicas: Escribir el nombre de la pagina entre []. Ejemplo [categoria].tsx

/* 
  -getStaticPaths: Generar paginas estaticas cuando se usan rutas dinamicas 
  -getStaticPaths solo se mandara a llamar en el build time de la aplicacion

  -getStaticPaths can only be exported from a dynamic route that also uses getStaticProps. You cannot export it from non-page files: e.j. from your components folder.


  -el getStaticPaths le pasa sus parametros a getStaticProps, y getStaticProps puede acceder a ellos con el context.params
*/

