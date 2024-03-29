import { Box, IconButton, Input, Text, useToast, } from "@chakra-ui/react"
import { useLoaderData, useNavigate, } from "react-router-dom";
import { Project as ProjectType } from "./Projects";
import CreateFeatureAccordion from "../Components/Features/CreateFeatureAccordion";
import { useState } from "react";
import { UserStory } from "../Components/Features/FeatureModal";
import FeatureBox from "../Components/Features/FeatureBox";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";

export type Feature = {
  name: string;
  status: "To Do" | "In Progress" | "Done!";
  userStoryCount: number;
  completedUserStories: number;
  description?: string;
  id: number;
  userStories: UserStory[];
}

const columns = [
  {
    name: "To Do"
  },{
    name: "In Progress"
  },{
    name: "Done!"
  },
];

const Project = () => {
  const loaderData = useLoaderData() as ProjectType;
  const toast = useToast();
  const navigate = useNavigate();

  const [project, setProject] = useState(loaderData);
  const [projectName, setProjectName] = useState(project.name);
  const [projectDescription, setProjectDescription] = useState(project.description);
  const [updateProjectName, setUpdateProjectName] = useState(false);
  const [updateProjectDescription, setUpdateProjectDescription] = useState(false);

  const editName = () => {
    setUpdateProjectName(!updateProjectName);
  }

  const onChangeName = (e: any) => {
    setProjectName(e.target.value);
  }

  const editDescription = () => {
    setUpdateProjectDescription(!updateProjectDescription);
  }

  const onChangeDescription = (e: any) => {
    setProjectDescription(e.target.value);
  }

  const updateProject = (field: "name" | "description", value: string | undefined) => {
    if (projectName === "") {
      toast({
        title: 'Error',
        description: "Please enter a valid user project name",
        status: 'error',
        duration: 3000,
        isClosable: true,
      }) 
      setProjectName(project.name);
      return;
    }
  
    const token = localStorage.getItem("token");
  
    axios
      .post(
        "http://localhost:3025/auth/update-project",
      {
        field,
        value,
        projectId: project.id,
      },
      { headers: { Authorization: `Bearer ${token}`}}
    ).then((response) => {
      setProject(response.data);
      setUpdateProjectName(false);
      setUpdateProjectDescription(false);
  
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
          description: "There was an error updating your project. Please try again.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    })
  }

  return (
    <Box m={10} >
      <Box mb={20}>
        <Box display="flex" alignItems="center" mb={4} gap={5}>
          {
            updateProjectName ? (
              <Box flex={1} mr={4}>
                <Input h="40px" value={projectName} onChange={onChangeName} type="text" />
              </Box> 
            ) : (
              <Text mr={4} fontSize={20} >
                {project.name}
              </Text>
            )
          }
              <IconButton 
                mr={4}
                aria-label='Edit Name' 
                icon={updateProjectName ? <CheckIcon /> : <EditIcon /> } 
                size="md" 
                onClick={updateProjectName ? () => {
                  updateProject("name", projectName)
                } : editName
              }
              />
          </Box>
            <Box display="flex" alignItems="center">
              {updateProjectDescription ? (
                  <Box flex={1} mr={4}>
                    <Input h="40px" value={projectDescription} onChange={onChangeDescription} type="text" />
                  </Box> 
                ) : (
                  <Text mr={4}>{project.description || "There is no product description"}</Text>
                )
              }
              <IconButton 
                mr={4}
                aria-label='Edit Description' 
                icon={updateProjectDescription ? <CheckIcon /> : <EditIcon /> } 
                size="md" 
                onClick={updateProjectDescription ? () => {
                  updateProject("description", projectDescription)
                } : editDescription
              }
              />
            </Box>
      </Box>
      <Box display="flex" gap={10}>
        {columns.map((column) => {
          return (
            <Box border="1px" flex={1} key={column.name}>
              <Text textAlign="center" fontSize={20} mt={2}> 
                { column.name }
              </Text>
              {project.features.map((feature) => {
                // feature.status = "To Do";
                if (column.name === feature.status) {
                  return (
                    <FeatureBox 
                      feature={feature} 
                      projectId={project.id}
                      setProject={setProject}
                    />
                  );
                } else {
                  return null;
                }
              })}
              <Box p={4}>
                {column.name === "To Do" && (
                  <CreateFeatureAccordion 
                    features={project.features}
                    setProject={setProject}
                    projectId={project.id}
                  />
                )}
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default Project;
