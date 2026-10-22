import { Container, Stack } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import TaskForm from "@/features/task/TaskForm";
import TaskList from "@/features/task/TaskList";

function App() {
  return (
    <Stack h="100vh">
      <Navbar />
      <Container>
        <TaskForm />
        <TaskList />
      </Container>
    </Stack>
  );
}

export default App;
