import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Button, ChakraProvider, Input } from '@chakra-ui/react';
import axios from 'axios';

function App() {
  const [name, setName] = useState("test name 3")

  const onChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  }

  const handleClick = async (e) => {
    const response = await axios.post('http://localhost:3025/name', { 
      name
    })
    console.log('NAME RESPONSE:', response);
  }

  return (
    <ChakraProvider>
      <Box m="10" display="flex" gap={4} >
        <Input placeholder="place holder" onChange={onChange} />
        <Button colorScheme="purple" onClick={handleClick}>
          Submit Name
        </Button>
      </Box>
    </ChakraProvider>
  );
}

export default App;
