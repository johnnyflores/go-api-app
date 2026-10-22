export type Task = {
  _id: number;
  body: string;
  completed: boolean;
};

export interface CreateTaskRequest {
  body: string;
  completed: boolean | undefined;
}

export interface UpdateTaskRequest {
  completed: boolean;
}
