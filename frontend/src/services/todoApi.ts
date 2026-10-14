import type { CreateTodoRequest, Todo } from "@/types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getTodos() {
  const response = await fetch(API_URL + `/todos`);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch todos");
  }
  return data || [];
}

export async function createTodo(todo: CreateTodoRequest): Promise<Todo> {
  const response = await fetch(API_URL + `/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to create todo");
  }
  return data;
}

import type { UpdateTodoRequest } from "@/types";

export async function updateTodo(
  id: number,
  todo: UpdateTodoRequest,
): Promise<Todo> {
  const response = await fetch(API_URL + `/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to update todo");
  }
  return data;
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(API_URL + `/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to delete todo");
  }
}
