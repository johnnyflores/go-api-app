import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { Check, Trash2, Loader } from "lucide-react";
import type { Todo } from "@/types";
import { useTodos } from "@/hooks/useTodos";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const todoId = todo._id;
  const {
    deleteTodo,
    isDeleting,
    updateTodo: updateTodoFromHook,
    isUpdating: isUpdatingFromHook,
  } = useTodos();

  const handleUpdate = () => {
    if (todo.completed) return alert("Todo is already completed!!");
    updateTodoFromHook({ id: todoId, todo: { completed: true } });
  };

  const handleDelete = () => {
    deleteTodo(todoId);
  };

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
        <Box color={"green.200"} cursor="pointer" onClick={handleUpdate}>
          {!isUpdatingFromHook && <Check size={20} color="green" />}
          {isUpdatingFromHook && <Loader size={20} color="gray" />}
        </Box>
        <Box color={"red.500"} cursor="pointer" onClick={handleDelete}>
          {!isDeleting && <Trash2 size={20} color="red" />}
          {isDeleting && <Loader size={20} color="gray" />}
        </Box>
      </Flex>
    </Flex>
  );
};

export default TodoItem;
