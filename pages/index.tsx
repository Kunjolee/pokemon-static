import type { GetStaticProps, NextPage } from 'next';
import { Grid } from '@nextui-org/react';

import { Layout } from '../components/layouts';
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon';

interface HomeProps {
  pokemons: SmallPokemon[]
}

const Home: NextPage<HomeProps> = ({ pokemons }) => {  
  
  return (
    <>        
      <Layout title="Listado de pokemon">        

        <Grid.Container gap={ 2 } justify="flex-start">
          {
            pokemons.map(( pokemon ) => (
              <PokemonCard pokemon={ pokemon } key={ pokemon.id } />
            ))
          }
        </Grid.Container>
      </Layout>      
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) =>{

  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");  

  const pokemons: SmallPokemon[] = data.results.map((item, i) => {
    let id: number = ++i;

    return {
      ...item,
      id,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
    }
  })     


  return {
    props: {
      pokemons
    }
  }
}

export default Home


/* 
  getStaticProps:
  
 -Solo se puede usar en las pages, solo ejecuta 1 vez en el built time. 

 -Se puede ejecutar solo en el servidor.

 -Solo se puede ejecutar en pages.

 -Se pueden hacer peticiones API, trabajar con base de datos, porque nada de lo que se ejecuta en la funcion llegara al cliente, exceptuando las props que retorna.

 -Las props que se retornan, las recibira la pagina que esta ejecutando getStaticProps.

 -En el built time las props de las pages se incluyen  los datos que retorna la funcion getStaticProps.

 -se usa para obtener informacion y mostrarla de forma estática, como en este ejemplo yo se que solo 
 mostrare 151 pokemones y ya no mostraré más, es decir no será dinamico.
 */