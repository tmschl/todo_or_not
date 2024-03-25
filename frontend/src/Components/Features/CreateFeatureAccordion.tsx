import { Accordion, AccordionItem, Textarea, AccordionButton, AccordionIcon, AccordionPanel, Box, FormControl, FormErrorMessage, FormLabel, Input, Button, useToast } from "@chakra-ui/react"
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { useState } from "react";
import { Project } from "../../Pages/Projects";
import axios from "axios";
import { Feature } from "../../Pages/Project";
import { useNavigate } from "react-router-dom";

type Props = {
  features: Feature[];
  setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
  projectId: number;
}

const CreateFeatureAccordion = ({features, setFeatures, projectId}: Props) => {
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
        "http://localhost:3025/auth/create-feature",
        {
          name,
          description,
          projectId,
        },
        { headers: { Authorization: `Bearer ${token}`}}
      ).then((response) => {
        setFeatures(response.data)
        setName("");
        setDescription("");
        setSubmitClickedName(false);

        toast({
          title: 'Success',
          description: `Your feature has been created!`,
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
            description: "There was an error creating your feature. Please try again.",
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

  const onChangeDescription = (e: any) => {
    setDescription(e.target.value);
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
                  Add a feature
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} borderTop="1px solid">
              <FormControl isInvalid={isErrorName} isRequired mb={4}>
                <FormLabel>Feature Name:</FormLabel>
                <Input type='text' value={name} onChange={onChangeName} />
                {!isErrorName ? null :  (
                  <FormErrorMessage>Feature name is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Feature Description:</FormLabel>
                <Textarea value={description} onChange={onChangeDescription}/>
              </FormControl>
              <Button w="100%" onClick={onSubmit}>
                Create Feature
              </Button>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}

export default CreateFeatureAccordion;
