import { Text, Flex, Stack } from "@chakra-ui/react";
import TodoItem from "@/components/TodoItem";
import { FaceSlightlySmiling, Loader } from "lucide-react";
import { useTodos } from "@/hooks/useTodos";
import type { Todo } from "@/types";

const TodoList = () => {
  const { todos, isLoading } = useTodos();

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
      {!isLoading && todos?.length === 0 && (
        <Stack alignItems="center" gap="3">
          <Text fontSize="xl" textAlign="center" color={"gray.500"}>
            All tasks completed!
          </Text>
          <FaceSlightlySmiling size={48} color="gray" />
        </Stack>
      )}
      <Stack gap="3">
        {todos?.map((todo: Todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </Stack>
    </>
  );
};

export default TodoList;
