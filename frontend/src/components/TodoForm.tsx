import { useState } from "react";
import type React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Input } from "@chakra-ui/react";
import { Loader, Plus } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();

  const { mutate: createTodo, isPending: isCreating } = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await fetch(API_URL + `/todos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: newTodo }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error("Failed to create todo");
        setNewTodo("");
        return data;
      } catch (error) {
        console.error("Failed to create todo:", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Error creating todo:", error);
      alert("Error creating todo");
    },
  });

  return (
    <form onSubmit={createTodo}>
      <Flex gap={2}>
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          ref={(input) => {
            if (input) input.focus();
          }}
        />
        <Button mx={2} type="submit" _active={{ transform: "scale(0.95)" }}>
          {isCreating ? <Loader size={16} /> : <Plus size={16} />}
        </Button>
      </Flex>
    </form>
  );
};

export default TodoForm;
