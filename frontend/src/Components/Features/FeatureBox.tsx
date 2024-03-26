import { Box, Text, useDisclosure } from "@chakra-ui/react"
import { Feature } from "../../Pages/Project";
import FeatureModal from "./FeatureModal";
import { Project } from "../../Pages/Projects";

type Props = {
  feature: Feature;
  projectId: number;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
}

const FeatureBox = ({feature, projectId, setProject}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box 
        border="1px" 
        p={4} 
        mx={4} 
        mt={4}
        display="flex" 
        justifyContent="space-between"
        onClick={onOpen}
        _hover={{
          background: "gray.50",
          color: "gray.500",
        }}
        key={feature.id}
        >
        <Text>
          {feature.name}
        </Text>
        <Text>
          {feature.completedUserStories} / {feature.userStoryCount}
        </Text>
      </Box> 
      <FeatureModal 
        isOpen={isOpen} 
        onClose={onClose} 
        featureName={feature.name} 
        featureDesscription={
          feature.description || "There is no description..." 
        } 
        featureId={feature.id}
        projectId={projectId}
        stories={feature.userStories}
        setProject={setProject}
      />
      </>
  );
}

export default FeatureBox;