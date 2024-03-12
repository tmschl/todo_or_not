import { CheckIcon, EditIcon } from "@chakra-ui/icons"
import { Box, IconButton, Input, Text, useToast } from "@chakra-ui/react"
import { isValidDateValue } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { useState } from "react";
import { isInvalidEmail } from "../../Pages/SignUp";
import { Data } from "../../Pages/Profile";

type Props = {
  field: string;
  value: string;
  username: string;
  setData: React.Dispatch<React.SetStateAction<Data>>;
}

const UserDetailsRow = ({ field, value, username, setData }: Props) => {
  const toast = useToast();

  const [updateField, setUpdateField] = useState(false);
  const [valueState, setValueState] = useState(value);

  const onChange = (e: any) => {
    setValueState(e.target.value); 
  }

  const onClickEdit = () => {
    setUpdateField(!updateField);
  }

  const onClickCheck = async () => {
    if (field === 'Email') {
      const invalidEmail = isInvalidEmail(valueState);
      if (invalidEmail) {
        toast({
          title: 'Error',
          description: "Please enter a valid email",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return;
      }
      console.log('invalid email', invalidEmail);
    } else {
      if (valueState === '') {
        toast({
          title: 'Error',
          description: "Please enter a valid email",
          status: 'error',
          duration: 3000,
          isClosable: true,
        }) 
        return;
      }
    }

    const token = localStorage.getItem("token");
    
    setUpdateField(!updateField);
    
    // console.log('field', field);
    // console.log('token', token);
    // console.log('username', username);
    // console.log('value', value);

    await axios
    .post(
      "http://localhost:3025/auth/change-account-detail", 
      {
        username,
        field: field.toLowerCase(),
        value: valueState,
      }, { headers: { Authorization: `Bearer ${token}`} })
      .then((response) => {
        console.log( 'hi', response.data );
        setData(response.data);
        toast({
          title: 'Success',
          description: "You have updated your account details",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      })
      .catch((error) => {
        console.log('error', error)
        toast({
          title: 'Error',
          description: "There was an error. Please review your values and try again.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        }) 
      })
  }

  return (
  <Box display="flex" gap={2}>
    <Text flex={1} lineHeight="32px">
      {field}:
    </Text>

    {updateField ? (
      <Input flex={1} h="32px" value={valueState} onChange={onChange} type={field === "Password" ? "password" : "test" } />
    ) : (
      <Text flex={1} lineHeight="32px">
        {field === 'Password' ? "************" : valueState}
      </Text>
    )}

    <IconButton 
      aria-label='Edit Name' 
      icon={updateField ? <CheckIcon /> : <EditIcon/>} 
      size="sm" 
      onClick={updateField ? onClickCheck : onClickEdit}
    />
  </Box>
  )
}


export default UserDetailsRow;
