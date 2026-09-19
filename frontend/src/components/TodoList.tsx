import { useQuery } from "@tanstack/react-query";
import { Text, Flex, Stack } from "@chakra-ui/react";
import TodoItem from "@/components/TodoItem";
import { FaceSlightlySmiling, Loader } from "lucide-react";
import type { Todo } from "@/types";

const API_URL = import.meta.env.VITE_API_URL;

const TodoList = () => {
  const { data: todos, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async (): Promise<Todo[]> => {
      try {
        const response = await fetch(API_URL + `/todos`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch todos");
        }
        return data || [];
      } catch (error) {
        console.error("Failed to fetch todos:", error);
        return [];
      }
    },
  });

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
        {todos?.map((todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </Stack>
    </>
  );
};

export default TodoList;
