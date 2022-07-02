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
        <title>{ title || "PokemonApp" }</title>
        <meta name="author" content="Kunjo Lee"/>
        <meta name="description" content={`Informacion sobre el pokemon ${ title }`}/>
        <meta name="keywords" content={`${ title }, pokemon, pokedex`}/>

        <meta property="og:title" content={`Information about ${title}`} />
        <meta property="og:description" content={`About ${title}`} />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <Navbar/>

      <main style={{ padding: "0px 20px" }}>
        { children }
      </main>
    </>
  )
}
export default Layout