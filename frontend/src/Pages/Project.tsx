import { Box, Text, useDisclosure } from "@chakra-ui/react"
import { useLoaderData, useParams } from "react-router-dom";
import { Project as ProjectType } from "./Projects";
import CreateFeatureAccordion from "../Components/Features/CreateFeatureAccordion";
import { useState } from "react";
import FeatureModal, { UserStory } from "../Components/Features/FeatureModal";
import FeatureBox from "../Components/Features/FeatureBox";

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
  const [project, setProject] = useState(loaderData);
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box m={10} >
      <Box mb={20}>
        <Text textAlign="center" mb={4} fontSize={20} >
          {project.name}
        </Text>
        <Text>{project.description || "There is no product description"}</Text>
      </Box>

      <Box display="flex" gap={10}>
        {columns.map((column) => {
          return (
            <Box border="1px" flex={1} key={column.name}>
              <Text textAlign="center" fontSize={20} mt={2}> 
                { column.name }
              </Text>
              {project.features.map((feature) => {
                feature.status = "To Do";
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
