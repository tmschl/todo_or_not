import { Box, Text } from "@chakra-ui/react"
import { useLoaderData } from "react-router-dom";
import { Data } from "./Profile";
import CreateProjectAccordion from "../Components/Projects/CreateProjectAccordion";
import { useState } from "react";

export type Project = {
  name: string;
  description?: string;
  status: string;
}

type LoaderData = {
  user: Data;
  projects: Project[];
}

const Projects = () => {
  const data = useLoaderData() as LoaderData;
  const user = data.user as Data;

  console.log('loader data', data);

  const [projects, setProjects] = useState(data.projects);

  return (
    <Box>
      <Text textAlign="center" mb={4} fontSize={20} >
        {user.name}'s Projects
      </Text>
      <Box m={10}>
        {
          projects.map((project) => {
            return (
              <Box display="flex" mb={6} border="1px solid" p={4}>
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