import { Box, Text,  Modal, ModalOverlay, ModalContent,  ModalCloseButton, } from "@chakra-ui/react";
import UserStoryDetailsAccordion from "../UserStories/UserStoryDetailsAccordion";
import { useEffect, useState } from "react";
import CreateUserStoryAccordion from "../UserStories/CreateUserStoryAccordion";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  featureDesscription: string;
  featureId: number;
  projectId: number;
  stories: UserStory[];
}

export type UserStory = {
  name: string;
  description: string;
  status: string;
}


const FeatureModal = ({
  isOpen, 
  onClose, 
  featureName, 
  featureDesscription, 
  featureId, 
  projectId,
  stories,
}: Props ) => {
  const [userStories, setUserStories] = useState(stories)

  useEffect(() => {
    setUserStories(stories);
  }, [stories])

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent minW="75%" minH="75%">
        <Box m={10}>
          <Box mb={20}>
            <Text mb={4} fontSize={20} >
              {featureName}
            </Text>
            <Text>{featureDesscription}</Text>
          </Box>
          <ModalCloseButton />

          <Box display="flex" flexDirection="column" gap={4}>
            {userStories.map((story, index) => {
              return (
                <UserStoryDetailsAccordion 
                  name={story.name} 
                  status={story.status}
                  description={story.description}
                /> 
              )
            })}
            <CreateUserStoryAccordion 
              userStories={userStories} 
              setUserStories={setUserStories} 
              featureId={featureId} 
              projectId={projectId}
            />
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default FeatureModal;
