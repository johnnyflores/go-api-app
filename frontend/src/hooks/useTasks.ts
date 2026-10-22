import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "@/services/taskApi";
import type { UpdateTaskRequest } from "@/types";

export function useTasks() {
  const queryClient = useQueryClient();

  const taskQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (error) => {
      console.error("Failed to create task:", error);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, task }: { id: number; task: UpdateTaskRequest }) =>
      updateTask(id, task),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (error) => {
      console.error("Failed to update task:", error);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (error) => {
      console.error("Failed to delete task:", error);
    },
  });

  return {
    tasks: taskQuery.data || [],
    isLoading: taskQuery.isLoading,
    isError: taskQuery.isError,
    error: taskQuery.error,

    createTask: createTaskMutation.mutateAsync,
    isCreating: createTaskMutation.isPending,
    createTaskError: createTaskMutation.error,

    updateTask: updateTaskMutation.mutateAsync,
    isUpdating: updateTaskMutation.isPending,
    updateTaskError: updateTaskMutation.error,

    deleteTask: deleteTaskMutation.mutateAsync,
    isDeleting: deleteTaskMutation.isPending,
    deleteTaskError: deleteTaskMutation.error,
  };
}
