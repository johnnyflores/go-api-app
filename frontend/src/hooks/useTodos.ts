import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "@/services/todoApi";
import type { UpdateTodoRequest } from "@/types";

export function useTodos() {
  const queryClient = useQueryClient();

  const todoQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos(),
  });

  const createTodoMutation = useMutation({
    mutationFn: createTodo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      console.error("Failed to create todo:", error);
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: ({ id, todo }: { id: number; todo: UpdateTodoRequest }) =>
      updateTodo(id, todo),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      console.error("Failed to update todo:", error);
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      console.error("Failed to delete todo:", error);
    },
  });

  return {
    todos: todoQuery.data || [],
    isLoading: todoQuery.isLoading,
    isError: todoQuery.isError,
    error: todoQuery.error,

    createTodo: createTodoMutation.mutateAsync,
    isCreating: createTodoMutation.isPending,
    createTodoError: createTodoMutation.error,

    updateTodo: updateTodoMutation.mutateAsync,
    isUpdating: updateTodoMutation.isPending,
    updateTodoError: updateTodoMutation.error,

    deleteTodo: deleteTodoMutation.mutateAsync,
    isDeleting: deleteTodoMutation.isPending,
    deleteTodoError: deleteTodoMutation.error,
  };
}
