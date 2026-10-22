import { Text, Flex, Stack } from "@chakra-ui/react";
import TaskItem from "@/features/task/TaskItem";
import { FaceSlightlySmiling, Loader } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types";

const TaskList = () => {
  const { tasks, isLoading } = useTasks();

  return (
    <>
      <Text
        fontSize="4xl"
        textTransform="uppercase"
        fontWeight="bold"
        textAlign="center"
        my={2}
        bgGradient="linear(to-l, #0B85F8, #00FFFF)"
        bgClip="text"
      >
        Today's Tasks
      </Text>
      {isLoading && (
        <Flex justifyContent="center" my="4">
          <Loader size={24} color="gray" />
        </Flex>
      )}
      {!isLoading && tasks?.length === 0 && (
        <Stack alignItems="center" gap="3">
          <Text fontSize="xl" textAlign="center" color={"gray.500"}>
            All tasks completed!
          </Text>
          <FaceSlightlySmiling size={48} color="gray" />
        </Stack>
      )}
      <Stack gap="3">
        {tasks?.map((task: Task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </Stack>
    </>
  );
};

export default TaskList;
