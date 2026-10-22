import type { CreateTaskRequest, UpdateTaskRequest, Task } from "@/types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getTasks() {
  const response = await fetch(API_URL + `/tasks`);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch tasks");
  }
  return data || [];
}

export async function createTask(task: CreateTaskRequest): Promise<Task> {
  const response = await fetch(API_URL + `/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to create task");
  }
  return data;
}

export async function updateTask(
  id: number,
  task: UpdateTaskRequest,
): Promise<Task> {
  const response = await fetch(API_URL + `/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to update task");
  }
  return data;
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(API_URL + `/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to delete task");
  }
}
