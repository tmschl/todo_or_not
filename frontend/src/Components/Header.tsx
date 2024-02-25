import { Box, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const pages = [
  {name: "Log In", path:"/log-in", showWhenLoggedIn: false },
  {name: "Create an Account", path:"/sign-up", showWhenLoggedIn: false},
  {name: "Projects", path:"/projects", showWhenLoggedIn: true},
  {name: "Account Details", path:"/profile", showWhenLoggedIn: true},

];

type Props = {
  loggedIn: boolean;
}

const Header = ({loggedIn}: Props) => {

  return (
    <Box display="flex" alignItems="center" p={4} >
      <Box display="flex" gap={4} alignItems="center" >
        <Image boxSize="70px" borderRadius="50%" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
        <Heading fontSize={24}>Project Planning Tool</Heading>
      </Box>
      <Box display="flex" justifyContent="space-around" width="70%">
        {pages.map((page) => {
          if (
            (loggedIn && page.showWhenLoggedIn) ||
            (!loggedIn && !page.showWhenLoggedIn)
          ) {
            return (
              <Link to={page.path} key={page.name} >
                <Box> {page.name} </Box>
              </Link>
            )
          } else {
            return null
          }
        })}
      </Box>
    </Box>
  )
}

export default Header;