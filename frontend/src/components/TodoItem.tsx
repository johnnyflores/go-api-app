import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { Check, Trash2, Loader } from "lucide-react";
import type { Todo } from "@/types";

const API_URL = import.meta.env.VITE_API_URL;

const TodoItem = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();
  const { mutate: updateTodo, isPending: isUpdating } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async () => {
      if (todo.completed) return alert("Todo is already completed");
      try {
        const response = await fetch(API_URL + `/todos/${todo._id}`, {
          method: "PATCH",
        });

        const data = await response.json();
        if (!response.ok) throw new Error("Failed to update todo");
        return data;
      } catch (error) {
        console.error("Failed to update todo:", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async () => {
      try {
        const response = await fetch(`${API_URL}/todos/${todo._id}`, {
          method: "DELETE",
        });

        const data = await response.json();
        if (!response.ok) throw new Error("Failed to delete todo");
        return data;
      } catch (error) {
        console.error("Failed to delete todo:", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <Flex gap={2} alignItems="center">
      <Flex
        flex="1"
        alignItems="center"
        border={"1px"}
        borderColor={"gray.600"}
        borderRadius={"lg"}
        p={2}
        justifyContent="space-between"
      >
        <Text
          color={todo.completed ? "green.200" : "yellow.500"}
          textDecoration={todo.completed ? "line-through" : "none"}
        >
          {todo.body}
        </Text>
        {todo.completed && (
          <Badge ml="1" colorScheme="green">
            Done
          </Badge>
        )}
        {!todo.completed && (
          <Badge ml="1" colorScheme="yellow">
            In Progress
          </Badge>
        )}
      </Flex>
      <Flex gap={2} alignItems="center">
        <Box color={"green.200"} cursor="pointer" onClick={() => updateTodo()}>
          {!isUpdating && <Check size={20} color="green" />}
          {isUpdating && <Loader size={20} color="gray" />}
        </Box>
        <Box color={"red.500"} cursor="pointer" onClick={() => deleteTodo()}>
          {!isDeleting && <Trash2 size={20} color="red" />}
          {isDeleting && <Loader size={20} color="gray" />}
        </Box>
      </Flex>
    </Flex>
  );
};

export default TodoItem;
