import { Box } from "@chakra-ui/react"
import { useLoaderData, useParams } from "react-router-dom";

const Project = () => {
  const { id } = useParams();
  const data = useLoaderData();

  console.log('data', data);

  return (
    <Box>Project Page</Box>
  )
}

export default Project;
