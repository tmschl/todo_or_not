import { Box, Text,  Modal, ModalOverlay, ModalContent,  ModalCloseButton, Input, IconButton, useToast, } from "@chakra-ui/react";
import UserStoryDetailsAccordion, { Task } from "../UserStories/UserStoryDetailsAccordion";
import CreateUserStoryAccordion from "../UserStories/CreateUserStoryAccordion";
import { Project } from "../../Pages/Projects";
import { useState } from "react";
import { CheckIcon, EditIcon,  } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  featureDesscription: string;
  featureId: number;
  projectId: number;
  stories: UserStory[];
  setProject: React.Dispatch<React.SetStateAction<Project>>;
}

export type UserStory = {
  name: string;
  description: string;
  id: number;
  tasks: Task[];
  completedTasks: number;
  taskCount: number;
}


const FeatureModal = ({
  isOpen, 
  onClose, 
  featureName, 
  featureDesscription, 
  featureId, 
  projectId,
  stories,
  setProject,
}: Props ) => {
  const toast = useToast();
  const navigate = useNavigate();
  
  const [updateFeatureName, setUpdateFeatureName] = useState(false);
  const [updateFeatureDescription, setUpdateFeatureDescription] = useState(false);
  const [name, setName] = useState(featureName);
  const [description, setDescription] = useState(featureDesscription);

  
    const editDescription = () => {
      setUpdateFeatureDescription(!updateFeatureName);
    }
    
  const editName = () => {
    setUpdateFeatureName(!updateFeatureName);
  }

  const onChangeName = (e: any) => {
    setName(e.target.value);
  }

  const onChangeDescription = (e: any) => {
    setDescription(e.target.value);
  }

  const updateFeature = (field: "name" | "description", value: string) => {
  if (name === "") {
    toast({
      title: 'Error',
      description: "Please enter a valid user story name",
      status: 'error',
      duration: 3000,
      isClosable: true,
    }) 
    setName(featureName);
    return;
  }

  const token = localStorage.getItem("token");

  axios
    .post(
      "http://localhost:3025/auth/update-feature",
    {
      field,
      value,
      featureId,
    },
    { headers: { Authorization: `Bearer ${token}`}}
  ).then((response) => {
    setProject(response.data);

    setUpdateFeatureName(false);
    setUpdateFeatureDescription(false);

    toast({
      title: 'Success',
      description: `Your feature ${field} has been updated!`,
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
        description: "There was an error updating your feature. Please try again.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  })
}

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent minW="75%" minH="75%">
        <Box m={10}>
          <Box mb={20}>
            <Box display="flex" alignItems="center" mb={4} gap={5}>
              {updateFeatureName ? (
                <Box flex={1} mr={4}>
                  <Input h="40px" value={name} onChange={onChangeName} type="text" />
                </Box>
              ) : (
                <Text fontSize={20} mr={4}>
                  {featureName}
                </Text>
              )}            

              <IconButton 
                mr={4}
                aria-label='Edit Name' 
                icon={updateFeatureName ? <CheckIcon /> : <EditIcon /> } 
                size="md" 
                onClick={updateFeatureName ? () => {
                  updateFeature("name", name)
                } : editName
              }
                />
              </Box>

            <Box display="flex" alignItems="center">
              {updateFeatureDescription ? ( 
                <Box flex={1} mr={4}>
                  <Input h="40px" value={description} onChange={onChangeDescription} type="text" />
                </Box>
                ) : (
                  <Text mr={4}>{featureDesscription}</Text>
              )} {" "}
              <IconButton 
                mr={4}
                aria-label='Edit Description' 
                icon={updateFeatureDescription ? <CheckIcon /> : <EditIcon /> } 
                size="md" 
                onClick={
                  updateFeatureDescription
                    ? () => {
                        updateFeature("description", description);
                      }
                    : editDescription
                }
                
              />

            </Box>
          </Box>
          <ModalCloseButton />

          <Box display="flex" flexDirection="column" gap={4}>
            {stories.map((story, index) => {
              return (
                <UserStoryDetailsAccordion 
                  name={story.name} 
                  status={`${story.completedTasks} / ${story.taskCount}`}
                  description={story.description}
                  featureId={featureId}
                  projectId={projectId}
                  userStoryId={story.id}
                  tasks={story.tasks}
                  key={story.id}
                  setProject={setProject}
                /> 
              )
            })}
            <CreateUserStoryAccordion
              featureId={featureId} 
              projectId={projectId}
              setProject={setProject}
            />
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default FeatureModal;
