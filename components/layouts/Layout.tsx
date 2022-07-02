import Head from "next/head";
import { Navbar } from "../ui"

type LayoutProps = {
  children: JSX.Element | JSX.Element[]
  title?: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin

const Layout = ({ children, title }: LayoutProps) => {
  

  return (
    <>
      <Head>
        <title>{ title || "Pokemon App" }</title>
        <meta name="author" content="Kunjo Lee"/>
        <meta name="description" content={`List of 151 pokemons`}/>
        <meta name="keywords" content={`${ title }, pokemon, pokedex`}/>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={`List of 151 pokemons`} />
        <meta property="og:image" content={`${origin}/img/banner.png`} />

        <link rel="icon" type="image/png" href={`${origin}/img/pokeball.png`}/>
      </Head>

      <Navbar/>

      <main style={{ padding: "0px 20px" }}>
        { children }
      </main>
    </>
  )
}
export default Layout