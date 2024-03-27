import { Box, Text,  Modal, ModalOverlay, ModalContent,  ModalCloseButton, } from "@chakra-ui/react";
import UserStoryDetailsAccordion, { Task } from "../UserStories/UserStoryDetailsAccordion";
import CreateUserStoryAccordion from "../UserStories/CreateUserStoryAccordion";
import { Project } from "../../Pages/Projects";

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
