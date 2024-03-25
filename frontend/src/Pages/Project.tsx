import { Box, Text, useDisclosure } from "@chakra-ui/react"
import { useLoaderData, useParams } from "react-router-dom";
import { Project as ProjectType } from "./Projects";
import CreateFeatureAccordion from "../Components/Features/CreateFeatureAccordion";
import { useState } from "react";
import FeatureModal, { UserStory } from "../Components/Features/FeatureModal";

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
  // take this logic out of this component
  const data = useLoaderData() as ProjectType;
  const project = data[0];
  
  const [features, setFeatures] = useState(project.features);
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const [selectedFeature, setSelectedFeature] = useState(features[0]);

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
            <Box border="1px" flex={1}>
              <Text textAlign="center" fontSize={20} mt={2}> 
                { column.name }
              </Text>
              {features.map((feature) => {
                if (column.name === feature.status) {
                  return (
                    <Box 
                      border="1px" 
                      p={4} 
                      mx={4} 
                      mt={4}
                      display="flex" 
                      justifyContent="space-between"
                      onClick={() => {
                        onOpen();
                        setSelectedFeature(feature);
                      }}
                      _hover={{
                        background: "gray.50",
                        color: "gray.500",
                      }}
                    >
                      <Text>
                        {feature.name}
                      </Text>
                      <Text>
                        {feature.completedUserStories} / {feature.userStoryCount}
                      </Text>
                    </Box>
                    );
                } else {
                  return null;
                }
              })}
              <Box p={4}>
                {column.name === "To Do" && (
                  <CreateFeatureAccordion 
                  features={features}
                  setFeatures={setFeatures}
                  projectId={project.id}
                  />
                )}
              </Box>
            </Box>
          )
        })}
      </Box>
      <FeatureModal 
        isOpen={isOpen} 
        onClose={onClose} 
        featureName={selectedFeature.name} 
        featureDesscription={selectedFeature.description || "There is no description..." } 
        featureId={selectedFeature.id} 
        projectId={project.id}
        stories={selectedFeature.userStories}
      />
    </Box>
  )
}

export default Project;
