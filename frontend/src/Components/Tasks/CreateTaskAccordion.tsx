import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, FormControl, FormErrorMessage, FormLabel, Input, Button, useToast } from "@chakra-ui/react"
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Project } from "../../Pages/Projects";

type Props = {
  featureId: number;
  projectId: number;
  userStoryId: number;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
}


// REFACTOR: useContext instead

const CreateTaskAccordion = ({
  projectId, 
  featureId,
  userStoryId,
  setProject,
}: Props) => {

  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitClickedName, setSubmitClickedName] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const isErrorName = name === "" && submitClickedName;

  const onSubmit = () => {
    setSubmitClickedName(true);
    if (name !== "") {
      setIsOpen(false)
      const token = localStorage.getItem("token");

      axios.post(
        "http://localhost:3025/auth/create-task",
        {
          name,
          projectId,
          featureId,
          userStoryId,
        },
        { headers: { Authorization: `Bearer ${token}`}}
      ).then((response) => {
        setProject(response.data)
        setName("");
        setSubmitClickedName(false);

        toast({
          title: 'Success',
          description: `Your task has been created!`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }).catch((error) => {
        if (error.response.data.message === 'Unauthorized') {
          toast({
            title: 'Error',
            description: "Your session has expired. Please login again.",
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
          navigate('/log-in')
        } else {
          toast({
            title: 'Error',
            description: "There was an error creating your developer task. Please try again.",
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      })
    } 

  }

  const onChangeName = (e: any) => {
    setSubmitClickedName(false);
    setName(e.target.value);
  };

  return (
    <Accordion allowToggle index={isOpen ? 0 : 1}>
      <AccordionItem border="1px solid">
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton onClick={() => setIsOpen(!isOpen)}>

                {isExpanded ? (
                  <MinusIcon fontSize='12px' />
                ) : (
                  <AddIcon fontSize='12px' />
                )}

                <Box as="span" flex='1' textAlign='left' ml={3}>
                  Add a task
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} borderTop="1px solid">
              <FormControl isInvalid={isErrorName} isRequired mb={4}>
                <FormLabel>Task Name:</FormLabel>
                <Input type='text' value={name} onChange={onChangeName} />
                {!isErrorName ? null :  (
                  <FormErrorMessage>Developer Task name is required.</FormErrorMessage>
                )}
              </FormControl>
              <Button w="100%" onClick={onSubmit}>
                Create Task
              </Button>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}

export default CreateTaskAccordion;
