import { Box, Text, Button, useToast, IconButton, Input } from "@chakra-ui/react";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { Task } from "../UserStories/UserStoryDetailsAccordion";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Project } from "../../Pages/Projects";

type Props = {
  task: Task;
  setStoryStatus: React.Dispatch<React.SetStateAction<string>>;
}

const TaskBox = ({ task, setStoryStatus }: Props) => {
  const toast = useToast()
  const navigate = useNavigate()

  const [taskStatus, setTaskStatus] = useState(task.status);
  const [taskName, setTaskName] = useState(task.name);
  const [updateName, setUpdateName] = useState(false);

  const onChange = (e: any) => {
    setTaskName(e.target.value);
  }

  const onClickEdit = () => {
    setUpdateName(!updateName);
  }
  


  const updateTask = (field: "status" | "name", value: string) => {
    if (taskName === '') {
      toast({
        title: 'Error',
        description: "Please enter a valid email",
        status: 'error',
        duration: 3000,
        isClosable: true,
      }) 
      setTaskName(task.name);
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:3025/auth/update-task",
      {
        field,
        value,
        taskId: task.id,
      },
      { headers: { Authorization: `Bearer ${token}`}}
    ).then((response) => {
      setStoryStatus(response.data);
      setUpdateName(false);

      toast({
        title: 'Success',
        description: `Your task ${field }been updated!`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

    }).catch((error) => {
      if (error.response.data.message === 'Unauthorized') {
        toast({
          title: 'Error',
          description: "Your session has expired. Please login again.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        navigate('/log-in')
      } else {
        toast({
          title: 'Error',
          description: "There was an error updating your task. Please try again.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    })
  }

  const toggleTaskStatus = () => {
    if (taskStatus === 'To Do') {
      setTaskStatus('In Progress');
      updateTask("status", "In Progress");
    } else if (taskStatus === 'In Progress')  {
      setTaskStatus('Done!');
      updateTask("status", "Done!");
    } else {
      setTaskStatus("To Do");
      updateTask("status", "To Do");
    }
  }

  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      alignItems="center" 
      px={4} 
      py={2}
      key={task.name}
      gap={4}
      borderTop="1px"
    > 

      <Box flex={1}>
        {updateName ? (
          <Input flex={1} h="40px" value={taskName} onChange={onChange} type="text" />
        ) : (
          <Text flex={1}>{task.name}</Text>
        )}
      </Box>

      <IconButton 
        aria-label='Edit Name' 
        icon={updateName ? <CheckIcon /> : <EditIcon/>} 
        size="md" 
        onClick={updateName ? () => { updateTask("name", taskName) } : onClickEdit}
      />
      <Button onClick={toggleTaskStatus} w="118px">
        {taskStatus}
      </Button>
    </Box>
  )
}

export default TaskBox;


