import {
  Badge,
  Box,
  Flex,
  Text,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Check, Trash2, Loader } from "lucide-react";
import type { Todo } from "@/types";
import { useTodos } from "@/hooks/useTodos";

import React from "react";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const todoId = todo._id;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const {
    deleteTodo,
    isDeleting,
    updateTodo: updateTodoFromHook,
    isUpdating: isUpdatingFromHook,
  } = useTodos();

  const handleUpdate = () => {
    if (todo.completed) {
      toast({
        position: "top",
        title: "Todo is already completed.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    updateTodoFromHook({ id: todoId, todo: { completed: true } });
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todoId);
      onClose();
      toast({
        position: "top",
        title: "Todo deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to delete todo:", error);
      toast({
        position: "top",
        title: "Failed to delete todo.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
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
          <Box color={"red.500"} cursor="pointer" onClick={onOpen}>
            {!isDeleting && <Trash2 size={20} color="red" />}
            {isDeleting && <Loader size={20} color="gray" />}
          </Box>
        </Flex>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Todo
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default TodoItem;
