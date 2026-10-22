import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Input } from "@chakra-ui/react";
import { Loader, Plus } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { taskSchema, type TaskSchemaType } from "@/schemas/task.schema";

const TaskForm = () => {
  const [newTask, setNewTask] = useState("");
  const { createTask, isCreating } = useTasks();

  const form = useForm<TaskSchemaType>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      body: "",
      completed: false,
    },
  });

  useEffect(() => {
    form.reset({ body: newTask, completed: false });
  }, [newTask, form]);

  const onSubmit = async (values: TaskSchemaType) => {
    try {
      await createTask({ body: values.body, completed: values.completed });
      setNewTask("");
    } catch (error) {
      console.error("Failed to submit task:", error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Flex gap={2}>
        <Flex flex="1" flexDirection="column">
          <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
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

export default TaskForm;
