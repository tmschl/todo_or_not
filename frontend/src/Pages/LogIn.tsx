import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import ForgotPasswordModal from "../Components/Login/ForgotPasswordModal";

const LogIn = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const context = useOutletContext() as Context;
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitClickedUsername, setSubmitClickedUsername] = useState(false);
  const [submitClickedPassword, setSubmitClickedPassword] = useState(false);

  const isErrorUsername = username === '' && submitClickedUsername;
  const isErrorPassword = password === '' && submitClickedPassword;

  const onChangeUsername = (e: any) => {
    setSubmitClickedUsername(false)
    setUsername(e.target.value);
  }

  const onChangePassword = (e: any) => {
    setSubmitClickedPassword(false)
    setPassword(e.target.value);
  }
  const onSubmit = () => {
    setSubmitClickedUsername(true);
    setSubmitClickedPassword(true);

    if (password === "" || username === "" ) {
      return;
    } else {
      axios
        .post('http://localhost:3025/auth/log-in', {
          username,
          password,
        }).then((response) => {
          const token = response.data;
          context.toggleLoggedIn();
          localStorage.setItem("token", token);

          setUsername('');
          setPassword('');
          setSubmitClickedUsername(false);
          setSubmitClickedPassword(false);

          navigate('/projects');
          toast({
            title: 'Logged In',
            description: `Welcome back, ${username}`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
      }).catch((error) => {
          console.log(error);
          setUsername('');
          setPassword('');

          setSubmitClickedUsername(false);
          setSubmitClickedPassword(false);

          toast({
            title: 'Error',
            description: "There was an error logging you in",
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
      })
    }
  }
  return (    
    <Box>
      <Text textAlign="center" mb={4} fontSize={20} >Log into Your Account</Text>
      <Box 
        maxW="75%" 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        margin="0 auto"
        gap={4}
      >
        <FormControl isInvalid={isErrorUsername} isRequired>
          <FormLabel>Username</FormLabel>
          <Input type='text' value={username} onChange={onChangeUsername} />
          {!isErrorUsername ? null :  (
            <FormErrorMessage>Username is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isErrorPassword} isRequired>
          <FormLabel>Password</FormLabel>
          <Input type='password' value={password} onChange={onChangePassword} />
          {!isErrorPassword ? null :  (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
        </FormControl>
        <Button w="100%" onClick={onSubmit}>Submit</Button>
      </Box>

      <Box display="flex" gap={10} justifyContent="center" mt={10}>
        <Text lineHeight="40px">Forgot your password?</Text>
        <Button onClick={onOpen} >Reset Password</Button>
      </Box>

      <ForgotPasswordModal isOpen={isOpen} onClose={onClose} />

    </Box>
  )
}

export default LogIn;
