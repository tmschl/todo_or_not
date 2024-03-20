import { Box, Text } from "@chakra-ui/react"
import { useLoaderData, useNavigate } from "react-router-dom";
import { Data } from "./Profile";
import CreateProjectAccordion from "../Components/Projects/CreateProjectAccordion";
import { useState } from "react";

export type Project = {
  name: string;
  description?: string;
  status: string;
  id: number;
}

type LoaderData = {
  user: Data;
  projects: Project[];
}

const Projects = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as LoaderData;
  const user = data.user as Data;
  const [projects, setProjects] = useState(data.projects);

  console.log(data.projects);

  const goToProject = (id: number) => {
    navigate(`/project/${id}`)
  }

  return (
    <Box>
      <Text textAlign="center" mb={4} fontSize={20} >
        {user.name}'s Projects
      </Text>
      <Box m={10}>
        {
          projects.map((project) => {
            return (
              <Box display="flex" mb={6} border="1px solid" p={4} 
                onClick={() => {goToProject(project.id)}}
                _hover={{ cursor: "pointer", backgroundColor: "gray.100" }}>

                <Text w="15%">{project.name}</Text>
                <Text noOfLines={1} flex={1}>{project.description}</Text>
                <Text w="15%" ml={10}>{project.status}</Text>
              </Box>
            )
          })
        }
        <CreateProjectAccordion projects={projects} setProjects={setProjects} /> 
      </Box>
    </Box>
  )
}

export default Projects;