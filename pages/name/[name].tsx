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
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  let { name } = params as { name: string}      

  return {
    props: {
      pokemon: await getPokemonInfo(name)
    }
  }
}

export default PokemonByNamePage 