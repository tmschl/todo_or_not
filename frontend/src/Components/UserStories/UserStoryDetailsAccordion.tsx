import { Text, Box, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Button, Input, IconButton, useToast } from "@chakra-ui/react"
import CreateTaskAccordion from "../Tasks/CreateTaskAccordion";
import { Project } from "../../Pages/Projects";
import TaskBox from "../Tasks/TaskBox";
import { useState } from "react";
import { CheckIcon, EditIcon, ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";


type Props = {
  name: string;
  status: string;
  description: string;
  projectId: number;
  featureId: number;
  userStoryId: number;
  tasks: Task[];
  setProject: React.Dispatch<React.SetStateAction<Project>>;
}

export type Task = {
  name: string;
  status: string;
  id: number;
}


const UserStoryDetailsAccordion = ({
  name, 
  status, 
  description, 
  projectId, 
  featureId, 
  userStoryId,
  tasks,
  setProject,
}: Props) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [storyStatus, setStoryStatus] = useState(status); 
  const [updateStoryName, setUpdateStoryName] = useState(false);
  const [storyName, setStoryName] = useState(name);
  const [updateStoryDescription, setUpdateStoryDescription] = useState(false);
  const [storyDescription, setStoryDescription] = useState(description);

  const onChangeName = (e: any) => {
    setStoryName(e.target.value);
  }

  const onChangeDescription = (e: any) => {
    setStoryDescription(e.target.value);
  }

  const onClickEditName = () => {
    setUpdateStoryName(!updateStoryName);
  }

  const onClickEditDescription = () => {
    setUpdateStoryDescription(!updateStoryDescription);
  }

  const updateStory = (field: "name" | "description", value: string) => {
    if (storyName === "") {
      toast({
        title: 'Error',
        description: "Please enter a valid user story name",
        status: 'error',
        duration: 3000,
        isClosable: true,
      }) 
      setStoryName(name);
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:3025/auth/update-user-story",
      {
        field,
        value,
        userStoryId,
      },
      { headers: { Authorization: `Bearer ${token}`}}
    ).then((response) => {
      setProject(response.data);
      setUpdateStoryName(false);
      setUpdateStoryDescription(false);

      toast({
        title: 'Success',
        description: `Your user story ${field} been updated!`,
        status: 'success',
        duration: 3000,
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
          description: "There was an error updating your task. Please try again.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    })
  }

  return (

    <>
    {updateStoryName ? (
        <Box display="flex" p={4} border="1px" alignItems="center">
          <Box flex={1} mr={4}>
            <Input h="40px" value={storyName} onChange={onChangeName} type="text" />
          </Box>
          <IconButton 
            mr={4}
            aria-label='Edit Name' 
            icon={<CheckIcon />} 
            size="md" 
            onClick={() => {updateStory("name", storyName)}}
          />
          <Text>{storyStatus}</Text>
          <ChevronDownIcon boxSize={5}/>
        </Box>
      )
        : 
      (
        <Accordion allowToggle>
          <AccordionItem border="1px">
            <h2>
              <AccordionButton 
                display="flex" 
                justifyContent="space-between" 
                p={4}
              >
                <Text flex={1} textAlign="left">
                  {name}
                </Text>
                <IconButton 
                  mr={4}
                  aria-label='Edit Name' 
                  icon={<EditIcon/>} 
                  size="md" 
                  onClick={onClickEditName}
                />
                <Text> 
                  {storyStatus} 
                </Text>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel p={0} borderTop="1px">
              <Box display="flex" p={4} py={10} alignItems="center">
                { updateStoryDescription ? (
                  <Box flex={1} mr={4}>
                    <Input h="40px" value={storyDescription} onChange={onChangeDescription} type="text" />
                  </Box>
                ) : (
                  <Box flex={1}>
                    {description}
                  </Box>
                )}
                <IconButton 
                  mr={4}
                  aria-label='Edit Name' 
                  icon={updateStoryDescription ? <CheckIcon /> : <EditIcon/> } 
                  size="md" 
                  onClick={updateStoryDescription ? () => {
                      updateStory("description", storyDescription)
                    } : onClickEditDescription 
                  }
                /> 
              </Box>
              {tasks.map((task) => {
                return ( <TaskBox task={task} setStoryStatus={setStoryStatus} /> )
              })}
              <CreateTaskAccordion 
                featureId={featureId} 
                projectId={projectId} 
                userStoryId={userStoryId} 
                setProject={setProject}
              /> 
            </AccordionPanel>
            </AccordionItem>
          </Accordion>
        )
      }
    </>
  )
}

export default UserStoryDetailsAccordion;
