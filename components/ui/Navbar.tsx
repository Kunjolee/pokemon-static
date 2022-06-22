import Image from "next/image";
import NextLink from "next/link";
import { Link, Spacer, Text, useTheme } from "@nextui-org/react";

const Navbar = () => {

  const { theme } = useTheme();

  return (
    <div style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0px 20px",
        backgroundColor: theme?.colors.gray50.value
      }}>
        <Image 
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          alt="app-icon"
          height={70}
          width={70}   
        
        />

        <NextLink href="/" passHref>
          <Link>
            <Text color="white" h2>P</Text>
            <Text color="white" h3>okémon</Text>        
          </Link>
        </NextLink>

        <Spacer css={{ flex: 1}}/>

        <NextLink href="/favorites" passHref>
          <Link>
            <Text color="white" css={{ marginRight: "30px" }}>Favoritos</Text>        
          </Link>
        </NextLink>
    </div>
  )
}
export default Navbar