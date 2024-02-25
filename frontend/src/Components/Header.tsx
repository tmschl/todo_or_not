import { Box, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const pages = [
  {name: "Log In", path:"/log-in"},
  {name: "Create an Account", path:"/sign-up"},
  {name: "Projects", path:"/projects"},
  {name: "Account Details", path:"/profile"},

];

const Header = () => {

  return (
    <Box display="flex" alignItems="center" p={4} >
      <Box display="flex" gap={4} alignItems="center" >
        <Image boxSize="70px" borderRadius="50%" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
        <Heading fontSize={24}>Project Planning Tool</Heading>
      </Box>
      <Box display="flex" justifyContent="space-around" width="70%">

        {pages.map((page) => {
          return (
            <Link to={page.path}>
              <Box> {page.name} </Box>
            </Link>);
        })}

      </Box>
    </Box>
  )
}

export default Header;