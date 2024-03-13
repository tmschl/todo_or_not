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

const fakeProjects: Project[] = [
  {
    name: "Project A",
    description: "This is the description of project A. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    status: "To Do",
  },{
    name: "Project B",
    description: "This is the description of project B. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    status: "To Do",
  },{
    name: "Project C",
    description: "This is the description of project C. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    status: "In Progress",
  },{
    name: "Project D",
    description: "This is the description of project D. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    status: "In Progress",
  },{
    name: "Project E",
    description: "This is the description of project E. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    status: "Done!",
  },{
    name: "Project F",
    description: "This is the description of project F. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    status: "Done!",
  },
]

const Projects = () => {
  const data = useLoaderData() as Data;
  const [projects, setProjects] = useState(fakeProjects);

  return (
    <Box>
      <Text textAlign="center" mb={4} fontSize={20} >
        {data.name}'s Projects
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