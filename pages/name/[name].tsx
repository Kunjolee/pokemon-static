import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { pokeApi } from "../../api"

import { Layout } from "../../components/layouts"
import { PokemonDetails } from "../../components/pokemon/"
import { Pokemon, PokemonListResponse } from "../../interfaces"
import { getPokemonInfo } from "../../utils/"

interface Props {
  pokemon: Pokemon
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {    

  return (    
     <Layout title={pokemon.name}>      
      <PokemonDetails pokemon={ pokemon } />
    </Layout>
  )
}


export const getStaticPaths: GetStaticPaths = async (context) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");  
  
  const paths = data.results.map((el) => {
    return { params: { name: el.name } }
  })

  return {
    paths,
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  let { name } = params as { name: string}      

  const pokemon = await getPokemonInfo(name);

  if (!pokemon) {
    return {
      redirect:{
        destination: "/",
        permanent: false
      }
    }
  }
  
  return {
    props: {
      pokemon
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 86400 //in seconds
  }
}

export default PokemonByNamePage 

/* 
  ISR: Incremental static regeneration   
  Me va a regenerar mi aplicacion cada cierto tiempo, ya estando en produccion. 

  puede actualizar la pagina o crear una nueva, sin necesidad de volver a construir la aplicacion. Es decir estando ya en produccion puede realizar todos esos procesos, de creacion o actualizacion de una pagina.

  Esto sirve por ejemplo si mi aplicacion yo se que su informacion va a cambiar cada cierto tiempo. Estando ya en produccion las paginas son estaticas, pero al re construirlas. traera esa informacion que ha cambiado con el paso del tiempo

  Esto se ejecutara cuando despues de el tiempo establecido, el cliente haga una request a la pagina que tuvo su regeneracion. ahi aplicara el cambio que despues a todos los demas clientes que hagan una request, ya tendran el cambio
*/
