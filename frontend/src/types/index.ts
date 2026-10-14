export type Todo = {
  _id: number;
  body: string;
  completed: boolean;
};

export interface CreateTodoRequest {
  body: string;
  completed: boolean | undefined;
}

export interface UpdateTodoRequest {
  completed: boolean;
}
