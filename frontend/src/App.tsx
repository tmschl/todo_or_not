import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Button, ChakraProvider, Input } from '@chakra-ui/react';
import axios from 'axios';

function App() {
  const [firstName, setFirstName] = useState("timmy")
  const [lastName, setLastName] = useState("schiller")

  const onFirstNameChange = (e) => {
    console.log(e.target.value);
    setFirstName(e.target.value);
  }

  const onLastNameChange = (e) => {
    console.log(e.target.value);
    setLastName(e.target.value);
  }
  const handleClick = async (e) => {
    const response = await axios.post('http://localhost:3025/name', { 
      firstName,
      lastName 
    })
    console.log('NAME RESPONSE:', response);
  }

  return (
    <ChakraProvider>
      <Box m="10" display="flex" gap={4} >
        <Input placeholder="First Name" onChange={onFirstNameChange} />
        <Input placeholder="First Name" onChange={onLastNameChange} />
        <Button colorScheme="purple" onClick={handleClick}>
          Send
        </Button>
      </Box>
    </ChakraProvider>
  );
}

export default App;
