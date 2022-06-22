import Head from "next/head";
import { Navbar } from "../ui"

type LayoutProps = {
  children: JSX.Element | JSX.Element[]
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{ title || "PokemonApp" }</title>
        <meta name="author" content="Kunjo Lee"/>
        <meta name="description" content={`Informacion sobre el pokemon ${ title }`}/>
        <meta name="keywords" content={`${ title }, pokemon, pokedex`}/>
      </Head>

      <Navbar/>

      <main style={{ padding: "0px 20px" }}>
        { children }
      </main>
    </>
  )
}
export default Layout