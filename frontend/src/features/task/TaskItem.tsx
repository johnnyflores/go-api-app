import React from "react";
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
import type { Task } from "@/types";
import { useTasks } from "@/hooks/useTasks";

const TaskItem = ({ task }: { task: Task }) => {
  const taskId = task._id;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const { deleteTask, isDeleting, updateTask, isUpdating } = useTasks();

  const handleUpdate = () => {
    if (task.completed) {
      toast({
        position: "top",
        title: "Task is already completed.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    updateTask({ id: taskId, task: { completed: true } });
  };

  const handleDelete = async () => {
    try {
      await deleteTask(taskId);
      onClose();
      toast({
        position: "top",
        title: "Task deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast({
        position: "top",
        title: "Failed to delete task.",
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
            color={task.completed ? "green.200" : "yellow.500"}
            textDecoration={task.completed ? "line-through" : "none"}
          >
            {task.body}
          </Text>
          {task.completed && (
            <Badge ml="1" colorScheme="green">
              Done
            </Badge>
          )}
          {!task.completed && (
            <Badge ml="1" colorScheme="yellow">
              In Progress
            </Badge>
          )}
        </Flex>
        <Flex gap={2} alignItems="center">
          <Box color={"green.200"} cursor="pointer" onClick={handleUpdate}>
            {!isUpdating && <Check size={20} color="green" />}
            {isUpdating && <Loader size={20} color="gray" />}
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
              Delete Task
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

export default TaskItem;
