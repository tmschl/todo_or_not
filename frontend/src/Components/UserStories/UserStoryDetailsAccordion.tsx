import { Text, Box, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Button } from "@chakra-ui/react"
import CreateTaskAccordion from "../Tasks/CreateTaskAccordion";
import { Project } from "../../Pages/Projects";
import TaskBox from "../Tasks/TaskBox";
import { useState } from "react";


type Props = {
  name: string;
  status: string;
  description: string;
  projectId: number;
  featureId: number;
  userStoryId: number;
  tasks: Task[];
  setProject: React.Dispatch<React.SetStateAction<Project>>;
}

export type Task = {
  name: string;
  status: string;
  id: number;
}


const UserStoryDetailsAccordion = ({
  name, 
  status, 
  description, 
  projectId, 
  featureId, 
  userStoryId,
  tasks,
  setProject,
}: Props) => {
  const [storyStatus, setStoryStatus] = useState(status); 

  return (
    <Accordion allowToggle>
      <AccordionItem border="1px solid">
        <h2>
          <AccordionButton display="flex" justifyContent="space-between" p={4}>
            <Text flex={1} textAlign="left">{name}</Text>
            <Text>{storyStatus}</Text>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel p={0} borderTop="1px">
          <Box p={4}>{description}</Box>
          {tasks.map((task) => {
            return ( <TaskBox task={task} setStoryStatus={setStoryStatus} /> )
          })}
          <CreateTaskAccordion 
            featureId={featureId} 
            projectId={projectId} 
            userStoryId={userStoryId} 
            setProject={setProject}
          /> 
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default UserStoryDetailsAccordion;
