import { Box, Text, Button, FormControl, FormErrorMessage, FormLabel, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const [submitPassword, setSubmitPassword] = useState(false);
  const [submitSecondPassword, setSubmitSecondPassword] = useState(false);

  const isErrorPassword = password === "" && submitPassword;
  const isErrorSecondPassword = password !== secondPassword && submitSecondPassword;

  const onChangePassword = (e: any) => {
    setSubmitPassword(false);
    setSubmitSecondPassword(false);
    setPassword(e.target.value);
  }

  const onChangeSecondPassword = (e: any) => {
    setSubmitSecondPassword(false);
    setSecondPassword(e.target.value)
  }

  const onSubmit = () => {
    setSubmitPassword(true)
    setSubmitSecondPassword(true)

    axios
      .post("http://localhost:3025/auth/save-new-password", {
        newPassword: password,
        id,
        token,
      })
      .then((response) => {
        setPassword("");
        setSecondPassword("");
        navigate('/log-in');
        toast({
          title: 'Success',
          description: `Your password has been reset! Please log in with your new password.`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }).catch((error) => {
        toast({
          title: 'Error',
          description: "We cannot reset your password at this time. Please start the reset password process again",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })
  }

  return (
    <Box>
      <Text textAlign="center" mb={4} fontSize={20} >
        Reset Your Password
      </Text>
      <Box 
      maxW="75%" 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      margin="0 auto"
      gap={4}
    >
      <FormControl isInvalid={isErrorPassword} isRequired>
        <FormLabel>Password</FormLabel>
        <Input type='password' value={password} onChange={onChangePassword} />
        {!isErrorPassword ? null :  (
          <FormErrorMessage>Password is required.</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={isErrorSecondPassword} isRequired>
        <FormLabel>Re-Enter Password</FormLabel>
        <Input type='password' value={secondPassword} onChange={onChangeSecondPassword} />
        {!isErrorSecondPassword ? null :  (
          <FormErrorMessage>Passwords must match</FormErrorMessage>
        )}
      </FormControl>
      <Button w="100%" onClick={onSubmit}>
        Submit
      </Button>
    </Box>
  </Box>
  )
}

export default ResetPassword;
