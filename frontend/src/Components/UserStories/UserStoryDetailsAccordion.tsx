import { Text, Box, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Button } from "@chakra-ui/react"
import CreateTaskAccordion from "../Tasks/CreateTaskAccordion";
import { useState } from "react";
import { Project } from "../../Pages/Projects";


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

  return (
    <Accordion allowToggle>
      <AccordionItem border="1px solid">
        <h2>
          <AccordionButton display="flex" justifyContent="space-between" p={4}>
            <Text flex={1} textAlign="left">{name}</Text>
            <Text>{status}</Text>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel p={0} borderTop="1px">
          <Box p={4}>{description}</Box>
          {tasks.map((task) => {
            return (
              <Box 
                display="flex" 
                justifyContent="space-between" 
                borderTop="1px" 
                alignItems="center" 
                px={4} 
                py={2}
                key={task.name}
              > 
                <Text>{task.name}</Text>
                <Button>{task.status}</Button>
              </Box>
            )
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
