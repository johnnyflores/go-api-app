import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Input } from "@chakra-ui/react";
import { Loader, Plus } from "lucide-react";
import { useTodos } from "@/hooks/useTodos";
import { todoSchema, type TodoSchemaType } from "@/schemas/todo.schema";

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState("");
  const { createTodo, isCreating } = useTodos();

  const form = useForm<TodoSchemaType>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      body: "",
      completed: false,
    },
  });

  useEffect(() => {
    form.reset({ body: newTodo, completed: false });
  }, [newTodo, form]);

  const onSubmit = async (values: TodoSchemaType) => {
    try {
      await createTodo({ body: values.body, completed: values.completed });
      setNewTodo("");
    } catch (error) {
      console.error("Failed to submit todo:", error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Flex gap={2}>
        <Flex flex="1" flexDirection="column">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            ref={(input) => {
              if (input) input.focus();
            }}
          />
          {form.formState.errors.body && (
            <span style={{ color: "red", marginTop: "10px" }}>
              {form.formState.errors.body.message}
            </span>
          )}
        </Flex>
        <Button mx={2} type="submit" _active={{ transform: "scale(0.95)" }}>
          {isCreating ? <Loader size={16} /> : <Plus size={16} />}
        </Button>
      </Flex>
    </form>
  );
};

export default TodoForm;
