import { ChakraProvider } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';


function App() {
  return (
    <ChakraProvider>
      <Header />
      <Outlet />
    </ChakraProvider>
  );
}

export default App;

  // const [firstName, setFirstName] = useState("timmy")
  // const [lastName, setLastName] = useState("schiller")

  // const onFirstNameChange = (e) => {
  //   console.log(e.target.value);
  //   setFirstName(e.target.value);
  // }

  // const onLastNameChange = (e) => {
  //   console.log(e.target.value);
  //   setLastName(e.target.value);
  // }
  // const handleClick = async (e) => {
  //   const response = await axios.post('http://localhost:3025/name', { 
  //     firstName,
  //     lastName 
  //   })
  //   console.log('NAME RESPONSE:', response);
  // }
      // <Box m="10" display="flex" gap={4} >
      //   <Input placeholder="First Name" onChange={onFirstNameChange} />
      //   <Input placeholder="First Name" onChange={onLastNameChange} />
      //   <Button colorScheme="purple" onClick={handleClick}>
      //     Send
      //   </Button>
      // </Box>
      
